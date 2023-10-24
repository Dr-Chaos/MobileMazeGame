import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../../pixi/atlas-loader';
import {
  AnimationStates, Movements, animationState, movement,
} from './animations';
import { playerStats } from '../stats';

const witchDamageAnimation = new AnimatedSprite(atlasLoader.witchDamage.animations.damage);
// witchIdleAnimation.scale.set(2);
// witchIdleAnimation.anchor.x = 0.5;
witchDamageAnimation.animationSpeed = 0.3;
witchDamageAnimation.stop();
witchDamageAnimation.onLoop = () => {
  witchDamageAnimation.stop();

  if (playerStats.life <= 0) {
    animationState.current = AnimationStates.Death;
    return;
  }

  animationState.current = AnimationStates.CanMove;
};

export default witchDamageAnimation;
