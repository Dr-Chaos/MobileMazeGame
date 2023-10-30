import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../../pixi/atlas-loader';
import { uninitializeScene } from '../../scene';
import { initializeGameOverScreen } from '../../screens/game-over';

const witchDeathAnimation = new AnimatedSprite(atlasLoader.witchDeath.animations.default);
witchDeathAnimation.play();
witchDeathAnimation.visible = false;
witchDeathAnimation.animationSpeed = 0;
witchDeathAnimation.onLoop = () => {
  const lastFrameIndex = witchDeathAnimation.totalFrames - 1;
  witchDeathAnimation.gotoAndStop(lastFrameIndex);

  setTimeout(() => {
    uninitializeScene();
    initializeGameOverScreen();
    witchDeathAnimation.visible = false;
    witchDeathAnimation.animationSpeed = 0;
  }, 700);
};

export default witchDeathAnimation;
