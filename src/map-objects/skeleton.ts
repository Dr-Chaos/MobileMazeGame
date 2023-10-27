import { AnimatedSprite, Graphics } from 'pixi.js';
import { camera } from '../camera';
import { collisionResponseDirection, isColliding } from '../math/collisions';
import { player } from '../player/player';
import { atlasLoader } from '../pixi/atlas-loader';
import { mapScaling } from '../map/map-layers';
import { gameConditions } from '../map/game-conditions';
import { doorRoomRight, doorsContainers } from './door';
import { centerIfPivotIsUpperLeft } from '../utils/utils';
import { fireball } from '../player/fireball';
import { isInvulnerable } from '../player/invulnerability';
import { movePlayer } from '../player/move';
import { damagePlayer } from '../player/receive-damage';

type SkeletonContainer = {
  sprite: AnimatedSprite;
  playerDetectionZone: Graphics;
};

type Skeleton = {
  container: SkeletonContainer;
  life: number;
  name: string;
  damage: number;
};

let skeletons: Skeleton[] = [];

export function createSkeleton(x: number, y: number, name: string) {
  const sprite = new AnimatedSprite(atlasLoader.skeleton.animations.idle);
  sprite.scale.set(mapScaling);
  sprite.animationSpeed = 0.13;
  sprite.play();
  sprite.x = x;
  sprite.y = y;
  camera.addChild(sprite);

  const playerDetectionZone = new Graphics();
  playerDetectionZone.beginFill('white', 0.5);
  const playerDetectionZonePosition = centerIfPivotIsUpperLeft(
    {
      x: sprite.x,
      y: sprite.y,
      width: sprite.width,
      height: sprite.height,
    },
    6.5,
  );
  playerDetectionZone.x = playerDetectionZonePosition.x;
  playerDetectionZone.y = playerDetectionZonePosition.y;
  playerDetectionZone.drawRect(0, 0, playerDetectionZonePosition.width, playerDetectionZonePosition.height);
  playerDetectionZone.visible = false; // dispaly or hide the player detection zone
  camera.addChild(playerDetectionZone);

  skeletons.push({
    container: {
      sprite,
      playerDetectionZone,
    },
    life: 35,
    damage: 1,
    name,
  });
}

export function moveSkeleton(skeleton: Skeleton, x: number, y: number, delta: number) {
  skeleton.container.sprite.x += x * delta;
  skeleton.container.sprite.y += y * delta;
  skeleton.container.playerDetectionZone.x += x * delta;
  skeleton.container.playerDetectionZone.y += y * delta;
}

function moveSkeletonToPlayer(skeleton: Skeleton, delta: number) {
  const playerX = player.hitbox.x;
  const playerY = player.hitbox.y;

  const directionX = playerX - skeleton.container.sprite.x;
  const directionY = playerY - skeleton.container.sprite.y;

  const distance = Math.hypot(directionX, directionY);

  const normalizedDirectionX = directionX / distance;
  const normalizedDirectionY = directionY / distance;

  const speed = 1;
  moveSkeleton(skeleton, normalizedDirectionX * speed, normalizedDirectionY * speed, delta);
}

export function skeletonsGameLoop(delta: number) {
  for (const skeleton of skeletons) {
    // if the detection zone is in collision with the player
    if (!isColliding(player.hitbox, skeleton.container.playerDetectionZone)) continue;
    moveSkeletonToPlayer(skeleton, delta);
    // if the skeleton sprite is in collision with the player fireball, apply damage to the skeleton
    if (isColliding(skeleton.container.sprite, fireball)) {
      skeleton.life -= 1; // DURING DEV, DISABLE FIREBALL DAMAGE TO SKELETONS
      // is the skeleton die
      if (skeleton.life > 0) continue;
      camera.removeChild(skeleton.container.sprite);
      camera.removeChild(skeleton.container.playerDetectionZone);
      skeletons = skeletons.filter((itaratedSkeleton) => itaratedSkeleton !== skeleton);
      // if it's skeleton of room 2 (you can remove && mapCondition.skeletonToKillToOpenDoor2 > 0, since all skeletonRoomRight bust be killed to open the door)
      // but we can keep it to implement a killed monster counter
      if (skeleton.name === 'skeletonRoomRight' && gameConditions.skeletonToKillToOpenDoor2 > 0) {
        gameConditions.skeletonToKillToOpenDoor2 -= 1;
        if (gameConditions.skeletonToKillToOpenDoor2 > 0) continue;
        // disable the room2 door
        camera.removeChild(doorRoomRight);
        doorsContainers.list = doorsContainers.list.filter((doorContainer) => doorContainer !== doorRoomRight);
      }
    }

    if (isColliding(player.hitbox, skeleton.container.sprite) && !isInvulnerable()) {
      damagePlayer(1);
    }

    skeleton.container.sprite.alpha = isColliding(player.hitbox, skeleton.container.sprite) ? 0.5 : 1;

    // move skeleton on player collision
    const skeletonASprite = skeleton.container.sprite;
    const dx = skeletonASprite.x - player.hitbox.x / 2;
    const dy = skeletonASprite.y - player.hitbox.y / 2;
    const distanceBetweenSkeletons = Math.hypot(dx, dy);

    // Supposons qu'un certain 'minDistance' représente la distance minimale que les squelettes doivent maintenir entre eux
    const minDistance = skeletonASprite.width + player.hitbox.width / 2; // ou une autre valeur selon la taille des squelettes

    if (distanceBetweenSkeletons < minDistance) {
    // Les squelettes sont trop proches, nous devons les repousser
      const overlap = minDistance - distanceBetweenSkeletons * 1.7;
      const adjustX = (overlap / distanceBetweenSkeletons) * dx;
      const adjustY = (overlap / distanceBetweenSkeletons) * dy;

      // Ajuster les positions pour éviter la superposition
      moveSkeleton(skeleton, adjustX / 2, adjustY / 2, delta);
    // moveSkeleton(skeletonB, -(adjustX / 2), -(adjustY / 2));
    }
  }

  // Deuxième boucle pour gérer les collisions entre les squelettes
  for (let indexSkeletonA = 0; indexSkeletonA < skeletons.length; indexSkeletonA++) {
    for (let indexSkeletonB = indexSkeletonA + 1; indexSkeletonB < skeletons.length; indexSkeletonB++) {
      const skeletonA = skeletons[indexSkeletonA];
      const skeletonB = skeletons[indexSkeletonB];

      const skeletonASprite = skeletonA.container.sprite;
      const skeletonBSprite = skeletonB.container.sprite;
      const dx = skeletonASprite.x - skeletonBSprite.x / 1.08;
      const dy = skeletonASprite.y - skeletonBSprite.y / 1.08;
      const distanceBetweenSkeletons = Math.hypot(dx, dy);

      // Supposons qu'un certain 'minDistance' représente la distance minimale que les squelettes doivent maintenir entre eux
      const minDistance = skeletonASprite.width / 2 + skeletonBSprite.width / 2; // ou une autre valeur selon la taille des squelettes

      if (distanceBetweenSkeletons < minDistance) {
        // Les squelettes sont trop proches, nous devons les repousser
        const overlap = minDistance - distanceBetweenSkeletons;
        const adjustX = (overlap / distanceBetweenSkeletons) * dx;
        const adjustY = (overlap / distanceBetweenSkeletons) * dy;

        // Ajuster les positions pour éviter la superposition
        moveSkeleton(skeletonA, adjustX / 2, adjustY / 2, delta);
        moveSkeleton(skeletonB, -(adjustX / 2), -(adjustY / 2), delta);
      }
    }
  }
}

export { skeletons };
