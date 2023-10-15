import { type Sprite, type Graphics } from 'pixi.js';

export function isColliding(object1: Sprite | Graphics, object2: Sprite | Graphics) {
  return (
    object1.x < object2.x + object2.width
      && object1.x + object1.width > object2.x
      && object1.y < object2.y + object2.height
      && object1.y + object1.height > object2.y
  );
}
