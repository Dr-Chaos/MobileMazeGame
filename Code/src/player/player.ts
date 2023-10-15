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
const scale = 1;
const player = {
  x: playerContainer.x,
  y: playerContainer.y,
  width: base.x / scale,
  height: base.y / scale,
  life: 5,
};

export {
  player,
  playerContainer,
};

// hitbox
const playerHitbox = new Graphics();
playerHitbox.beginFill('#8c9fff', 0.4);
playerHitbox.drawRect(0, 0, player.width, player.height);
playerContainer.addChild(playerHitbox);

// animated sprite
app.stage.addChild(playerContainer);
playerContainer.addChild(witchAnimation);

app.ticker.add((delta: number) => {
  player.x = playerContainer.x;
  player.y = playerContainer.y;
});
