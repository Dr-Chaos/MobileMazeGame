import {
  Application, BaseTexture, Container, Graphics, SCALE_MODES,
} from 'pixi.js';
import { isColliding } from './math/collisions';
import { getCoordinates } from './utils';

// for pixel art
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

const app = new Application<HTMLCanvasElement>({
  background: '#6e8a76',
  width: 500,
  height: 500,
  hello: true,
});

const canvas = app.view;
document.body.append(canvas);

const camera = new Container();
camera.x = app.screen.width / 2;
camera.y = app.screen.height / 2;
app.stage.addChild(camera);

const player = new Graphics();
player.beginFill('red');
player.drawRect(0, 0, 100, 100);
camera.addChild(player);
console.table(getCoordinates(player));

const water = new Graphics();
water.beginFill('blue');
water.x = -50;
water.drawRect(0, 0, 30, 30);
camera.addChild(water);
console.table(getCoordinates(water));

const borderBottomDraw = new Graphics();
borderBottomDraw.beginFill('white', 0.5);
borderBottomDraw.x = -camera.x;
borderBottomDraw.y = camera.y - 10;
borderBottomDraw.drawRect(0, 0, app.screen.width, 10);
camera.addChild(borderBottomDraw);

let pressedKey = '';
document.addEventListener('keydown', (event) => {
  pressedKey = event.code;
  // No default
});

document.addEventListener('keyup', (event) => {
  pressedKey = 'event.code';
  // No default
});

app.ticker.add((delta) => {
  switch (pressedKey) {
    case 'KeyD':
      player.x += 10;
      break;
    case 'KeyA':
      player.x -= 10;
      break;
    case 'KeyS':
      player.y += 10;
      break;
    case 'KeyW':
      player.y -= 10;
      break;
    default:
  }

  // console.table(getCoordinates(player));
  camera.pivot.copyFrom(player);
  if (isColliding(player, water)) {
    console.log('Collision');
  }

  if (isColliding(borderBottomDraw, player)) {
    console.log('Collision borderBottom');
    player.y -= 10 * delta;
  }
});

// Press D key to display debug logs
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  console.table(getCoordinates(player));
  // console.table(getCoordinates(water));
});
