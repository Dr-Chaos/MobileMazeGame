import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import app from '../pixi/initialize';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const skeletonAtlas: AnimationSpriteAtlas = await Assets.load('/skeleton/skeleton.json');
type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};
const skeletonAnimation: ExtendedAnimatedSprite = new AnimatedSprite(skeletonAtlas.animations.idle);
skeletonAnimation.scale.set(2.5);
skeletonAnimation.animationSpeed = 0.17;
skeletonAnimation.play();
skeletonAnimation.hasBeenTaken = false;
skeletonAnimation.x = app.screen.width / 2;
skeletonAnimation.y = app.screen.height / 2;

export default skeletonAnimation;
