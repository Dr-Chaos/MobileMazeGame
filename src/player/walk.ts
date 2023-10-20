import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../pixi/atlas-loader';

const witchWalkAnimation = new AnimatedSprite(atlasLoader.witchWalk.animations.walk);
// witchWalkAnimation.scale.set(2);
// witchWalkAnimation.anchor.x = 0.5;
witchWalkAnimation.animationSpeed = 0.17;
witchWalkAnimation.play();

export default witchWalkAnimation;
