import { Container, Graphics } from 'pixi.js';
import { bossContainer } from './map-objects/boss';
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

  bossattackContainer.position.set(newX + 30, newY - 5);
}

const bossattackContainer2 = new Container();
bossContainer.addChild(bossattackContainer2);

const bossattack2 = new Graphics();
bossattack2.beginFill('blue');
bossattack2.drawRect(-15, -14, 30, 30);
bossattackContainer2.position.set(0, 69);
bossattackContainer2.addChild(bossattack2);
let angle2 = 0; //

function moveBossattack2() {
  angle2 += 0.2;
  const radius = 20;
  const newX2 = Math.cos(angle2) * radius;
  const newY2 = Math.sin(angle2) * radius;

  bossattackContainer2.position.set(newX2 + 50, newY2 + 30);
}

app.ticker.add(() => {
  moveBossattack();
  moveBossattack2();
});
