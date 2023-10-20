import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../pixi/atlas-loader';

const spikeAnimation = new AnimatedSprite(atlasLoader.skeleton.animations.idle);
spikeAnimation.scale.set(2.5);
spikeAnimation.animationSpeed = 0.01;
spikeAnimation.play();
spikeAnimation.x = 0;
spikeAnimation.y = 0;
export default spikeAnimation;
