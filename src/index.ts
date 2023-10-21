// import './atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
// import './map-objects/traps';
import './player/fireball';
import app from './pixi/initialize';
import { camera } from './camera';
// import { playerHitbox } from './player/player';
import './player/move'; // handle move inputs
import { createSkeleton, skeletons } from './map-objects/skeleton';
import './map-objects/skeletonpath';
// import './map-objects/boss';
import { createSkull } from './map-objects/skull';
import { createGhost } from './map-objects/ghost';
import { createTrap } from './map-objects/traps2';
import { fireball } from './player/fireball';
import { getCoordinates } from './utils/utils';

app.stage.addChild(camera); // create the world / camera

// créer un skeleton ici

createGhost();
createSkull();
createTrap(30, 30);
createSkeleton(0, 0, 'skeletons');
createSkeleton(10, 10, 'skeletons1');
createSkeleton(20, 20, 'skeletons2');
createSkeleton(30, 30, 'skeletons3');
createSkeleton(40, 40, 'skeletons4');

createTrap(0, 0, 200, 1000);
// createBoss(-40, -450);
// Press D key to display debug logs
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;
  console.table(getCoordinates(fireball));
  console.table(skeletons);
});
