import { Container, Graphics } from 'pixi.js';
import app from '../pixi/initialize';
import { camera } from '../camera';

const playerContainer = new Container();
playerContainer.y = -50;
camera.addChild(playerContainer);
// initialize the camera
camera.pivot.copyFrom(playerContainer);

// if you keep default playerContainer.x and playerContainer.y values (0 by default)
// const playerHitbox = {
//   x: 5,
//   y: playerContainer.y + 12,
//   width: 20,
//   height: 30,
// };
// else we need to increment the initial playerContainer.x and playerContainer.y positions
const playerHitbox = {
  x: playerContainer.x + 5, // + offset.x
  y: playerContainer.y + 12, // + offset.y
  width: 20,
  height: 30,
  offset: {
    x: 5,
    y: 13,
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

// draw the hitbox
const playerHitboxDraw = new Graphics();
playerHitboxDraw.beginFill('#8c9fff', 0.4);
playerHitboxDraw.x = playerHitbox.offset.x; // if you keep de default playerContainer.x value (0), simple use playerHitbox.x
playerHitboxDraw.y = playerHitbox.offset.y; // if you keep de default playerContainer.y value (0), simple use playerHitbox.y
playerHitboxDraw.drawRect(0, 0, playerHitbox.width, playerHitbox.height);
playerContainer.addChild(playerHitboxDraw);

export {
  playerHitbox,
  playerContainer,
};
