import { Container, Graphics } from 'pixi.js';
import app from './pixi/initialize';

const camera = new Container();

camera.zIndex = -1; // add the camera behind the UI
camera.x = app.screen.width / 2;
camera.y = app.screen.height / 2;
camera.sortableChildren = true;
camera.scale.set(2);

const cameraCenter = {
  width: 2,
  height: 2,
};
const cameraCenterDraw = new Graphics();
cameraCenterDraw.beginFill('white');
cameraCenterDraw.drawRect(
  camera.x - (camera.width / 2),
  camera.y - (camera.height / 2),
  cameraCenter.width,
  cameraCenter.height,
);
// app.stage.addChild(cameraCenterDraw); // DURING DEV, WE CAN DISPLAY A POINT AT THE CENTER OF THE CAMERA

export { camera };
