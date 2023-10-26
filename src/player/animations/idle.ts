import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../../pixi/atlas-loader';

const witchIdleAnimation = new AnimatedSprite(atlasLoader.witchIdle.animations.idle);
// witchIdleAnimation.scale.set(2);
// witchIdleAnimation.anchor.x = 0.5;
witchIdleAnimation.animationSpeed = 0.17;
witchIdleAnimation.play();
export default witchIdleAnimation;
