import { Graphics, Text } from 'pixi.js';
import app from './pixi/initialize';
import witchAnimation from './player/idle';
import './player/move';
import { isColliding } from './math/collisions';
import { player, playerContainer } from './player/player';
import inventory from './inventory';
import { keyHud } from './hud';
import './traps';

// left wall
const borderLeft = new Graphics();
borderLeft.beginFill('white', 0.5);
borderLeft.drawRect(0, 0, 10, app.screen.height);
app.stage.addChild(borderLeft);
// nameA = "borderleft"
// nameA est en colision

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
app.stage.addChild(borderBottomDraw);

// key
const key = {
  x: app.screen.width / 2,
  y: app.screen.height / 2,
  width: 10,
  height: 10,
  hasBeenTaken: false,
};
const keyDraw = new Graphics();
keyDraw.beginFill('#c8f542', 0.7);
keyDraw.drawRect(
  key.x,
  key.y,
  key.width,
  key.height,
);
app.stage.addChild(keyDraw);

// chaque frame
app.ticker.add((delta: number) => {
  // si il y a une collision
  // isIntersect
  if (isColliding(borderLeft, player)) {
    console.log('Collision borderLeft');
    playerContainer.x += 10 * delta;
  }

  if (isColliding(borderBottom, player)) {
    console.log('Collision borderBottom');
    playerContainer.y -= 10 * delta;
  }

  if (!key.hasBeenTaken && isColliding(key, player)) {
    key.hasBeenTaken = true;
    console.log('Collision key');
    inventory.keys += 1;
    keyHud.text = `Keys: ${inventory.keys}`;
    app.stage.removeChild(keyDraw);
  }
});
