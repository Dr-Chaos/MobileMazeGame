import { AnimatedSprite, Graphics } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerContainer, playerHitbox } from '../player/player';
import { atlasLoader } from '../pixi/atlas-loader';
import { fireball } from '../player/fireball';
import { getCoordinates } from '../utils/utils';

type Skeleton = AnimatedSprite & { life: number; damage: number };
let skeletons: Skeleton[] = [];

// {} objectskele
// [] array

export function createSkeleton(x: number, y: number, name: string) {
  const skeleton: Skeleton = new AnimatedSprite(atlasLoader.skeleton.animations.idle) as Skeleton;
  // skeleton.scale.set(1.61);
  // skeleton.animationSpeed = 0.17;
  // skeleton.play();
  skeleton.x = x;
  skeleton.y = y;
  camera.addChild(skeleton);
  skeleton.life = 50;
  skeleton.damage = 1;
  skeletons.push(skeleton);
  console.log(skeleton.width);
}

app.ticker.add(() => {
  for (const skeleton of skeletons) {
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

    if (isColliding(skeleton, fireball)) { // remplacer playerhitbox par la fireball, car c'est la fireball qui fait des degats pas la hitbox du player
      console.table(getCoordinates(fireball));
      skeleton.life -= 1;
      if (skeleton.life <= 0) {
        // enlève de l'affichage
        camera.removeChild(skeleton);
        // supprimer du tableau
        skeletons = skeletons.filter((itaratedSkeleton) => itaratedSkeleton !== skeleton);
      }
    }
  }
});

export { skeletons };
