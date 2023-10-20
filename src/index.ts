// import './atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
// import './map-objects/traps';
import './player/fireball';
import app from './pixi/initialize';
import { camera } from './camera';
// import { playerHitbox } from './player/player';
import './player/move'; // handle move inputs
import { createSkeleton } from './map-objects/skeleton';
import './map-objects/skeletonpath';
import { inputMovementDirection } from './input/mouvement';
import { boss, createBoss } from './map-objects/boss';
import { skull1, skull2, createSkull } from './map-objects/skull';

app.stage.addChild(camera); // create the world / camera

// créer un skeleton ici
createSkeleton(0, 0);
createBoss(1, 1);
// Press D key to display debug logs
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;
  // console.table(playerHitbox);
});
