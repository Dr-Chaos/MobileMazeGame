// import './utils/atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
import app from './pixi/initialize';
import { camera } from './camera';
import './player/move'; // handle move inputs
import { atlasLoader } from './pixi/atlas-loader';
import './player/fireball';

app.stage.addChild(camera); // create the world / camera

// display debug logs when press key 1
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  const allPixiObjects = app.stage.children;
  console.log(allPixiObjects);
  console.log(atlasLoader);

  // console.table(playerHitbox);
});
