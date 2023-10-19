// import './atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
import { Graphics } from 'pixi.js';
import app from './pixi/initialize';
import './map-objects/traps';
import { camera } from './camera';
import './player/fireball';

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
borderLeft.drawRect(-camera.x, -camera.y, 10, app.screen.height);
// camera.addChild(borderLeft);

// bottom wall
const borderBottomDraw = new Graphics();
borderBottomDraw.beginFill('white', 0.5);
borderBottomDraw.x = -camera.x;
borderBottomDraw.y = camera.y - 10;
borderBottomDraw.drawRect(0, 0, app.screen.width, 10);
// camera.addChild(borderBottomDraw);

// key
// camera.addChild(keyAnimation);

// torch
// camera.addChild(torchAnimation);

// chaque frame
app.ticker.add(() => {
  // si il y a une collision
  // isIntersect
  // if (isColliding(borderLeft, getPlayerHitboxWorldPosition())) {
  //   console.log('Collision borderLeft');
  //   playerContainer.x += 10 * delta;
  // }

  // if (isColliding(borderBottomDraw, playerHitbox)) {
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
});
