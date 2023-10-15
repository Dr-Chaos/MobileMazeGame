import {
  Assets, Graphics, Sprite, type Texture,
} from 'pixi.js';
import app from '../pixi/initialize';

// this way you can directly get the width and height of the image
const mapTexture: Texture = await Assets.load('/map1.png');
const map = {
  x: 0,
  y: 0,
  width: 160,
  height: 160,
};
const mapDraw = new Sprite(mapTexture);
// mapDraw.x = 0;
// mapDraw.y = 0;
mapDraw.width = map.width * 3;
mapDraw.height = map.height * 3;
mapDraw.zIndex = -1;

app.stage.addChild(mapDraw);

// import {
//   Assets, Graphics, Sprite, type Texture,
// } from 'pixi.js';
// import app from '../pixi/initialize';

// // this way you can directly get the width and height of the image
// const mapTexture: Texture = await Assets.load('/map1-2.png');
// const map = {
//   x: 0,
//   y: 0,
//   width: 144,
//   height: 256,
// };
// const mapDraw = new Sprite(mapTexture);
// // mapDraw.x = 0;
// // mapDraw.y = 0;
// mapDraw.width = map.width * 3;
// mapDraw.height = map.height * 2;
// mapDraw.zIndex = -1;

// app.stage.addChild(mapDraw);
