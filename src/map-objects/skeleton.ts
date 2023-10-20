import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { getCoordinates } from '../utils/utils';
import { atlasLoader } from '../pixi/atlas-loader';

type Skeleton = AnimatedSprite & { life: number; damage: number };
const skeletons: Record<string, Skeleton> = {};

export function createSkeleton(x: number, y: number, name: string) {
  const skeleton: Skeleton = new AnimatedSprite(atlasLoader.skeleton.animations.idle) as Skeleton;
  skeleton.scale.set(2);
  skeleton.animationSpeed = 0.17;
  skeleton.play();
  skeleton.x = x;
  skeleton.y = y;
  camera.addChild(skeleton);
  skeleton.life = 250;
  skeleton.damage = 1000;
  skeletons[name] = skeleton;
}

app.ticker.add(() => {
  for (const name in skeletons) {
    if (name in skeletons) {
      const skeleton = skeletons[name];
      const playerX = playerHitbox.x;
      const playerY = playerHitbox.y;

      const directionX = playerX - skeleton.x;
      const directionY = playerY - skeleton.y;

      const distance = Math.hypot(directionX, directionY);

      const normalizedDirectionX = directionX / distance;
      const normalizedDirectionY = directionY / distance;

      const speed = 1;
      skeleton.x += normalizedDirectionX * speed;
      skeleton.y += normalizedDirectionY * speed;

      if (isColliding(getCoordinates(skeleton), playerHitbox)) {}
    }
  }
});

app.ticker.add(() => {
  for (const name in skeletons) {
    if (name in skeletons) {
      const skeleton = skeletons[name];
      if (isColliding(getCoordinates(skeleton), playerHitbox)) {
        skeleton.life -= 1;
        if (skeleton.life <= 0) {
          camera.removeChild(skeleton);
        }
      }
    }
  }
});

export { skeletons };
