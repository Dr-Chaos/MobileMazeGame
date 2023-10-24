import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../../pixi/atlas-loader';
import {
  AnimationStates, Movements, animationState, movement,
} from './animations';
import app from '../../pixi/initialize';
import { fireball, moveFireball } from '../fireball';
import { camera } from '../../camera';
import { player } from '../player';

const witchDeathAnimation = new AnimatedSprite(atlasLoader.witchDeath.animations.default);
// witchIdleAnimation.scale.set(2);
// witchIdleAnimation.anchor.x = 0.5;
witchDeathAnimation.animationSpeed = 0.3;
witchDeathAnimation.stop();
witchDeathAnimation.onLoop = () => {
  const lastFrameIndex = witchDeathAnimation.totalFrames - 1;
  witchDeathAnimation.gotoAndStop(lastFrameIndex);
};

export default witchDeathAnimation;
