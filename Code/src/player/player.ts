import { Container, Graphics } from 'pixi.js';
import app from '../pixi/initialize';
import witchIdleAnimation from './idle';
import witchWalkAnimation from './walk';
import { camera } from './camera';

const playerContainer = new Container();
playerContainer.x = 0;
camera.addChild(playerContainer);

// const playerHitbox = {
//   x: 5,
//   y: 12,
//   width: 20,
//   height: 30,
// };

const playerHitbox = {
  x: 0,
  y: 0,
  width: 30,
  height: 50,
  scale: {
    x: 1,
    y: 1,
  },
};

export function getPlayerHitboxWorldPosition() {
  return {
    x: app.screen.width / 2 + camera.pivot.x - playerHitbox.width / 2,
    y: app.screen.height / 2 + camera.pivot.y - playerHitbox.height / 2,
    width: 30,
    height: 50,
  };
}

const playerStats = {
  life: 5,
};

// set anchore at the center of the hitbox
playerContainer.pivot.x = (playerHitbox.width / playerHitbox.scale.x) * 0.5;
playerContainer.pivot.y = (playerHitbox.height / playerHitbox.scale.y) * 0.5;

// adjust the camera
// camera.pivot.copyFrom(playerContainer);

// hitbox
const playerHitboxDraw = new Graphics();
playerHitboxDraw.beginFill('#8c9fff', 0.4);
playerHitboxDraw.drawRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);
playerContainer.addChild(playerHitboxDraw);

// animated sprite
playerContainer.addChild(witchIdleAnimation);
playerContainer.addChild(witchWalkAnimation);

console.log(witchIdleAnimation.scale.x);

app.ticker.add(() => {
  // playerHitboxWorldPosition.x = camera.pivot.x;

  // playerHitbox.x = camera.pivot.x;
  // playerHitbox.y = camera.pivot.y;
  // app.screen.width / 2 + camera.pivot.x
  // console.log(app.screen.height / 2 + camera.pivot.y);

  // playerHitboxDraw.x = playerContainer.x;
  // playerHitboxDraw.y = playerContainer.y;
});

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
  playerHitbox,
  playerStats,
  playerContainer,
  movement,
  Movements,

};
