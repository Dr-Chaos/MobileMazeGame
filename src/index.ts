import { camera } from './camera';
import './index.css';
import app from './pixi/initialize';
import { fireball } from './player/fireball';
import { initializeJoystick, joystickGameLoop } from './player/mobile-joystick';
import { clearScene, initializeScene } from './scene';
import { initializeStartScreen } from './screens/start';

// start on the menu
// initializeStartScreen();

// ! DURING DEV start directly in the game
clearScene();
initializeScene();
initializeJoystick();
app.ticker.add(joystickGameLoop);
camera.removeChild(fireball);

// display debug logs when press key 1
document.addEventListener('keydown', async (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;

  // damage the player
  // damagePlayer(1);

  // to test the boss
  // playerStats.life = 1000;
  // inventory.keys = 3;
  // gameConditions.leverToAttackTheBoss = 0;
  // skeletons.length = 0;
  // boss.life = 1;

  // for (const children of allPixiObjects) {
  //   console.log(children.name);
  // }
});

document.addEventListener('keydown', async (event) => {
  if (event.code !== 'Digit2') return;
  // damagePlayer(100_000);
  // boss.life = 0;
  clearScene();
  initializeScene();
});

// ! UPDATE FPS HUD DURING DEV
// app.ticker.add(() => {
//   updateFpsText(app.ticker.FPS);
// });
