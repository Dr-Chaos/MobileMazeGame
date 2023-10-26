import {
  AnimatedSprite,
} from 'pixi.js';
import { Sound } from '@pixi/sound';
import { atlasLoader } from '../../pixi/atlas-loader';

const deathsound = Sound.from(atlasLoader.burn2);

const witchDeathAnimation = new AnimatedSprite(atlasLoader.witchDeath.animations.default);
// witchIdleAnimation.scale.set(2);
// witchIdleAnimation.anchor.x = 0.5;
witchDeathAnimation.animationSpeed = 0.3;

witchDeathAnimation.stop();

witchDeathAnimation.onLoop = () => {
  const lastFrameIndex = witchDeathAnimation.totalFrames - 1;
  witchDeathAnimation.gotoAndStop(lastFrameIndex);
  deathsound.play();
};

export default witchDeathAnimation;
