import './index.css';
import {
  boss,
  bossGameLoop,
} from './map-objects/boss';
import { skeletons } from './map-objects/skeleton';
import { gameConditions } from './map/game-conditions';
import app from './pixi/initialize';
import { inventory } from './player/inventory';
import { damagePlayer } from './player/receive-damage';
import { playerStats } from './player/stats';

import { initializeScene } from './scene';

// start on the menu
// initializeStartScreen();

// ! DURING DEV start directly in the game
initializeScene();
app.ticker.add(bossGameLoop);

// display debug logs when press key 1
document.addEventListener('keydown', async (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;

  // damage the player
  // damagePlayer(1);

  playerStats.life = 1000;
  inventory.keys = 3;
  gameConditions.leverToAttackTheBoss = 0;
  skeletons.length = 0;

  // for (const children of allPixiObjects) {
  //   console.log(children.name);
  // }
});

document.addEventListener('keydown', async (event) => {
  if (event.code !== 'Digit2') return;
  damagePlayer(100_000);
  boss.life = 0;
});
