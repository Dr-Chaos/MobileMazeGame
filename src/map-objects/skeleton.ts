import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import { atlasLoader } from '../pixi/atlas-loader';
import { camera } from '../camera';

const skeletons = [];
export function createSkeleton(x: number, y: number) {
  const skeleton = new AnimatedSprite(atlasLoader.skeleton.animations.idle);
  camera.addChild(skeleton);
  skeleton.scale.set(2);
  skeleton.animationSpeed = 0.17;
  skeleton.play();
  skeleton.x = x;
  skeleton.y = y;
  skeletons.push(skeleton);
}
