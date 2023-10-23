import { Container } from 'pixi.js';
import witchIdleAnimation from './idle';
import { playerContainer } from './player';
import witchWalkAnimation from './walk';
import app from '../pixi/initialize';
// import witchDeathAnimation from './death

const playerAnimation = {
  width: 32,
  height: 48,
};
const playerAnimationsContainer = new Container();
playerAnimationsContainer.pivot.x = playerAnimation.width / 2; // place le pivot au millieux du sprite pour pouvoir le rotate
playerAnimationsContainer.pivot.y = playerAnimation.height / 2;
playerContainer.addChild(playerAnimationsContainer);

playerAnimationsContainer.addChild(witchIdleAnimation);
playerAnimationsContainer.addChild(witchWalkAnimation);
// playerAnimationsContainer.x = playerContainer.x;
// playerAnimationsContainer.y = playerContainer.y - (playerAnimation.height / 2);

enum Movements {
  Idle = 'Idle',
  Walk = 'Walk',
}

const movement = {
  current: 'Idle',
};

const animations = [
  { state: Movements.Idle, animation: witchIdleAnimation },
  { state: Movements.Walk, animation: witchWalkAnimation },
];

app.ticker.add(() => {
  for (const animation of animations) {
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
});

export {
  Movements,
  movement,
  playerAnimationsContainer,
};
