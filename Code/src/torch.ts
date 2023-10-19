import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import app from './pixi/initialize';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const torchAtlas: AnimationSpriteAtlas = await Assets.load('/torch/torch.json');
type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};
const torchAnimation: ExtendedAnimatedSprite = new AnimatedSprite(torchAtlas.animations.idle);
torchAnimation.scale.set(2.5);
torchAnimation.animationSpeed = 0.17;
torchAnimation.play();
torchAnimation.hasBeenTaken = false;
torchAnimation.x = app.screen.width / 2 + 41;
torchAnimation.y = app.screen.height / 2 - 200;

export default torchAnimation;
