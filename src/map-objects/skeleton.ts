import { AnimatedSprite, Graphics, Texture } from 'pixi.js'; // Include Texture from pixi.js
import { camera } from '../camera';
import { collisionResponseDirection, isColliding, priority3 } from '../math/collisions';
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
    idle: new AnimatedSprite([]), // Initialize idle animation
    walk: new AnimatedSprite([]), // Initialize walk animation
    death: new AnimatedSprite([]), // Initialize death animation
  });
}

export function moveSkeleton(skeleton: Skeleton, x: number, y: number, delta: number) {
  skeleton.container.sprite.x += x * delta;
  skeleton.container.sprite.y += y * delta;
  skeleton.container.playerDetectionZone.x += x * delta;
  skeleton.container.playerDetectionZone.y += y * delta;
}

function handleAnimationState(skeleton: Skeleton) {
  switch (movement.current) {
    case SkeletonStates.Idle:
      // Set the texture array to the idle animation textures
      skeleton.container.sprite.textures = skeleton.idle.textures;
      break;
    case SkeletonStates.Walk:
      // Set the texture array to the walk animation textures
      skeleton.container.sprite.textures = skeleton.walk.textures;
      break;
    case SkeletonStates.Death:
      // Set the texture array to the death animation textures
      skeleton.container.sprite.textures = skeleton.death.textures;
      break;
    default:
      // Set a default texture (you can change this)
      skeleton.container.sprite.texture = Texture.EMPTY;
      break;
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
    // If the detection zone is in collision with the player
    if (!isColliding(player.hitbox, skeleton.container.playerDetectionZone)) continue;
    moveSkeletonToPlayer(skeleton, delta);
    handleAnimationState(skeleton);
    movement.current = SkeletonStates.Walk;
    // If the skeleton sprite is in collision with the player fireball, apply damage to the skeleton
    if (isColliding(skeleton.container.sprite, fireball)) {
      skeleton.life -= 1; // During development, disable fireball damage to skeletons
      // If the skeleton is dead
      if (skeleton.life <= 0) {
        handleAnimationState(skeleton);
        movement.current = SkeletonStates.Death;
        camera.removeChild(skeleton.container.sprite);
        camera.removeChild(skeleton.container.playerDetectionZone);
        skeletons = skeletons.filter((iteratedSkeleton) => iteratedSkeleton !== skeleton);
        // If it's a skeleton of room 2 (you can remove && gameConditions.skeletonToKillToOpenDoor2 > 0, since all skeletonRoomRight must be killed to open the door)
        // but you can keep it to implement a killed monster counter
        if (skeleton.name === 'skeletonRoomRight' && gameConditions.skeletonToKillToOpenDoor2 > 0) {
          gameConditions.skeletonToKillToOpenDoor2 -= 1;
          if (gameConditions.skeletonToKillToOpenDoor2 <= 0) {
            // Disable the room 2 door
            camera.removeChild(doorRoomRight);
            doorsContainers.list = doorsContainers.list.filter((doorContainer) => doorContainer !== doorRoomRight);
          }
        }
      }
    }

    if (isColliding(player.hitbox, skeleton.container.sprite) && !isInvulnerable()) {
      damagePlayer(1);
    }

    // Move player on skeleton collision
    if (isColliding(player.hitbox, skeleton.container.sprite)) {
      movePlayer(collisionResponseDirection(player.hitbox, skeleton.container.sprite), delta);
    }

    // Assume a certain 'minDistance' represents the minimum distance skeletons should maintain between each other
    const minDistance = skeletonASprite.width / 2 + player.hitbox.width / 2; // Or another value depending on the skeleton size

    if (distanceBetweenSkeletons < minDistance) {
      // Skeletons are too close, we need to push them apart
      const overlap = minDistance - distanceBetweenSkeletons * 1.5;
      const adjustX = (overlap / (3 * distanceBetweenSkeletons)) * dx;
      const adjustY = (overlap / (3 * distanceBetweenSkeletons)) * dy;

      // Adjust positions to avoid overlap
      moveSkeleton(skeleton, adjustX, adjustY, delta);
      // moveSkeleton(skeletonB, -(adjustX / 2), -(adjustY / 2), delta);
    }
  }

  // Second loop to handle collisions between skeletons
  for (let indexSkeletonA = 0; indexSkeletonA < skeletons.length; indexSkeletonA++) {
    for (let indexSkeletonB = indexSkeletonA + 1; indexSkeletonB < skeletons.length; indexSkeletonB++) {
      const skeletonA = skeletons[indexSkeletonA];
      const skeletonB = skeletons[indexSkeletonB];

      const skeletonASprite = skeletonA.container.sprite;
      const skeletonBSprite = skeletonB.container.sprite;
      const dx = skeletonASprite.x - skeletonBSprite.x;
      const dy = skeletonASprite.y - skeletonBSprite.y;
      const distanceBetweenSkeletons = Math.hypot(dx, dy);

      // Assume a certain 'minDistance' represents the minimum distance skeletons should maintain between each other
      const minDistance = skeletonASprite.width / 2 + skeletonBSprite.width / 2; // Or another value depending on the skeleton size

      if (distanceBetweenSkeletons < minDistance) {
        // Skeletons are too close, we need to push them apart
        const overlap = minDistance - distanceBetweenSkeletons * 1.3;
        const adjustX = (overlap / distanceBetweenSkeletons) * dx / 2;
        const adjustY = (overlap / distanceBetweenSkeletons) * dy / 2;

        // Adjust positions to avoid overlap
        moveSkeleton(skeletonA, adjustX / 2, adjustY / 2, delta);
        moveSkeleton(skeletonB, -(adjustX / 2), -(adjustY / 2), delta);
      }
    }
  }
}

export { skeletons };
