import { Container } from 'pixi.js';
import witchIdleAnimation from './idle';
import witchWalkAnimation from './walk';
import witchDamageAnimation from './damage';
import witchDeathAnimation from './death';
import { player } from '../player';

enum Movements {
  Idle = 'Idle',
  Walk = 'Walk',
}

const movement: {current: Movements } = {
  current: Movements.Idle,
};

export enum AnimationStates {
  ReceiveDamage = 'ReceiveDamage',
  Death = 'Death',
  CanMove = 'CanMove',
}

export const animationState: {current: AnimationStates } = {
  current: AnimationStates.CanMove,
};

const animations = [
  { state: Movements.Idle, animation: witchIdleAnimation },
  { state: Movements.Walk, animation: witchWalkAnimation },
  { state: AnimationStates.ReceiveDamage, animation: witchDamageAnimation },
  { state: AnimationStates.Death, animation: witchDeathAnimation },
];

const playerAnimation = {
  width: 32,
  height: 48,
};

const playerAnimationsContainer = new Container();

export function initializePlayerAnimations() {
  // Initialize state
  movement.current = Movements.Idle;
  animationState.current = AnimationStates.CanMove;

  playerAnimationsContainer.pivot.x = playerAnimation.width / 2; // place le pivot au millieux du sprite pour pouvoir le rotate
  playerAnimationsContainer.pivot.y = playerAnimation.height / 2;
  player.container.addChild(playerAnimationsContainer);

  playerAnimationsContainer.addChild(witchIdleAnimation);
  playerAnimationsContainer.addChild(witchWalkAnimation);
  playerAnimationsContainer.addChild(witchDamageAnimation);
  playerAnimationsContainer.addChild(witchDeathAnimation);
}

export function animationsGameLoop() {
  for (const animation of animations) {
    if (animationState.current === AnimationStates.ReceiveDamage) {
      if (animation.state === AnimationStates.ReceiveDamage) animation.animation.play();
      animation.animation.visible = animation.state === AnimationStates.ReceiveDamage;
      continue;
    }

    if (animationState.current === AnimationStates.Death) {
      if (animation.state === AnimationStates.Death && !animation.animation.visible) {
        animation.animation.gotoAndPlay(0);
        animation.animation.visible = true;
        animation.animation.animationSpeed = 0.3;
      }

      animation.animation.visible = animation.state === AnimationStates.Death;
      continue;
    }

    switch (movement.current) {
      case Movements.Idle:
        animation.animation.visible = animation.state === Movements.Idle;
        break;
      case Movements.Walk:
        animation.animation.visible = animation.state === Movements.Walk;
        break;
      default:
        animation.animation.visible = animation.state === Movements.Idle;
        break;
    }
  }
}

export {
  Movements,
  movement,
  playerAnimationsContainer,
};
