import '@pixi/tilemap'; // initialize @pixi/tilemap plugins
import { Application, BaseTexture, SCALE_MODES } from 'pixi.js';

BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

const app = new Application<HTMLCanvasElement>({
  background: '#6e8a76',
  width: window.innerWidth,
  height: window.innerHeight,
  hello: true, // display Pixi version on the console
  // antialias: true,
});
// draw the canvas
const canvas = app.view;
document.body.append(canvas);
app.stage.sortableChildren = true;

export default app;
