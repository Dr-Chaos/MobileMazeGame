import { Graphics, Text } from 'pixi.js';
import app from './pixi/initialize';
import witchAnimation from './player/idle';
import './player/move';
import { isColliding } from './math/collisions';

app.stage.addChild(witchAnimation);

// left wall
const borderLeft = new Graphics();
borderLeft.beginFill('white', 0.5);
borderLeft.drawRect(0, 0, 10, app.screen.height);
app.stage.addChild(borderLeft);
// nameA = "borderleft"
// nameA est en colision

// bottom wall
const borderBottom = new Graphics();
borderBottom.beginFill('white', 0.5);
const borderBottomRect = {
  x: 0,
  y: app.screen.height - 10,
  width: app.screen.width,
  height: 10,
};
borderBottom.drawRect(
  borderBottomRect.x,
  borderBottomRect.y,
  borderBottomRect.width,
  borderBottomRect.height,
);
app.stage.addChild(borderBottom);

const keyCount = new Text('Keys: 0', {
  fill: 'white',
  // fontWeight: '700',
  // strokeThickness: 2,
});
app.stage.addChild(keyCount);

// key
const key = new Graphics();
key.beginFill('#c8f542', 0.7);
const keyPosition = {
  x: app.screen.width / 2,
  y: app.screen.height / 2,
  width: 10,
  height: 10,
  hasBeenTaken: false,
};
key.drawRect(
  keyPosition.x,
  keyPosition.y,
  keyPosition.width,
  keyPosition.height,
);
app.stage.addChild(key);

// chaque frame
app.ticker.add((delta: number) => {
  // si il y a une collision
  // isIntersect
  if (isColliding(borderLeft, witchAnimation)) {
    console.log('Collision borderLeft');
    witchAnimation.x += 10 * delta;
  }

  if (isColliding(borderBottomRect, witchAnimation)) {
    console.log('Collision borderBottom');
    witchAnimation.y -= 10 * delta;
  }

  if (!keyPosition.hasBeenTaken && isColliding(keyPosition, witchAnimation)) {
    keyPosition.hasBeenTaken = true;
    console.log('Collision key');
    keyCount.text = 'Keys: 1';
    app.stage.removeChild(key);
  }
});
