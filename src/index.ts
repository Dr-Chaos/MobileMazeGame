// import './utils/atlas-generator';
import './map/map-layers';
import './map/map-collisions';
import app from './pixi/initialize';
import { camera } from './camera';
import './player/move'; // handle move inputs
import { atlasLoader } from './pixi/atlas-loader';
// import './player/fireball';
import { createSkeleton, skeletons } from './map-objects/skeleton';
import { getCoordinates } from './utils/utils';
import { playerContainer } from './player/player';
import './map-objects/boss-spawn';
import { createSpikeAuto } from './map-objects/spike-auto';
import { isInvulnerable, startInvulnerabilityTimer } from './player/invulnerability';
// import './tests';

app.stage.addChild(camera); // create the world / camera

createSpikeAuto(0, 0, 'test');
createSpikeAuto(0, 18, 'test');

// createSkeleton(0, 0, 'special');

// display debug logs when press key 1
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  const allPixiObjects = app.stage.children;
  // console.log(allPixiObjects);
  // console.log(atlasLoader);
  startInvulnerabilityTimer();
  // console.log(isInvulnerable());

  // for (const skeleton of skeletons) {
  // if (skeleton.name !== 'special') continue;
  // console.table(getCoordinates(playerContainer));

  // console.table(getCoordinates(skeleton.container.playerDetectionZone));

  // }
});

document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit2') return;
  startInvulnerabilityTimer();

  // console.log(isInvulnerable());
});
