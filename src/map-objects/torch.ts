import {
  AnimatedSprite,
} from 'pixi.js';
import { atlasLoader } from '../pixi/atlas-loader';
import { camera } from '../camera';

export const torches: AnimatedSprite[] = [];
export function createTorch(x: number, y: number, zIndex: number) {
  const torch = new AnimatedSprite(atlasLoader.torch.animations.idle);
  camera.addChild(torch);
  torch.scale.set(1.7);
  torch.animationSpeed = 0.17;
  torch.play();
  torch.x = x;
  torch.y = y;
  torch.zIndex = zIndex;
  torches.push(torch);
}
