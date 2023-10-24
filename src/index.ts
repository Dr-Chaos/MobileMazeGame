import './index.css';
import './player/mouvement-touch';
// import './utils/atlas-generator';
import './map/map-layers';
import './map/map-collisions';
import app from './pixi/initialize';
import { camera } from './camera';
import './player/move'; // handle move inputs
// import './player/fireball';
import './map-objects/skull';
import { AnimatedSprite } from 'pixi.js';
import { atlasLoader } from './pixi/atlas-loader';
import { playerStats } from './player/stats';
import { AnimationStates, animationState } from './player/animations/animations';
import { updateLifeHud } from './player/hud';
// import './tests';

app.stage.addChild(camera); // create the world / camera

// createSkeleton(0, 0, 'special');

// display debug logs when press key 1
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  const allPixiObjects = app.stage.children;

  playerStats.life -= 1;
  updateLifeHud(playerStats.life);
  animationState.current = AnimationStates.ReceiveDamage;

  // playerStats.life = 0;
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
