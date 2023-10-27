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
enum SkeletonStates {
  Idle = 'Idle',
  Walk = 'Walk',
  Death = 'Death',
}

const movement: { current: SkeletonStates } = {
  current: SkeletonStates.Idle,
};
type Skeleton = {
  container: SkeletonContainer;
  life: number;
  name: string;
  damage: number;
  idle: AnimatedSprite;
  walk: AnimatedSprite;
  death: AnimatedSprite;
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
  // const idle = new AnimatedSprite(atlasLoader.skeleton.animations.skeleton);
  // quand on lance le jeu, le skeleton joue l'animation IDLE par defaut
  // idle.play();
  // animation walk
  // const walk = new AnimatedSprite(atlasLoader.skeletonwalk.animations.skeletonwalk);
  // on cache walk au lencement du jeu
  // walk.play();
  // animation mort
  // const death = new AnimatedSprite(atlasLoader.skeletondeath.animations.skeletondeath);
  // death.play();
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

function handleAnimationState(skeleton: Skeleton) {
  const animation = skeleton.container.sprite;

  switch (movement.current) {
    case SkeletonStates.Idle:
      animation.textures = atlasLoader.skeleton.animations.idle;
      break;
    case SkeletonStates.Walk:
      animation.textures = atlasLoader.skeleton.animations.walk;
      break;
    case SkeletonStates.Death:
      animation.textures = atlasLoader.skeleton.animations.death;
      break;
    default:
      animation.textures = atlasLoader.skeleton.animations.idle;
  }
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

  // Déplacez le squelette
  skeleton.container.sprite.x += normalizedDirectionX * speed;
  skeleton.container.sprite.y += normalizedDirectionY * speed;

  // Vérifiez la collision avec le joueur
  if (isColliding(skeleton.container.sprite, player.hitbox)) {
    // Laissez les squelettes continuer à se déplacer vers le joueur même après la collision
  }
}

export function skeletonsGameLoop(delta: number) {
  for (const skeleton of skeletons) {
    // if the detection zone is in collision with the player
    if (!isColliding(player.hitbox, skeleton.container.playerDetectionZone)) continue;
    moveSkeletonToPlayer(skeleton, delta);
    movement.current = SkeletonStates.Walk;
    skeleton.container.walk;
    // if the skeleton sprite is in collision with the player fireball, apply damage to the skeleton
    if (isColliding(skeleton.container.sprite, fireball)) {
      skeleton.life -= 1; // DURING DEV, DISABLE FIREBALL DAMAGE TO SKELETONS
      // is the skeleton die
      if (skeleton.life > 0) continue;
      movement.current = SkeletonStates.Death;
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

    // move skeleton on player collision
    const skeletonASprite = skeleton.container.sprite;
    const dx = skeletonASprite.x - player.hitbox.x / 2;
    const dy = skeletonASprite.y - player.hitbox.y / 2;
    const distanceBetweenSkeletons = Math.hypot(dx, dy);

    // Supposons qu'un certain 'minDistance' représente la distance minimale que les squelettes doivent maintenir entre eux
    const minDistance = skeletonASprite.width / 2 + player.hitbox.width / 2; // ou une autre valeur selon la taille des squelettes

    if (distanceBetweenSkeletons < minDistance) {
    // Les squelettes sont trop proches, nous devons les repousser
      const overlap = minDistance - distanceBetweenSkeletons * 1.6;
      const adjustX = (overlap / 3 / distanceBetweenSkeletons) * dx;
      const adjustY = (overlap / 3 / distanceBetweenSkeletons) * dy;

      // Ajuster les positions pour éviter la superposition
      moveSkeleton(skeleton, adjustX, adjustY, delta);
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
        const overlap = minDistance - distanceBetweenSkeletons * 1.3;
        const adjustX = (overlap / distanceBetweenSkeletons) * dx / 2;
        const adjustY = (overlap / distanceBetweenSkeletons) * dy / 2;

        // Ajuster les positions pour éviter la superposition
        moveSkeleton(skeletonA, adjustX / 2, adjustY / 2, delta);
        moveSkeleton(skeletonB, -(adjustX / 2), -(adjustY / 2), delta);
      }
    }
  }
}

export { skeletons };
