import { AnimatedSprite } from 'pixi.js';
import { camera } from './camera';
import { atlasLoader } from './pixi/atlas-loader';

// test animations
const animation = new AnimatedSprite(atlasLoader.skeleton.animations.idle);
animation.animationSpeed = 0.18;
animation.scale.set(2);
animation.play();
camera.addChild(animation);
