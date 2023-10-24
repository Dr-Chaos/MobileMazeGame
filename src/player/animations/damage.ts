import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../../pixi/atlas-loader';
import {
  AnimationStates, Movements, animationState, movement,
} from './animations';

const witchDamageAnimation = new AnimatedSprite(atlasLoader.witchDamage.animations.damage);
// witchIdleAnimation.scale.set(2);
// witchIdleAnimation.anchor.x = 0.5;
witchDamageAnimation.animationSpeed = 0.17;
witchDamageAnimation.stop();
witchDamageAnimation.onLoop = () => {
  witchDamageAnimation.stop();
  animationState.current = AnimationStates.CanMove;
};

export default witchDamageAnimation;
