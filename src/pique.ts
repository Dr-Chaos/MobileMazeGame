import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import app from './pixi/initialize';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const piqueAtlas: AnimationSpriteAtlas = await Assets.load('/pique/pique.json');
type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};
const piqueAnimation: ExtendedAnimatedSprite = new AnimatedSppiqueAtlas.animations.idle);
piqueAnimation.scale.set(2.5);
piqueAnimation.animationSpeed = 0.01;
piqueAnimation.play();
piqueAnimation.hasBeenTaken = false;
piqueAnimation.x = app.screen.width / 2 - 160;
piqueAnimation.y = app.screen.height / 2 - 60;
export default piqueAnimation;
