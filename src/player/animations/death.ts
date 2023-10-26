import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../../pixi/atlas-loader';
import { initializeMenu } from '../../screens/menu';
import { clearContainerChildrenRecursively } from '../../utils/utils';
import { camera } from '../../camera';
import { clearScene } from '../../scene';

const witchDeathAnimation = new AnimatedSprite(atlasLoader.witchDeath.animations.default);
// witchIdleAnimation.scale.set(2);
// witchIdleAnimation.anchor.x = 0.5;
witchDeathAnimation.animationSpeed = 0.3;
witchDeathAnimation.stop();
witchDeathAnimation.onLoop = () => {
  const lastFrameIndex = witchDeathAnimation.totalFrames - 1;
  witchDeathAnimation.gotoAndStop(lastFrameIndex);

  setTimeout(() => {
    clearScene();
    initializeMenu();
  }, 700);
};

export default witchDeathAnimation;
