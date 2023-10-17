import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import app from './pixi/initialize';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const skullAtlas: AnimationSpriteAtlas = await Assets.load('/skull/skull.json');
type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};
const skullAnimation: ExtendedAnimatedSprite = new AnimatedSprite(skullAtlas.animations.idle);
skullAnimation.scale.set(2.5);
skullAnimation.animationSpeed = 0.01;
skullAnimation.play();
skullAnimation.hasBeenTaken = false;
skullAnimation.x = app.screen.width / 2 - 160;
skullAnimation.y = app.screen.height / 2 - 60;
export default skullAnimation;
