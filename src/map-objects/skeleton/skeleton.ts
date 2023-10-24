import { AnimatedSprite, Container, Graphics } from 'pixi.js';
import { camera } from '../../camera';
import app from '../../pixi/initialize';
import { isColliding } from '../../math/collisions';
import { playerHitbox } from '../../player/player';

import { atlasLoader } from '../../pixi/atlas-loader';
import { mapScaling } from '../../map/map-layers';
// import { gameConditions } from '../../map/game-conditions';
// import { doorsContainers } from '../door';
import { centerIfPivotIsUpperLeft } from '../../utils/utils';
import { fireball } from '../../player/fireball';
import { isInvulnerable, startInvulnerabilityTimer } from '../../player/invulnerability';
import { lifeHud } from '../../player/hud';
import { playerStats } from '../../player/stats';

enum SkeletonStates {
  Idle = 'Idle',
  Walk = 'Walk',
  Death = 'Death',
}

const movement: {current: SkeletonStates } = {
  current: SkeletonStates.Idle,
};

type Skeleton = {
  container: Container;
  detectionZone: Graphics;
  life: number;
  name: string;
  damage: number;
  state: SkeletonStates;
  animations: Array<{name: SkeletonStates; sprite: AnimatedSprite}>;
};

const skeletons: Skeleton[] = [];

export function createSkeleton(x: number, y: number, name: string) {
  const animations = new Container();
  animations.x = x;
  animations.y = y;
  const idle = new AnimatedSprite(atlasLoader.skeleton.animations.skeleton);
  idle.scale.set(mapScaling);
  idle.animationSpeed = 0.13;
  idle.visible = true;
  idle.play();
  camera.addChild(animations);

  const walk = new AnimatedSprite(atlasLoader.skeletonwalk.animations.skeletonwalk);
  walk.scale.set(mapScaling);
  walk.animationSpeed = 0.13;
  walk.visible = false;
  walk.play();
  walk.visible = false; // Commencez par masquer l'animation de marche

  const death = new AnimatedSprite(atlasLoader.skeletondeath.animations.skeletondeath);
  death.scale.set(mapScaling);
  death.visible = false;
  death.animationSpeed = 0.13;
  death.loop = false;
  death.visible = false; // Commencez par masquer l'animation de mort

  animations.addChild(idle, walk, death);

  const playerDetectionZone = new Graphics();
  playerDetectionZone.beginFill(0xFF_FF_FF, 0.5); // 'white' remplacé par 0xFFFFFF pour PIXI
  const playerDetectionZonePosition = centerIfPivotIsUpperLeft(
    {
      x: idle.x,
      y: idle.y,
      width: idle.width,
      height: idle.height,
    },
    6.5,
  );
  playerDetectionZone.x = playerDetectionZonePosition.x;
  playerDetectionZone.y = playerDetectionZonePosition.y;
  playerDetectionZone.drawRect(0, 0, playerDetectionZonePosition.width, playerDetectionZonePosition.height);
  playerDetectionZone.visible = false; // dispaly or hide the player detection zone
  camera.addChild(playerDetectionZone);

  const skeleton: Skeleton = {
    container: animations,
    animations: [
      { name: SkeletonStates.Idle, sprite: idle },
      { name: SkeletonStates.Walk, sprite: walk },
      { name: SkeletonStates.Death, sprite: death },
    ],
    life: 15,
    damage: 1,
    name,
    state: SkeletonStates.Idle,
    detectionZone: playerDetectionZone,
  };

  skeletons.push(skeleton);
}

export function moveSkeleton(skeleton: Skeleton, x: number, y: number) {
  skeleton.container.x += x;
  skeleton.container.y += y;
  skeleton.detectionZone.x += x;
  skeleton.detectionZone.y += y;
  skeleton.state = SkeletonStates.Walk;
}

function handleAnimationState(skeleton: Skeleton) {
  for (const animation of skeleton.animations) {
    switch (skeleton.state) {
      case SkeletonStates.Idle:
        animation.sprite.visible = animation.name === SkeletonStates.Idle;
        break;
      case SkeletonStates.Walk:
        animation.sprite.visible = animation.name === SkeletonStates.Walk;
        break;
      case SkeletonStates.Death:
        animation.sprite.visible = animation.name === SkeletonStates.Death;
        break;
      default:
        animation.sprite.visible = animation.name === SkeletonStates.Idle;
    }
  }
}

function moveSkeletonToPlayer(skeleton: Skeleton) {
  const playerX = playerHitbox.x;
  const playerY = playerHitbox.y;

  const directionX = playerX - skeleton.container.x;
  const directionY = playerY - skeleton.container.y;

  const distance = Math.hypot(directionX, directionY);

  const normalizedDirectionX = directionX / distance;
  const normalizedDirectionY = directionY / distance;

  const speed = 1;
  moveSkeleton(skeleton, normalizedDirectionX * speed, normalizedDirectionY * speed);

  skeleton.state = SkeletonStates.Walk;
}

app.ticker.add(() => {
  for (const skeleton of skeletons) {
    handleAnimationState(skeleton);
    // if the detection zone is in collision with the player
    if (!isColliding(playerHitbox, skeleton.detectionZone)) continue;
    // Gérer l'animation de marche
    moveSkeletonToPlayer(skeleton);

    if (!isInvulnerable() && isColliding(playerHitbox, skeleton.container)) {
      startInvulnerabilityTimer();
      playerStats.life -= 1;
      lifeHud.text = `Vie : ${playerStats.life}`;
    }

    // if the skeleton sprite is in collision with the player fireball, apply damage to the skeleton
    if (isColliding(skeleton.container, fireball)) {
      startInvulnerabilityTimer();
      skeleton.life -= 1;
      console.log('damage to skeleton');
      if (skeleton.life <= 0) {
        skeleton.state = SkeletonStates.Death;
      }
    }
  }

  // Deuxième boucle pour gérer les collisions entre les squelettes
  for (let indexSkeletonA = 0; indexSkeletonA < skeletons.length; indexSkeletonA++) {
    for (let indexSkeletonB = indexSkeletonA + 1; indexSkeletonB < skeletons.length; indexSkeletonB++) {
      const skeletonA = skeletons[indexSkeletonA];
      const skeletonB = skeletons[indexSkeletonB];

      const skeletonASprite = skeletonA.container;
      const skeletonBSprite = skeletonB.container;
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
