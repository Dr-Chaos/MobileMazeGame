import {
  AnimatedSprite,
} from 'pixi.js';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { getCoordinates } from '../utils/utils';
import inventory from '../player/inventory';
import { keyHud, updateKeyHud } from '../player/hud';
import { mapScaling } from '../map/map-layers';

type Key = AnimatedSprite & {hasBeenTaken: boolean };

let keys: Key[] = [];
export function createKey(x: number, y: number, name: string, isActive = true) {
  const key = new AnimatedSprite(atlasLoader.key.animations.idle) as Key;
  camera.addChild(key);
  key.name = 'key';
  key.scale.set(mapScaling);
  key.animationSpeed = 0.17;
  key.play();
  key.hasBeenTaken = false;
  key.name = name;
  key.visible = isActive;
  key.x = x;
  key.y = y;
  keys.push(key);
}

app.ticker.add(() => {
  for (const key of keys) {
    if (
      key.visible
      && !key.hasBeenTaken
      && isColliding(getCoordinates(key), playerHitbox)) {
      key.hasBeenTaken = true;
      console.log('Collision key');
      inventory.keys += 1;
      updateKeyHud(inventory.keys);
      camera.removeChild(key);
      // remove the key from keys array
      keys = keys.filter((iteratedKey) => iteratedKey !== key);
    }
  }
});

export {
  keys,
};
