// import './atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
// import './maps/map-layer-1';
import './boss';
import './bossattack';
import './maps/map-collisions';
import { Graphics } from 'pixi.js';
import './maps/map-draw-layers';
import app from './pixi/initialize';
import './map-objects/traps';
import { camera } from './camera';
import './player/fireball';
import './player/move';
import { isColliding } from './math/collisions';
import { player, playerContainer } from './player/player';
import inventory from './inventory';
import { keyHud } from './hud';
import './traps';
import keyAnimation from './key';
import torchAnimation from './torch';
import { camera } from './player/camera';
import './fireball';
import './skull';
import './skullpath';
import './skeleton';
import './skeletonpath';

app.stage.addChild(camera);

// const collider = {
//   x: 30,
//   y: 0,
//   width: 20,
//   height: 20,
// };
// const colliderDraw = new Graphics();
// colliderDraw.beginFill('white');
// colliderDraw.x = collider.x;
// colliderDraw.y = collider.y;
// colliderDraw.drawRect(0, 0, collider.width, collider.height);
// camera.addChild(colliderDraw);
// console.log(getCoordinates(collider));

// left wall
const borderLeft = new Graphics();
borderLeft.beginFill('white', 0.5);
borderLeft.drawRect(0, 0, 10, app.screen.height);
app.stage.addChild(borderLeft);

// bottom wall
const borderBottom = {
  x: 0,
  y: app.screen.height - 10,
  width: app.screen.width,
  height: 10,
};
const borderBottomDraw = new Graphics();
borderBottomDraw.beginFill('white', 0.5);
borderBottomDraw.drawRect(
  borderBottom.x,
  borderBottom.y,
  borderBottom.width,
  borderBottom.height,
);
// camera.addChild(borderBottomDraw);

// key
// camera.addChild(keyAnimation);

// torch
// camera.addChild(torchAnimation);

// chaque frame
app.ticker.add((delta: number) => {
  // si il y a une collision
  // isIntersect
  // if (isColliding(borderLeft, player)) {
  //   console.log('Collision borderLeft');
  //   playerContainer.x += 10 * delta;
  // }

  // if (isColliding(borderBottom, player)) {
  //   console.log('Collision borderBottom');
  //   playerContainer.y -= 10 * delta;
  // }

  // if (isColliding(playerHitbox, collider)) {
  //   // movePlayer(collisionResponseDirection);
  //   movePlayer(collisionResponseDirection(playerHitbox, collider));
  // }

  // if (!keyAnimation.hasBeenTaken && isColliding(keyAnimation, playerHitbox)) {
  //   keyAnimation.hasBeenTaken = true;
  //   console.log('Collision key');
  //   inventory.keys += 1;
  //   keyHud.text = `Keys: ${inventory.keys}`;
  //   camera.removeChild(keyAnimation);
  // }
});

// Press D key to display debug logs
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;
  // console.log(playerHitbox);
  // console.log(collider);
  // console.table(positionHistory);
  if (!keyAnimation.hasBeenTaken && isColliding(keyAnimation, player)) {
    keyAnimation.hasBeenTaken = true;
    console.log('Collision key');
    inventory.keys += 1;
    keyHud.text = `Keys: ${inventory.keys}`;
    app.stage.removeChild(keyAnimation);
  }
});
