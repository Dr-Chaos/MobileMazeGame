import { Container, AnimatedSprite, Graphics } from 'pixi.js';
import { camera } from '../../camera';
// import app from '../../pixi/initialize';
import { isColliding } from '../../math/collisions';
import { playerHitbox } from '../../player/player';
import { atlasLoader } from '../../pixi/atlas-loader';
import { mapScaling } from '../../map/map-layers';
// import { gameConditions } from '../../map/game-conditions';
// import { doorRoomRight, doorsContainers } from '../door';
import { centerIfPivotIsUpperLeft } from '../../utils/utils';
import { fireball } from '../../player/fireball';
import { isInvulnerable, startInvulnerabilityTimer } from '../../player/invulnerability';
import { lifeHud } from '../../player/hud';
import { playerStats } from '../../player/stats';

// machine à etats enum = Superconstante
export enum SkeletonStates {
  Idle,
  Walk,
  Death,
}

type Skeleton = {
  life: number;
  degat: number;
  idle: AnimatedSprite;
  walk: AnimatedSprite;
  death: AnimatedSprite;
  zoneDetection: {x: number; y: number; width: number; height: number };
  speed: number;
  state: SkeletonStates;
  container: Container;
};

export const skeletons: Skeleton[] = [];

export function createSkeleton(x: number, y: number, name: string) {
  // life
  const life = 5;
  // degats
  const degat = 1;
  // animation idle
  const idle = new AnimatedSprite(atlasLoader.skeleton.animations.skeleton);
  // quand on lance le jeu, le skeleton joue l'animation IDLE par defaut
  idle.play();
  // animation walk
  const walk = new AnimatedSprite(atlasLoader.skeletonwalk.animations.skeletonwalk);
  // on cache walk au lencement du jeu
  walk.play();
  // animation mort
  const death = new AnimatedSprite(atlasLoader.skeletondeath.animations.skeletondeath);
  death.play();
  // zone detection carrée
  // un carré, x, y, width, height

  // vitesse deplacement
  const speed = 1;
  // state du skeleton
  const state = SkeletonStates.Idle;
  // constante contanier
  const container = new Container();
  container.x = x;
  container.y = y;
  container.name = name;
  container.addChild(idle);
  container.addChild(walk);
  container.addChild(death);
  idle.visible = true;
  walk.visible = false;
  death.visible = false;
  idle.animationSpeed = 0.15;
  walk.animationSpeed = 0.15;
  death.animationSpeed = 0.15;
  container.scale.set(mapScaling);

  // afficher dans le jeu
  camera.addChild(container);
  // create de l'objet skeleton
  const playerDetectionZonePosition = centerIfPivotIsUpperLeft(
    {
      x: container.x,
      y: container.y,
      width: container.width,
      height: container.height,
    },
    6.5,
  );
  const playerDetectionZone = new Graphics();
  playerDetectionZone.beginFill('white', 0.5);
  playerDetectionZone.x = playerDetectionZonePosition.x;
  playerDetectionZone.y = playerDetectionZonePosition.y;
  playerDetectionZone.drawRect(0, 0, playerDetectionZonePosition.width, playerDetectionZonePosition.height);
  playerDetectionZone.visible = true; // dispaly or hide the player detection zone
  camera.addChild(playerDetectionZone);
  const zoneDetection = {
    x: playerDetectionZonePosition.x,
    y: playerDetectionZonePosition.y,
    width: playerDetectionZonePosition.width,
    height: playerDetectionZonePosition.height,
  };

  const skeleton: Skeleton = {
    life,
    degat,
    idle,
    walk,
    death,
    zoneDetection,
    speed,
    state,
    container,
  };

  // ajouter à la list des skeletons
  skeletons.push(skeleton);
}

// la ya erreur eslint, (reaffection de propieté)
// créer des méthodes setter dans la classe/objet Skeleton ou de manipuler l'état ?
// peut-être creer une nouvelle constante ?
export function moveSkeleton(skeleton: Skeleton, x: number, y: number) {
  skeleton.container.x += x;
  skeleton.container.y += y;
  skeleton.zoneDetection.x += x;
  skeleton.zoneDetection.y += y;
  skeleton.state = SkeletonStates.Walk;
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
}

// chaque frame
export function gameLoop() {
  for (const skeleton of skeletons) {
    // moveSkeleton(skeleton);
    if (!isColliding(playerHitbox, skeleton.zoneDetection)) continue; // Utilisez zoneDetection, qui est déjà défini dans votre premier code.
    moveSkeletonToPlayer(skeleton);
    if (!isInvulnerable() && isColliding(playerHitbox, skeleton.container)) {
      startInvulnerabilityTimer();
      playerStats.life -= 1;
      lifeHud.text = `Vie : ${playerStats.life}`;
    }

    if (isColliding(skeleton.container, fireball)) {
      skeleton.life -= 1;
      console.log('damage to skeleton');
      if (skeleton.life <= 0) {
        skeleton.state = SkeletonStates.Death;
        console.log('damage to skeleton');
        skeleton.death.visible = true;
        skeleton.walk.visible = false;// Utilisation de votre structure d'animation existante.
        skeleton.death.play();
        camera.removeChild(skeleton.container);
        // dois-je remove autrement ?
        // Ici, vous pouvez également gérer la suppression du squelette de la liste 'skeletons' si nécessaire.
      }
    }

    switch (skeleton.state) {
      case SkeletonStates.Idle:
        // afficher l'animation idle
        skeleton.idle.visible = true;
        // cacher l'animation walk
        skeleton.walk.visible = false;
        // cacher l'animation death
        skeleton.death.visible = false;
        break;
      case SkeletonStates.Walk:
        // cacher l'animation idle
        skeleton.idle.visible = false;
        // afficher l'animation walk
        skeleton.walk.visible = true;
        // cacher l'animation death
        skeleton.death.visible = false;
        break;
      case SkeletonStates.Death:
        // cacher l'animation idle
        skeleton.idle.visible = false;
        // cacher l'animation walk
        skeleton.walk.visible = false;
        // afficher l'animation death
        skeleton.death.visible = true;
        break;
      default:
        break;
    }
  }
}

// meme probleme eslint?
// p-e je dois juste metttre dans la loop?
// skeleton doit être defini
