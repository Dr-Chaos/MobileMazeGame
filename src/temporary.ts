import { AnimatedSprite } from 'pixi.js';
import { atlasLoader } from './pixi/atlas-loader';
import { camera } from './camera';

// machine à etats enum = Superconstante
export enum SkeletonStates {
  Idle,
  Walk,
  Death,
}

type Skeleton = {
  vie: number;
  degat: number;
  idle: AnimatedSprite;
  walk: AnimatedSprite;
  death: AnimatedSprite;
  zoneDetection: {x: number; y: number; width: number; height: number };
  speed: number;
  state: SkeletonStates;
};

export const skeletons: Skeleton[] = [];

export function createSkeleton() {
  // vie
  const vie = 5;
  // degats
  const degat = 1;
  // animation idle
  const idle = new AnimatedSprite(atlasLoader.skeleton.animations.skeleton);
  // quand on lance le jeu, le skeleton joue l'animation IDLE par defaut
  idle.play();
  idle.animationSpeed = 0.15;
  idle.visible = true;
  idle.scale.set(3);
  // animation walk
  const walk = new AnimatedSprite(atlasLoader.skeletonwalk.animations.skeletonwalk);
  // on cache walk au lencement du jeu
  walk.play();
  walk.animationSpeed = 0.15;
  walk.visible = false;
  walk.scale.set(3);
  // animation mort
  const death = new AnimatedSprite(atlasLoader.skeletondeath.animations.skeletondeath);
  death.play();
  death.animationSpeed = 0.15;
  death.visible = false;
  death.scale.set(3);
  // zone detection carrée
  // un carré, x, y, width, height
  const zoneDetection = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  };
  // vitesse deplacement
  const speed = 1;
  // state du skeleton
  const state = SkeletonStates.Idle;
  // afficher dans le jeu
  camera.addChild(idle);
  camera.addChild(walk);
  camera.addChild(death);
  // create de l'objet skeleton
  const skeleton: Skeleton = {
    vie,
    degat,
    idle,
    walk,
    death,
    zoneDetection,
    speed,
    state,
  };

  // ajouter à la list des skeletons
  skeletons.push(skeleton);
}

function moveSkeleton(skeleton: Skeleton) {
  // is il bouge
  currentState = SkeletonStates.Walk;
  // si la zone de detection entre en collision avec le joueur
  // bouge le skeleton vers le jouer
  // si le skelleton rentre en collision avec le joueur
  // joueur pv -1
}

function damageSkeleton() {
  // si la fireball du joueur entre cooolision avec skeleton
  // skeleton vie -1
  // si skeleton vie <= 0
  // deathSkeleton()
  currentState = SkeletonStates.Death;
}

function deathSkeleton() {
  // joue l'animation de mort
  // détriut le skeleton dans la liste de skeleton
}

// chaque frame
export function gameLoop() {
  for (const skeleton of skeletons) {
    // moveSkeleton(skeleton);
    // MACHINE A ETAT
    // quand il ne fait rien
    // skeleton.state = StateSkeleton.Idle;
    // // quand il bouge
    // skeleton.state = StateSkeleton.Walk;
    // // quand il marcheaa
    // skeleton.state = StateSkeleton.Death;

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

// }

// const users = ['leon', 'nico', 'flo'];
// // CECI
// console.log(users[0]); // leon
// console.log(users[1]); // nico
// console.log(users[2]); // flo
// // CECI
// for (const iterator of users) {
//   console.log(iterator);
// }
