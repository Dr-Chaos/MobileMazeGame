// import './atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
// import './map-objects/traps';
// import './player/fireball';
import app from './pixi/initialize';
import { camera } from './camera';
// import { playerHitbox } from './player/player';
import './player/move'; // handle move inputs
import { createSkeleton } from './map-objects/skeleton';
import './map-objects/skeletonpath';
import { inputMovementDirection } from './input/mouvement';
import './map-objects/boss';
import {
  skull, createSkull, skull1, skull2,
} from './map-objects/skull';
import {
  ghost, createGhost, ghost1, ghost2,
} from './map-objects/ghost';

app.stage.addChild(camera); // create the world / camera

// créer un skeleton ici
createGhost(-6, -6);
createSkull(6, 6);
createSkeleton(2, 2);
// createBoss(-40, -450);
// Press D key to display debug logs
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;
  // console.table(playerHitbox);
});
