import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import app from './pixi/initialize';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const levierAtlas: AnimationSpriteAtlas = await Assets.load('/levier/levier.json');
type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};
const levierAnimation: ExtendedAnimatedSprite = new AnimatedSprite(levierAtlas.animations.idle);
levierAnimation.scale.set(2.5);
levierAnimation.animationSpeed = 0.01;
levierAnimation.play();
levierAnimation.hasBeenTaken = false;
levierAnimation.x = app.screen.width / 2 - 150;
levierAnimation.y = app.screen.height / 2 - 50;

export default levierAnimation;
