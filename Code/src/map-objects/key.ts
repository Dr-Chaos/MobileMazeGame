import {
  AnimatedSprite, type Texture, Assets, Container,
} from 'pixi.js';
import { camera } from '../camera';
import { loadedAtlas } from '../pixi/loaded-atlas';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { getCoordinates } from '../utils/utils';
import inventory from '../player/inventory';
import { keyHud } from '../player/hud';

// type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
// const keyAtlas: AnimationSpriteAtlas = await Assets.load('/key/key.json');
// type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};

const keys: ExtendedAnimatedSprite[] = [];
const keysContainer = new Container();
camera.addChild(keysContainer);
export { keysContainer };
export function createKey(x: number, y: number) {
  const keyAnimation: ExtendedAnimatedSprite = new AnimatedSprite(loadedAtlas.key.animations.idle);
  keyAnimation.scale.set(2);
  keyAnimation.animationSpeed = 0.17;
  keyAnimation.play();
  keyAnimation.hasBeenTaken = false;
  keyAnimation.x = x;
  keyAnimation.y = y;
  keysContainer.addChild(keyAnimation);
  keys.push(keyAnimation);
}

app.ticker.add(() => {
  for (const key of keys) {
    if (!key.hasBeenTaken && isColliding(getCoordinates(key), playerHitbox)) {
      key.hasBeenTaken = true;
      console.log('Collision key');
      inventory.keys += 1;
      keyHud.text = `Keys: ${inventory.keys}`;
      // TODO: remove key from keys array
      keysContainer.removeChild(key);
    }
  }
});

export {
  keys,
};
