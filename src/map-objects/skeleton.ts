import { AnimatedSprite, Graphics } from 'pixi.js';
import { Sound } from '@pixi/sound';
import { camera } from '../camera';
import { isColliding } from '../math/collisions';
import { player } from '../player/player';
import { atlasLoader } from '../pixi/atlas-loader';
import { mapScaling } from '../map/map-layers';
import { gameConditions } from '../map/game-conditions';
import { doorRoomRight, doorsContainers } from './door';
import { centerIfPivotIsUpperLeft } from '../utils/utils';
import { fireball } from '../player/fireball';
import { isInvulnerable } from '../player/invulnerability';
import { damagePlayer } from '../player/receive-damage';
import { inventory } from '../player/inventory';

const skeletonDamageSound = Sound.from(atlasLoader.skeletonsound);
const skeletonDeathSound = Sound.from(atlasLoader.burn);

export enum SkeletonStates {
  Idle,
  Walk,
  Death,
}

type SkeletonAnimations = {
  idle: AnimatedSprite;
  walk: AnimatedSprite;
  death: AnimatedSprite;
};

type Skeleton = {
  playerDetectionZone: Graphics;
  animations: SkeletonAnimations;
  state: SkeletonStates;
  life: number;
  name: string;
  damage: number;
};

export let skeletons: Skeleton[] = [];

export function createSkeleton(x: number, y: number, name: string) {
  const state = SkeletonStates.Idle;

  const idle = new AnimatedSprite(atlasLoader.skeletonIdle.animations.default);
  idle.anchor.x = 0.5;
  idle.scale.set(mapScaling);
  idle.animationSpeed = 0.13;
  idle.play();
  idle.x = x;
  idle.y = y;
  camera.addChild(idle);

  const walk = new AnimatedSprite(atlasLoader.skeletonWalk.animations.default);
  walk.anchor.x = 0.5;
  walk.scale.set(mapScaling);
  walk.animationSpeed = 0.13;
  walk.play();
  walk.x = x;
  walk.y = y;
  walk.visible = false;
  camera.addChild(walk);

  const death = new AnimatedSprite(atlasLoader.skeletonDeath.animations.default);
  death.anchor.x = 0.5;
  death.scale.set(mapScaling);
  death.animationSpeed = 0.13;
  death.stop();
  death.x = x;
  death.y = y;
  death.visible = false;
  camera.addChild(death);

  // const d = new Graphics();
  // d.beginFill('red');
  // d.drawRect(idle.x - (idle.width / 2), idle.y, idle.width, idle.height);
  // camera.addChild(d);

  const playerDetectionZone = new Graphics();
  playerDetectionZone.beginFill('white', 0.5);
  const playerDetectionZonePosition = centerIfPivotIsUpperLeft(
    {
      x: idle.x,
      y: idle.y,
      width: idle.width,
      height: idle.height,
    },
    9,
  );
  playerDetectionZone.x = playerDetectionZonePosition.x;
  playerDetectionZone.y = playerDetectionZonePosition.y;
  playerDetectionZone.drawRect(0, 0, playerDetectionZonePosition.width, playerDetectionZonePosition.height);
  playerDetectionZone.visible = false; // ! DURING DEV, DISPLAY THE PLAYER DETECTION ZONE
  camera.addChild(playerDetectionZone);

  skeletons.push({
    animations: {
      idle,
      walk,
      death,
    },
    state,
    playerDetectionZone,
    life: 5, // 35
    damage: 1,
    name,
  });

  death.onLoop = () => {
    camera.removeChild(death);
  };
}

export function moveSkeleton(skeleton: Skeleton, x: number, y: number, delta: number) {
  skeleton.animations.idle.x += x * delta;
  skeleton.animations.idle.y += y * delta;

  skeleton.animations.walk.x += x * delta;
  skeleton.animations.walk.y += y * delta;

  skeleton.animations.death.x += x * delta;
  skeleton.animations.death.y += y * delta;

  skeleton.playerDetectionZone.x += x * delta;
  skeleton.playerDetectionZone.y += y * delta;
}

function moveSkeletonToPlayer(skeleton: Skeleton, delta: number) {
  skeleton.state = SkeletonStates.Walk;
  const playerX = player.hitbox.x;
  const playerY = player.hitbox.y;

  const directionX = playerX - skeleton.animations.idle.x;
  const directionY = playerY - skeleton.animations.idle.y;

  const marginPixels = 5;
  if (Math.abs(directionX) <= marginPixels && Math.abs(directionY) <= marginPixels) {
    return; // pour bloquer l'anim, en dessous du 0.0 du player avec quelques pixels en plus autour
  }

  const distance = Math.hypot(directionX, directionY);

  const normalizedDirectionX = directionX / distance;
  const normalizedDirectionY = directionY / distance;

  const speed = 1;
  moveSkeleton(skeleton, normalizedDirectionX * speed, normalizedDirectionY * speed, delta);

  skeleton.animations.idle.scale.x = (normalizedDirectionX < 0 ? -1 : 1) * mapScaling;
  skeleton.animations.walk.scale.x = (normalizedDirectionX < 0 ? -1 : 1) * mapScaling;
  skeleton.animations.death.scale.x = (normalizedDirectionX < 0 ? -1 : 1) * mapScaling;
}

function skeletonsStatesLoop(skeleton: Skeleton) {
  switch (skeleton.state) {
    case SkeletonStates.Idle:
      // afficher l'animation idle
      skeleton.animations.idle.visible = true;
      // cacher l'animation walk
      skeleton.animations.walk.visible = false;
      // cacher l'animation death
      skeleton.animations.death.visible = false;
      break;
    case SkeletonStates.Walk:
      // cacher l'animation idle
      skeleton.animations.idle.visible = false;
      // afficher l'animation walk
      skeleton.animations.walk.visible = true;
      // cacher l'animation death
      skeleton.animations.death.visible = false;
      break;
    case SkeletonStates.Death:
      skeleton.animations.death.play();
      skeleton.animations.death.visible = true;
      camera.removeChild(skeleton.animations.idle);
      camera.removeChild(skeleton.animations.walk);
      camera.removeChild(skeleton.playerDetectionZone);
      skeletons = skeletons.filter((itaratedSkeleton) => itaratedSkeleton !== skeleton);
      break;
    default:
      break;
  }
}

export function skeletonsGameLoop(delta: number) {
  for (const skeleton of skeletons) {
    skeletonsStatesLoop(skeleton);
    if (skeleton.name === 'skeletonBoss' && inventory.keys !== 3) continue;
    if (skeleton.life <= 0) continue;
    // if the detection zone is in collision with the player
    if (isColliding(player.hitbox, skeleton.playerDetectionZone)) {
      moveSkeletonToPlayer(skeleton, delta);
    } else {
      skeleton.state = SkeletonStates.Idle;
      continue;
    }

    // if the skeleton sprite is in collision with the player fireball, apply damage to the skeleton
    if (isColliding(skeleton.animations.idle, fireball)) {
      skeleton.life -= 1; // DURING DEV, DISABLE FIREBALL DAMAGE TO SKELETONS
      skeletonDamageSound.play();
      // is the skeleton die
      if (skeleton.life > 0) continue;
      console.log('Death');
      skeleton.state = SkeletonStates.Death;
      skeletonDeathSound.play();
      // if it's skeleton of room 2 (you can remove && mapCondition.skeletonToKillToOpenDoor2 > 0, since all skeletonRoomRight bust be killed to open the door)
      // but we can keep it to implement a killed monster counter
      if (skeleton.name === 'skeletonRoomRight' && gameConditions.skeletonToKillToOpenDoor2 > 0) {
        gameConditions.skeletonToKillToOpenDoor2 -= 1;
        if (gameConditions.skeletonToKillToOpenDoor2 > 0) continue;
        // disable the room2 door
        camera.removeChild(doorRoomRight);
        doorsContainers.list = doorsContainers.list.filter((doorContainer) => doorContainer !== doorRoomRight);
      }

      continue;
    }

    if (isColliding(player.hitbox, skeleton.animations.idle) && !isInvulnerable()) {
      damagePlayer(1);
    }

    skeleton.animations.idle.alpha = isColliding(player.hitbox, skeleton.animations.idle) ? 0.5 : 1;
    skeleton.animations.walk.alpha = isColliding(player.hitbox, skeleton.animations.idle) ? 0.5 : 1;
    skeleton.animations.death.alpha = isColliding(player.hitbox, skeleton.animations.idle) ? 0.5 : 1;
  }

  // Deuxième boucle pour gérer les collisions entre les squelettes
  for (let indexSkeletonA = 0; indexSkeletonA < skeletons.length; indexSkeletonA++) {
    for (let indexSkeletonB = indexSkeletonA + 1; indexSkeletonB < skeletons.length; indexSkeletonB++) {
      const skeletonA = skeletons[indexSkeletonA];
      const skeletonB = skeletons[indexSkeletonB];

      if (skeletonA.life <= 0 || skeletonB.life <= 0) continue;

      const skeletonASprite = skeletonA.animations.idle;
      const skeletonBSprite = skeletonB.animations.idle;
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
