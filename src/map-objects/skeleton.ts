/* import {
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

export default skeletonAnimation; */

import { Container, Graphics } from 'pixi.js';
import { camera } from './player/camera';

const skeletonContainer = new Container();
skeletonContainer.x = 1;
skeletonContainer.y = -50;
const skeletonHitbox = new Graphics();
skeletonContainer.addChild(skeletonHitbox);
skeletonHitbox.beginFill('blue', 0.7);
skeletonHitbox.drawRect(0, 0, 10, 20);
camera.addChild(skeletonContainer);

const playerHitbox = {
  x: playerContainer.x + 5, // + offset.x
  y: playerContainer.y + 12, // + offset.y
  width: 20,
  height: 30,
  offset: {
    x: 5,
    y: 13,
  },
};

export { skeletonContainer };
