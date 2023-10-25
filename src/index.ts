// import './utils/atlas-generator';
import './map/map-layers';
import './map/map-collisions';
import app from './pixi/initialize';
import { camera } from './camera';
import './player/move'; // handle move inputs
import './player/fireball';
import './map-objects/skull';
import './map-objects/boss/boss';
import {
  SkeletonStates, createSkeleton, gameLoop, skeletons,
} from './temporary';
// aaa

app.stage.addChild(camera); // create the world / camera

// ici on va créer un squelette
createSkeleton();
app.ticker.add(gameLoop);

document.addEventListener('keydown', (event) => {
  if (event.code === 'Digit1') skeletons[0].state = SkeletonStates.Idle;
  if (event.code === 'Digit2') skeletons[0].state = SkeletonStates.Walk;
  if (event.code === 'Digit3') skeletons[0].state = SkeletonStates.Death;
});
