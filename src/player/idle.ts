import {
  AnimatedSprite, type Texture, Assets,
} from 'pixi.js';

type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
const witchIdleAtlas: AnimationSpriteAtlas = await Assets.load('/witch/idle/idle.json');
const witchIdleAnimation = new AnimatedSprite(witchIdleAtlas.animations.idle);
// witchIdleAnimation.scale.set(2);
// witchIdleAnimation.anchor.x = 0.5;
witchIdleAnimation.animationSpeed = 0.17;
witchIdleAnimation.play();

export default witchIdleAnimation;
