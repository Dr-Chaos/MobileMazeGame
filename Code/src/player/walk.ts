import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';
import { player, playerContainer } from './player';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const witchWalkAtlas: AnimationSpriteAtlas = await Assets.load('/witch/walk/walk.json');
const witchWalkAnimation = new AnimatedSprite(witchWalkAtlas.animations.walk);
witchWalkAnimation.scale.set(2);
witchWalkAnimation.animationSpeed = 0.17;
witchWalkAnimation.anchor.x = 0.5;
witchWalkAnimation.play();

export default witchWalkAnimation;
