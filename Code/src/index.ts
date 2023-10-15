import { Graphics, Text } from 'pixi.js';
import app from './pixi/initialize';
import witchAnimation from './player/idle';
import './player/move';
import { isColliding } from './math/collisions';
import { player, playerContainer } from './player/player';
import inventory from './inventory';

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

// life
const lifeHud = new Text(`Life: ${player.life}`, {
  fill: 'white',
  // fontWeight: '700',
  // strokeThickness: 2,
});
app.stage.addChild(lifeHud);

// trap
const trap = {
  x: app.screen.width / 2 + 120,
  y: app.screen.height / 2 - 50,
  width: 100,
  height: 100,
};
const trapDraw = new Graphics();
trapDraw.beginFill('#ff8c8c', 0.7);
trapDraw.drawRect(
  trap.x,
  trap.y,
  trap.width,
  trap.height,
);
app.stage.addChild(trapDraw);

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

const keyHud = new Text(`Keys: ${inventory.keys}`, {
  fill: 'white',
  // fontWeight: '700',
  // strokeThickness: 2,
});
keyHud.y = lifeHud.height + 5;
app.stage.addChild(keyHud);

console.log(keyHud.height);

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

  if (isColliding(trap, player)) {
    player.life -= 1;
    lifeHud.text = `Life: ${player.life}`;
  }
});
