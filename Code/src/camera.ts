import { Container } from 'pixi.js';
import app from './pixi/initialize';

const camera = new Container();

// const test = new Graphics();
// test.beginFill('red');
// test.drawRect(0, 0, 100, 100);
// camera.addChild(test);

camera.zIndex = -1; // add the camera behind the UI
camera.x = app.screen.width / 2;
camera.y = app.screen.height / 2;
camera.sortableChildren = true;

export { camera };
