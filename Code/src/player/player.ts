import { Container, Graphics } from 'pixi.js';
import app from '../pixi/initialize';
import witchAnimation from './idle';

// ANIMATION

// dans ce container on mettra les sprites/animations
// axe x
// et y

// 128
// 105
const playerContainer = new Container();
playerContainer.x = 100; // +ou-la valeurs de decalage ?
playerContainer.y = 100; // +ou-la valeurs de decalage ?

// const x = {
//   position: player,
//   container: playerContainer,
// };

const base = {
  x: 32 * 4,
  y: 48 * 4,
};
const scale = 3;
const player = {
  x: 100 + 50,
  y: 100 + 50,
  width: base.x / scale,
  height: base.y / scale,
};

export {
  player,
  playerContainer,
};

// player
app.stage.addChild(playerContainer);
playerContainer.addChild(witchAnimation);

const playerHitbox = new Graphics();
playerHitbox.beginFill('#c8f542', 0.7);
playerHitbox.drawRect(50, 50, player.width, player.height);
playerContainer.addChild(playerHitbox);

app.ticker.add((delta: number) => {
  player.x = playerContainer.x + 50;
  player.y = playerContainer.y + 50;
});
