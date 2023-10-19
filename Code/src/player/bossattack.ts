import { Container, Graphics } from 'pixi.js';
import { bossContainer } from './player/boss';
import app from './pixi/initialize';

const bossattackContainer = new Container();
bossContainer.addChild(bossattackContainer);

const bossattack = new Graphics();
bossattack.beginFill('green');
bossattack.drawRect(-15, -15, 30, 30);
bossattackContainer.position.set(0, 70);
bossattackContainer.addChild(bossattack);
let angle = 0; //

function moveBossattack() {
  angle += 0.5;
  const radius = 70;
  const newX = Math.cos(angle) * radius;
  const newY = Math.sin(angle) * radius;

  bossattackContainer.position.set(newX - 5, newY + 30);
}

app.ticker.add(moveBossattack);
