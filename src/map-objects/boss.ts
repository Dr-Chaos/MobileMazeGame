import {
  AnimatedSprite, type Texture, Assets,
/* } from 'pixi.js';
import app from '../pixi/initialize';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const bossAtlas: AnimationSpriteAtlas = await Assets.load('/boss/boss.json');
type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};
const bossAnimation: ExtendedAnimatedSprite = new AnimatedSprite(bossAtlas.animations.idle);
bossAnimation.scale.set(2.5);
bossAnimation.animationSpeed = 0.17;
bossAnimation.play();
bossAnimation.hasBeenTaken = false;
bossAnimation.x = app.screen.width / 2;
bossAnimation.y = app.screen.height / 2;

export default bossAnimation; */

import { Containr, Graphics } from 'pixi.js';
import { camera } from './player/camera';

const bossContainer = new Container();
bossContainer.x = 1;
bossContainer.y = -50;
const bossHitbox = new Graphics();
bossContainer.addChild(bossHitbox);
bossHitbox.beginFill('blue', 0.7);
bossHitbox.drawRect(0, 0, 10, 20);
camera.addChild(bossContainer);

export { bossContainer };