import './index.css';
import { AnimationStates, animationState } from './player/animations/animations';
import { updateLifeHud } from './player/hud';
import { playerStats } from './player/stats';
import { initializeScene } from './scene';

// start on the menu
// initializeStartScreen();

// ! DURING DEV start directly in the game
initializeScene();

// display debug logs when press key 1
document.addEventListener('keydown', async (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;

  // damage the player
  playerStats.life -= 1;
  updateLifeHud(playerStats.life);
  animationState.current = AnimationStates.ReceiveDamage;

  // for (const children of allPixiObjects) {
  //   console.log(children.name);
  // }
});
