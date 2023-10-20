import { Container, Graphics } from 'pixi.js';
import { playerContainer } from './player/player';
import app from './pixi/initialize';

const fireballContainer = new Container();
playerContainer.addChild(fireballContainer);

const fireball = new Graphics();
fireball.beginFill(0xFF_A5_00);
fireball.drawRect(-15, -15, 30, 30);
fireballContainer.position.set(0, 70);
fireballContainer.addChild(fireball);
let angle = 0; //

function moveFireball() {
  angle += 0.1;
  const radius = 50;
  const newX = Math.cos(angle) * radius;
  const newY = Math.sin(angle) * radius;

  fireballContainer.position.set(newX - 5, newY + 30);
}

app.ticker.add(moveFireball);
