/* import { Graphics } from 'pixi.js';
import { playerContainer } from './player';
import app from '../pixi/initialize';

const fireball = new Graphics();
playerContainer.addChild(fireball);

fireball.beginFill('orange');
fireball.drawRect(0, 0, 30, 30);

const radius = 50;
let angle = 0;

function moveFireball() {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  fireball.position.set(x, y + 20);
  angle += 0.1;
}

app.ticker.add(moveFireball);
export { fireball }; */

import { Sprite } from 'pixi.js';
import { playerContainer } from './player';
import app from '../pixi/initialize';

// 1. Charger la texture
app.loader.add('fireball', 'public/witch/fireball/fireball.png').load((loader, resources) => {
  // 2. Créer un sprite avec la texture chargée
  const fireballSprite = new Sprite(resources.fireball.texture);

  // 3. Ajouter le sprite à playerContainer
  playerContainer.addChild(fireballSprite);

  // Positionner le sprite
  fireballSprite.position.set(0, 20); // Vous pouvez ajuster les coordonnées x et y selon vos besoins

  const radius = 50;
  let angle = 0;

  function moveFireball() {
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    fireballSprite.position.set(x, y + 20);
    angle += 0.1;
  }

  app.ticker.add(moveFireball);
});
