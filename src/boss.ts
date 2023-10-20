import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import app from './pixi/initialize';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const bossAtlas: AnimationSpriteAtlas = await Assets.load('/boss/boss.json');
type ExtendedAnimatedSprite = AnimatedSprite & { IsDead?: boolean};
const bossAnimation: ExtendedAnimatedSprite = new AnimatedSprite(bossAtlas.animations.idle);
bossAnimation.scale.set(2.5);
bossAnimation.animationSpeed = 0.17;
bossAnimation.play();
bossAnimation.IsDead = false;
bossAnimation.x = app.screen.width / 2;
bossAnimation.y = app.screen.height / 2;

export default bossAnimation;
