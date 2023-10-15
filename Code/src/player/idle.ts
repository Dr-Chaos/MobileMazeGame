import {
  AnimatedSprite, type Texture, Assets, BaseTexture, SCALE_MODES,
} from 'pixi.js';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const witchAtlas: AnimationSpriteAtlas = await Assets.load('/witch/idle.json');
const witchAnimation = new AnimatedSprite(witchAtlas.animations.idle);
witchAnimation.scale.set(4);
witchAnimation.animationSpeed = 0.17;
witchAnimation.play();

export default witchAnimation;
