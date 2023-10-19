import { Container, Graphics } from 'pixi.js';
import app from '../pixi/initialize';
import witchIdleAnimation from './idle';
import witchWalkAnimation from './walk';
import { camera } from './camera';

// ANIMATION

// dans ce container on mettra les sprites/animations
// axe x
// et y

// 128
// 105
const playerContainer = new Container();
playerContainer.zIndex = 1;
playerContainer.x = 0; // +ou-la valeurs de decalage ?
playerContainer.y = 0; // +ou-la valeurs de decalage ?
// playerContainer.pivot.x = (playerContainer.width / playerContainer.scale.x) * 0.5;
// playerContainer.pivot.y = (playerContainer.height / playerContainer.scale.y) * 0.5;
// const x = {
//   position: player,
//   container: playerContainer,
// };

const base = {
  x: 10,
  y: 10,
};
const scaleX = 1.5;
const scaleY = 1.5;
const offsetX = 8;
const offsetY = 20;
const player = {
  x: playerContainer.x - offsetX,
  y: playerContainer.y + offsetY,
  width: base.x / scaleX,
  height: base.y / scaleY,
  life: 5,
};

// hitbox
const playerHitbox = new Graphics();
playerHitbox.beginFill('#8c9fff', 0.4);
playerHitbox.x = player.x;
playerHitbox.y = player.y;
playerHitbox.drawRect(0, 0, player.width, player.height);
app.stage.addChild(playerHitbox);

playerContainer.pivot.x = (playerHitbox.width / playerHitbox.scale.x) * 0.5;
playerContainer.pivot.y = (playerHitbox.height / playerHitbox.scale.y) * 0.5;

camera.addChild(playerContainer);
playerContainer.addChild(witchIdleAnimation);
playerContainer.addChild(witchWalkAnimation);

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
  player,
  playerContainer,
  movement,
  Movements,
  playerHitbox,
};
