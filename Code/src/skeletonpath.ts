/* import { Graphics } from 'pixi.js';
import app from './pixi/initialize';
import { camera } from './player/camera';

const skeleton = new Graphics();
skeleton.beginFill('red');
skeleton.drawRect(0, 0, 50, 50);
skeleton.endFill();
camera.addChild(skeleton);
type Point = {
  x: 100;
  y: 100;
};
function getPlayerPosition(): Point {
return { x: 100, y: 100 }; }

function skeletonposition(): void {
const playerPosition = getPlayerPosition();

const dirX = playerPosition.x - movingskeleton.x;
const dirY = playerPosition.y - movingskeleton.y;
const distance = Math.sqrt(dirX * dirX + dirY * dirY);
const normDirX = directionX / distance;
const normDirY = directionY / distance;
const speed = 1;
movingskeleton.x += normDirectionX * speed;
movingskeleton.y += normDirectionY * speed;
if (distance < 2) { //a p-e changer si saccade
movingskeleton.x = playerPosition.x;
movingskeleton.y = playerPosition.y;
  }
}
app.ticker.add(movingskeleton); */

import { Graphics } from 'pixi.js';
import app from './pixi/initialize';
import { camera } from './player/camera';

// Définir un type pour Point
type Point = {
  x: number;
  y: number;
};

// Création d'une classe pour le squelette
class Skeleton extends Graphics {
  constructor() {
    super();
    this.beginFill(0xFF_00_00); // 'red' en couleur hexadécimale
    this.drawRect(0, 0, 50, 50);
    this.endFill();
    // Vous pouvez initialiser d'autres propriétés ici si nécessaire
  }

  // Méthode pour déplacer ce squelette vers une position cible
  moveToTarget(targetPosition: Point): void {
    const dirX = targetPosition.x - this.x;
    const dirY = targetPosition.y - this.y;
    const distance = Math.hypot(dirX, dirY);

    // Si la distance est suffisamment petite, nous considérons que le squelette a atteint le joueur
    if (distance < 2) {
      this.x = targetPosition.x;
      this.y = targetPosition.y;
      return;
    }

    const normDirX = dirX / distance;
    const normDirY = dirY / distance;
    const speed = 1; // Définissez cela en fonction de la vitesse souhaitée pour vos squelettes

    // Déplace le squelette
    this.x += normDirX * speed;
    this.y += normDirY * speed;
  }
}

// Obtenir la position du joueur
function getPlayerPosition(): Point {
  return { x: 100, y: 100 };
}

const skeleton1 = new Skeleton();
const skeleton2 = new Skeleton();
e;

camera.addChild(skeleton1);
camera.addChild(skeleton2);
// ... Répétez pour tous les squelettes

// La fonction de mise à jour appelée par le ticker
function update(): void {
  // Obtient la position du joueur
  const playerPosition = getPlayerPosition();

  // Déplacez chaque squelette vers le joueur
  skeleton1.moveToTarget(playerPosition);
  skeleton2.moveToTarget(playerPosition);
  // ... Répétez pour tous les squelettes
}

// Ajoutez la boucle de mise à jour au ticker
app.ticker.add(update);
