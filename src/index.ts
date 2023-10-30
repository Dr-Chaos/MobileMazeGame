import './index.css';
import { skeletons } from './map-objects/skeleton';
import { inventory } from './player/inventory';
import { playerStats } from './player/stats';
import { clearScene, initializeScene } from './scene';
import { initializeGameOverScreen } from './screens/game-over';
import { initializeStartScreen } from './screens/start';
import { initializeWinScreen } from './screens/win';

// start on the menu
// initializeStartScreen();

// ! DURING DEV test screens
initializeWinScreen();
// initializeGameOverScreen();

// ! DURING DEV start directly in the game
// clearScene();
// initializeScene();

// display debug logs when press key 1
document.addEventListener('keydown', async (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;

  // damage the player
  // damagePlayer(1);

  // to test the boss
  playerStats.life = 1000;
  inventory.keys = 3;
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
