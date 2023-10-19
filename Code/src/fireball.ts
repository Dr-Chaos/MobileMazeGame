import { Container, Graphics } from 'pixi.js';
import { playerContainer } from './player/player';
import app from './pixi/initialize';

const fireballContainer = new Container();
playerContainer.addChild(fireballContainer);

const fireball = new Graphics();
fireball.beginFill(0xFF_A5_00); // Couleur orange en hexadécimal
fireball.drawRect(-15, -15, 30, 30); // Assurez-vous que le dessin soit centré

fireballContainer.position.set(70, 0); // Position initiale du conteneur
fireballContainer.pivot.set(0, 0);
let angle = 0; // Angle initial

function moveFireball() {
  // Ajustez la vitesse de rotation selon vos besoins
  angle += 0.01; // Par exemple, 0.01 radians par image

  // Calculez la nouvelle position en fonction de l'angle et du rayon
  const radius = 50; // Ajustez le rayon selon vos besoins
  const newX = Math.cos(angle) * radius;
  const newY = Math.sin(angle) * radius;

  // Mettez à jour la position du conteneur
  fireballContainer.position.set(70 + newX, newY);
}

app.ticker.add(moveFireball);
