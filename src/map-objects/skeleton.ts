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
  skeleton.scale.set(1.61);
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
  // Première boucle pour déplacer les squelettes et gérer les collisions avec les fireballs
  for (const skeleton of skeletons) {
    const playerX = playerHitbox.x;
    const playerY = playerHitbox.y;

    const directionX = playerX - skeleton.x;
    const directionY = playerY - skeleton.y;

    const distance = Math.hypot(directionX, directionY);

    // Éviter la division par zéro lorsque la distance est égale à zéro
    if (distance > 0) {
      const normalizedDirectionX = directionX / distance;
      const normalizedDirectionY = directionY / distance;

      const speed = 1;
      skeleton.x += normalizedDirectionX * speed;
      skeleton.y += normalizedDirectionY * speed;
    }

    if (isColliding(skeleton, fireball)) {
      console.table(getCoordinates(fireball));
      skeleton.life -= 1;
      if (skeleton.life <= 0) {
        camera.removeChild(skeleton);
        skeletons = skeletons.filter((iteratedSkeleton) => iteratedSkeleton !== skeleton);
      }
    }
  }

  // Deuxième boucle pour gérer les collisions entre les squelettes
  for (let index = 0; index < skeletons.length; index++) {
    for (let index_ = index + 1; index_ < skeletons.length; index_++) {
      const skeletonA = skeletons[index];
      const skeletonB = skeletons[index_];

      const dx = skeletonA.x - skeletonB.x;
      const dy = skeletonA.y - skeletonB.y;
      const distanceBetweenSkeletons = Math.hypot(dx, dy);

      // Supposons qu'un certain 'minDistance' représente la distance minimale que les squelettes doivent maintenir entre eux
      const minDistance = skeletonA.width / 2 + skeletonB.width / 2; // ou une autre valeur selon la taille des squelettes

      if (distanceBetweenSkeletons < minDistance) {
        // Les squelettes sont trop proches, nous devons les repousser
        const overlap = minDistance - distanceBetweenSkeletons;
        const adjustX = (overlap / distanceBetweenSkeletons) * dx;
        const adjustY = (overlap / distanceBetweenSkeletons) * dy;

        // Ajuster les positions pour éviter la superposition
        skeletonA.x += adjustX / 2;
        skeletonA.y += adjustY / 2;
        skeletonB.x -= adjustX / 2;
        skeletonB.y -= adjustY / 2;
      }
    }
  }
});
export { skeletons };
