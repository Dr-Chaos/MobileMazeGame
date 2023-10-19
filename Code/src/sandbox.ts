import {
  Application, BaseTexture, Container, Graphics, SCALE_MODES,
} from 'pixi.js';
import { isColliding } from './math/collisions';
import { getCoordinates } from './utils/utils';

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
app.stage.sortableChildren = true;

const camera = new Container();
camera.x = app.screen.width / 2;
camera.y = app.screen.height / 2;
app.stage.addChild(camera);

const player = new Graphics();
player.beginFill('red');
player.drawRect(0, 0, 100, 100);
camera.addChild(player);

const walter = new Graphics();
walter.beginFill('blue');
walter.drawRect(0, -0, 30, 30);
camera.addChild(walter);

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyD') {
    player.x += 10;
  } else if (event.code === 'KeyA') {
    player.x -= 10;
  }
});

app.ticker.add(() => {
  camera.pivot.copyFrom(player);
});
