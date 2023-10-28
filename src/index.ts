import './index.css';
import { boss } from './map-objects/boss';
import { skeletons } from './map-objects/skeleton';
import { gameConditions } from './map/game-conditions';
import app from './pixi/initialize';
import { updateFpsText } from './player/hud';
import { inventory } from './player/inventory';
import { damagePlayer } from './player/receive-damage';
import { playerStats } from './player/stats';
import { initializeStartScreen } from './screens/start';

// start on the menu
initializeStartScreen();

// app.ticker.maxFPS = 50;
// initializeWinScreen();

// ! DURING DEV start directly in the game
// initializeScene();
// app.ticker.add(bossGameLoop);

// display debug logs when press key 1
document.addEventListener('keydown', async (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;

  // damage the player
  // damagePlayer(1);

  playerStats.life = 1000;
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
  damagePlayer(100_000);
  boss.life = 0;
});

app.ticker.add(() => {
  updateFpsText(app.ticker.FPS);
});
