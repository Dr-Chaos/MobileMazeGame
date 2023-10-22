// import './utils/atlas-generator';
import './map/map-layers';
import './map/map-collisions';
import app from './pixi/initialize';
import { camera } from './camera';
import './player/move'; // handle move inputs
import './player/fireball';
import './map-objects/skull';
// import './tests';

app.stage.addChild(camera); // create the world / camera

// createSkeleton(0, 0, 'special');

// display debug logs when press key 1
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  const allPixiObjects = app.stage.children;
  // console.log(allPixiObjects);
  // console.log(atlasLoader);
  // startInvulnerabilityTimer();
  // console.log(isInvulnerable());

  // for (const skeleton of skeletons) {
  // if (skeleton.name !== 'special') continue;
  // console.table(getCoordinates(playerContainer));

  // console.table(getCoordinates(skeleton.container.playerDetectionZone));

  // }
});
