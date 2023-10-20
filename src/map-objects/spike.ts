import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import app from '../pixi/initialize';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const spikeAtlas: AnimationSpriteAtlas = await Assets.load('/spike/spike.json');
type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};
const spikeAnimation: ExtendedAnimatedSprite = new AnimatedSprite(spikeAtlas.animations.idle);
spikeAnimation.scale.set(2.5);
spikeAnimation.animationSpeed = 0.01;
spikeAnimation.play();
spikeAnimation.hasBeenTaken = false;
spikeAnimation.x = app.screen.width / 2 - 160;
spikeAnimation.y = app.screen.height / 2 - 60;
export default spikeAnimation;
