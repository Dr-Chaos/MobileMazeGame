// import './utils/atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
// import './map-objects/traps';
// import './player/fireball';
import app from './pixi/initialize';
import { camera } from './camera';
// import { playerHitbox } from './player/player';
import './player/move'; // handle move inputs
import { createSpike } from './map-objects/spike';
// import { createSkeleton } from './map-objects/skeleton';
import { getCoordinates } from './utils/utils';
// import { createSkeleton } from './map-objects/skeleton';

app.stage.addChild(camera); // create the world / camera
// createSpike(40, -40);
// createSkeleton(0, 0);

// display debug logs when press key 1
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  // console.log(getCoordinates(fireball));

  const allPixiObjects = app.stage.children;
  console.log(allPixiObjects);

  // console.table(playerHitbox);
});
