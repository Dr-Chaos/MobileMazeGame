import { Container, Graphics } from 'pixi.js';
import { camera } from '../camera';

const playerContainer = new Container();
// playerContainer.y = camera.y - (48 / 2);
camera.addChild(playerContainer);
// initialize the camera
camera.pivot.copyFrom(playerContainer);

const spriteSize = {
  x: 32,
  y: 48,
};

// if you keep default playerContainer.x and playerContainer.y values (0 by default)
// const playerHitbox = {
//   x: 5,
//   y: playerContainer.y + 12,
//   width: 20,
//   height: 30,
// };
// else we need to increment the initial playerContainer.x and playerContainer.y positions
const playerHitbox = {
  x: -(spriteSize.x / 2) + 6.5, // center of the sprite -/+ x (to adjust playerHitbox.width offset)
  y: -(spriteSize.y / 2) + 19, // center of the sprite -/+ y (to adjust playerHitbox.height offset)
  width: 32 - 15, // sprite width -/+ offset
  height: 48 - 25, // -/+ offset
  // offset: {
  //   x: 5,
  //   y: 13,
  // },
};

// draw the hitbox
const playerHitboxDraw = new Graphics();
playerHitboxDraw.beginFill('#8c9fff', 0.4);
playerHitboxDraw.x = playerHitbox.x; // if you keep de default playerContainer.x value (0), simple use playerHitbox.x
playerHitboxDraw.y = playerHitbox.y; // if you keep de default playerContainer.y value (0), simple use playerHitbox.y
playerHitboxDraw.drawRect(0, 0, playerHitbox.width, playerHitbox.height);
// playerContainer.addChild(playerHitboxDraw); // DRAW HITBOX DURING DEV

export {
  playerHitbox,
  playerContainer,
};
