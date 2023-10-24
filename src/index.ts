import './index.css';
import { Container } from 'pixi.js';
import app from './pixi/initialize';
import { camera } from './camera';
// import { initialize } from './map/map-layers';
// import { skeletons } from './map-objects/skeleton';
import { initializePlayer } from './player/player';
// import { initializeFireball } from './player/fireball';
// import { initializeMap } from './map/map-layers';
import { clearAndInitializeScene, initializeGameLoops, removeGameLoops } from './scene';
import { AnimationStates, animationState, initializePlayerAnimations } from './player/animations/animations';
import { initializeFireball } from './player/fireball';
import { initializeHud, updateLifeHud } from './player/hud';
import { initializeMap } from './map/map-layers';
import { initializePlayerStats, playerStats } from './player/stats';
import { initializeInventory } from './player/inventory';
import { clearContainerChildrenRecursively } from './utils/utils';
import { skeletons } from './map-objects/skeleton';
import { keys } from './map-objects/key';
import { spikesAuto } from './map-objects/spike-auto';
import { spikes } from './map-objects/spike';
import { torches } from './map-objects/torch';
import { directionHistory } from './player/move-direction';
import { levers } from './map-objects/lever';
import { initializeSkulls, skulls } from './map-objects/skull';
import { initializeDoorsContainers } from './map-objects/door';
// import { initializeHud } from './player/hud';

app.stage.addChild(camera); // create the world / camera
clearAndInitializeScene();

// createSkeleton(0, 0, 'special');

// display debug logs when press key 1
document.addEventListener('keydown', async (event) => {
  if (event.code !== 'Digit1') return;
  const allPixiObjects = app.stage.children;

  // damage the player
  playerStats.life -= 1;
  updateLifeHud(playerStats.life);
  animationState.current = AnimationStates.ReceiveDamage;

  // console.log(camera.children);
});

// const witchDie = new AnimatedSprite(atlasLoader.witchDamage.animations.damage);
// witchDie.animationSpeed = 0.2;
// witchDie.play();
// camera.addChild(witchDie);

// app.ticker.add(() => {
//   if (playerStats.life <= 0) {
//     animationState.current = AnimationStates.Death;
//     console.log('Die');
//   }
// });
