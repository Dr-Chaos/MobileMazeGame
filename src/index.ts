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
import { createSkeleton } from './map-objects/skeleton';
import levier, { createLevier } from './map-objects/levier';

app.stage.addChild(camera); // create the world / camera
// createSpike(40, -40);
// createSkeleton(0, 0);
createLevier(0, 0);

// Press D key to display debug logs
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;
  // console.table(playerHitbox);
});
