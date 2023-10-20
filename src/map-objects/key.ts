import {
  AnimatedSprite, type Texture, Assets, Container,
} from 'pixi.js';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { getCoordinates } from '../utils/utils';
import inventory from '../player/inventory';
import { keyHud } from '../player/hud';

// type AnimationSpriteAtlas = Texture & { animations: Record<string, Texture[]> };
// const keyAtlas: AnimationSpriteAtlas = await Assets.load('/key/key.json');
// type ExtendedAnimatedSprite = AnimatedSprite & { hasBeenTaken?: boolean};

let keys: ExtendedAnimatedSprite[] = [];
export function createKey(x: number, y: number) {
  const keyAnimation: ExtendedAnimatedSprite = new AnimatedSprite(atlasLoader.key.animations.idle);
  camera.addChild(keyAnimation);
  keyAnimation.scale.set(2);
  keyAnimation.animationSpeed = 0.17;
  keyAnimation.play();
  keyAnimation.hasBeenTaken = false;
  keyAnimation.x = x;
  keyAnimation.y = y;
  keys.push(keyAnimation);
}

app.ticker.add(() => {
  for (const key of keys) {
    if (!key.hasBeenTaken && isColliding(getCoordinates(key), playerHitbox)) {
      key.hasBeenTaken = true;
      console.log('Collision key');
      inventory.keys += 1;
      keyHud.text = `Keys: ${inventory.keys}`;
      camera.removeChild(key);
      // remove the key from keys array
      keys = keys.filter((iteratedKey) => iteratedKey !== key);
    }
  }
});

export {
  keys,
};
