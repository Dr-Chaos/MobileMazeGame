import './index.css';
import app from './pixi/initialize';
import { camera } from './camera';
// import { initialize } from './map/map-layers';
// import { skeletons } from './map-objects/skeleton';
// import { initializeFireball } from './player/fireball';
// import { initializeMap } from './map/map-layers';
import { clearAndInitializeScene } from './scene';
import { AnimationStates, animationState } from './player/animations/animations';
import { updateLifeHud } from './player/hud';
import { playerStats } from './player/stats';
// import { initializeHud } from './player/hud';

app.stage.addChild(camera); // create the world / camera
clearAndInitializeScene();

// createSkeleton(0, 0, 'special');

// display debug logs when press key 1
document.addEventListener('keydown', async (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;

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
