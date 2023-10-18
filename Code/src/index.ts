// import './atlas-generator';
import './maps/map-draw-layers';
import './maps/map-collisions';
import { Graphics } from 'pixi.js';
import app from './pixi/initialize';
import './player/move';
import { isColliding } from './math/collisions';
import { playerHitbox } from './player/player';
import inventory from './inventory';
import { keyHud } from './hud';
import './traps';
import keyAnimation from './key';
import { camera } from './player/camera';

app.stage.addChild(camera);

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
app.ticker.add((delta: number) => {
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

  if (!keyAnimation.hasBeenTaken && isColliding(keyAnimation, playerHitbox)) {
    keyAnimation.hasBeenTaken = true;
    console.log('Collision key');
    inventory.keys += 1;
    keyHud.text = `Keys: ${inventory.keys}`;
    camera.removeChild(keyAnimation);
  }
});
