import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { getCoordinates } from '../utils/utils';
import { atlasLoader } from '../pixi/atlas-loader';

type Skeleton = AnimatedSprite & {life?: number; damage?: number};
const skeletons: Skeleton[] = [];

export function createSkeleton(x: number, y: number) {
  const skeleton: Skeleton = new AnimatedSprite(atlasLoader.skeleton.animations.idle);
  skeleton.scale.set(2);
  skeleton.animationSpeed = 0.17;
  skeleton.play();
  skeleton.x = x;
  skeleton.y = y;
  camera.addChild(skeleton);
  skeletons.push(skeleton);
  skeleton.life = 5;
  skeleton.damage = 1;
}

app.ticker.add(() => {
  for (const skeleton of skeletons) {
    if (isColliding(getCoordinates(skeleton), playerHitbox) && skeleton.life === 0) {
      camera.removeChild(skeleton);
    }
  }
});
export { skeletons };
