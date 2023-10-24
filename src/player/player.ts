import { Container, Graphics } from 'pixi.js';
import { camera } from '../camera';

const player = {
  container: new Container(),
  hitbox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
};

export function initializePlayer() {
  const playerContainer = new Container();

  const spriteSize = {
    x: 32,
    y: 48,
  };

  const playerHitbox = {
    x: -(spriteSize.x / 2) + 6.5, // center of the sprite -/+ x (to adjust playerHitbox.width offset)
    y: -(spriteSize.y / 2) + 19, // center of the sprite -/+ y (to adjust playerHitbox.height offset)
    width: 32 - 15, // sprite width -/+ offset
    height: 48 - 25, // -/+ offset
  };

  camera.addChild(playerContainer);
  // initialize the camera
  camera.pivot.copyFrom(playerContainer);

  // draw the hitbox
  const playerHitboxDraw = new Graphics();
  playerHitboxDraw.beginFill('#8c9fff', 0.4);
  playerHitboxDraw.x = playerHitbox.x; // if you keep de default playerContainer.x value (0), simple use playerHitbox.x
  playerHitboxDraw.y = playerHitbox.y; // if you keep de default playerContainer.y value (0), simple use playerHitbox.y
  playerHitboxDraw.drawRect(0, 0, playerHitbox.width, playerHitbox.height);
  // playerContainer.addChild(playerHitboxDraw); // DRAW HITBOX DURING DEV

  player.container = playerContainer;
  player.hitbox = playerHitbox;
}

export {
  player,
};
