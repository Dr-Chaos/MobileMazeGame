import '@pixi/tilemap'; // initialize @pixi/tilemap plugins
import '@pixi/math-extras'; // initialize @pixi/math-extras plugins
import {
  Application, BaseTexture, SCALE_MODES, settings,
} from 'pixi.js';

// for pixel art
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
// for text resolution. you can also upscale each text individually with:
// myText.resolution = 3;
settings.RESOLUTION = 2;

const app = new Application<HTMLCanvasElement>({
  background: '#25131a',
  width: window.innerWidth,
  height: window.innerHeight,
  hello: true, // display Pixi version on the console
  // antialias: true,
});
// draw the canvas
const canvas = app.view;
document.body.append(canvas);
app.stage.sortableChildren = true;
// app.stage.scale.set(2);
// app.stage.x -= 270;
// app.stage.y -= 295;

export default app;
