import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import app from './pixi/initialize';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const keyAtlas: AnimationSpriteAtlas = await Assets.load('/key/key.json');
type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};
const keyAnimation: ExtendedAnimatedSprite = new AnimatedSprite(keyAtlas.animations.idle);
keyAnimation.scale.set(2.5);
keyAnimation.animationSpeed = 0.17;
keyAnimation.play();
keyAnimation.hasBeenTaken = false;
keyAnimation.x = app.screen.width / 2;
keyAnimation.y = app.screen.height / 2;

export default keyAnimation;
