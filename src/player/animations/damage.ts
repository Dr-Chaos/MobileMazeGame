import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../../pixi/atlas-loader';
import {
  AnimationStates, animationState,
} from './animations';
import { playerStats } from '../stats';
import { sounds } from '../../sounds';

const witchDamageAnimation = new AnimatedSprite(atlasLoader.witchDamage.animations.damage);
// witchIdleAnimation.scale.set(2);
// witchIdleAnimation.anchor.x = 0.5;
witchDamageAnimation.animationSpeed = 0.3;
witchDamageAnimation.stop();
witchDamageAnimation.onLoop = () => {
  witchDamageAnimation.stop();

  console.log(playerStats.life);

  if (playerStats.life <= 0) {
    animationState.current = AnimationStates.Death;
    sounds.background.stop();

    return;
  }

  animationState.current = AnimationStates.CanMove;
};

export default witchDamageAnimation;
