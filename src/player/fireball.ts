import { Graphics } from 'pixi.js';
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
export { fireball };
