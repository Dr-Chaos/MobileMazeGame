import { AnimatedSprite, Graphics } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { collisionResponseDirection, isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';

import { atlasLoader } from '../pixi/atlas-loader';
import { mapScaling } from '../map/map-layers';
import { gameConditions } from '../map/game-conditions';
import { doorRoomBottom, doorRoomRight, doorsContainers } from './door';
import { centerFromPivot, centerIfPivotIsUpperLeft } from '../utils/utils';
import { fireball } from '../player/fireball';
import { isInvulnerable, startInvulnerabilityTimer } from '../player/invulnerability';
import {
  Movements, PlayerState, AnimationStates, movement, animationState,
} from '../player/animations/animations';
import { playerStats } from '../player/stats';
import { movePlayer } from '../player/move';
import { updateLifeHud } from '../player/hud';
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
    life: 5,
    damage: 1,
    name,
  });
}

export function moveSkeleton(skeleton: Skeleton, x: number, y: number) {
  skeleton.container.sprite.x += x;
  skeleton.container.sprite.y += y;
  skeleton.container.playerDetectionZone.x += x;
  skeleton.container.playerDetectionZone.y += y;
}

function moveSkeletonToPlayer(skeleton: Skeleton) {
  const playerX = playerHitbox.x;
  const playerY = playerHitbox.y;

  const directionX = playerX - skeleton.container.sprite.x;
  const directionY = playerY - skeleton.container.sprite.y;

  const distance = Math.hypot(directionX, directionY);

  const normalizedDirectionX = directionX / distance;
  const normalizedDirectionY = directionY / distance;

  const speed = 1;
  moveSkeleton(skeleton, normalizedDirectionX * speed, normalizedDirectionY * speed);
}

app.ticker.add(() => {
  for (const skeleton of skeletons) {
    // if the detection zone is in collision with the player
    if (!isColliding(playerHitbox, skeleton.container.playerDetectionZone)) continue;
    moveSkeletonToPlayer(skeleton);
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

    if (isColliding(playerHitbox, skeleton.container.sprite) && !isInvulnerable()) {
      damagePlayer(1);
    }

    // move player on skeleton collison
    if (isColliding(playerHitbox, skeleton.container.sprite)) {
      movePlayer(collisionResponseDirection(playerHitbox, skeleton.container.sprite));
    }

    // move skeleton on player collision
    const skeletonASprite = skeleton.container.sprite;
    const dx = skeletonASprite.x - playerHitbox.x;
    const dy = skeletonASprite.y - playerHitbox.y;
    const distanceBetweenSkeletons = Math.hypot(dx, dy);

    // Supposons qu'un certain 'minDistance' représente la distance minimale que les squelettes doivent maintenir entre eux
    const minDistance = skeletonASprite.width / 2 + playerHitbox.width / 2; // ou une autre valeur selon la taille des squelettes

    if (distanceBetweenSkeletons < minDistance) {
    // Les squelettes sont trop proches, nous devons les repousser
      const overlap = minDistance - distanceBetweenSkeletons;
      const adjustX = (overlap / distanceBetweenSkeletons) * dx;
      const adjustY = (overlap / distanceBetweenSkeletons) * dy;

      // Ajuster les positions pour éviter la superposition
      moveSkeleton(skeleton, adjustX / 2, adjustY / 2);
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
      const dx = skeletonASprite.x - skeletonBSprite.x;
      const dy = skeletonASprite.y - skeletonBSprite.y;
      const distanceBetweenSkeletons = Math.hypot(dx, dy);

      // Supposons qu'un certain 'minDistance' représente la distance minimale que les squelettes doivent maintenir entre eux
      const minDistance = skeletonASprite.width / 2 + skeletonBSprite.width / 2; // ou une autre valeur selon la taille des squelettes

      if (distanceBetweenSkeletons < minDistance) {
        // Les squelettes sont trop proches, nous devons les repousser
        const overlap = minDistance - distanceBetweenSkeletons;
        const adjustX = (overlap / distanceBetweenSkeletons) * dx;
        const adjustY = (overlap / distanceBetweenSkeletons) * dy;

        // Ajuster les positions pour éviter la superposition
        moveSkeleton(skeletonA, adjustX / 2, adjustY / 2);
        moveSkeleton(skeletonB, -(adjustX / 2), -(adjustY / 2));
      }
    }
  }
});

export { skeletons };
