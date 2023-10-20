import { Graphics, Application } from 'pixi.js';
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
  return { x: 100, y: 100 }; // Ceci est un exemple, utilisez la logique réelle pour obtenir la position actuelle du joueur
}

// Créez vos instances de squelettes
const skeleton1 = new Skeleton();
const skeleton2 = new Skeleton();
// ... Créez autant de squelettes que nécessaire

// Ajoutez vos squelettes à la caméra ou à la scène
camera.addChild(skeleton1);
camera.addChild(skeleton2);
// ... Répétez pour tous les squelettes

// La fonction de mise à jour appelée par le ticker
function update(delta: number): void { // delta est le temps écoulé en ms depuis la dernière mise à jour
  // Obtient la position du joueur
  const playerPosition = getPlayerPosition();

  // Déplacez chaque squelette vers le joueur
  skeleton1.moveToTarget(playerPosition);
  skeleton2.moveToTarget(playerPosition);
  // ... Répétez pour tous les squelettes
}

// Ajoutez la boucle de mise à jour au ticker
app.ticker.add(update);
