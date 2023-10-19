import { Container, Graphics } from 'pixi.js';
import { camera } from './player/camera';

const bossContainer = new Container();
bossContainer.x = 1;
bossContainer.y = -200;
const bossHitbox = new Graphics();
bossContainer.addChild(bossHitbox);
bossHitbox.beginFill('yellow', 0.4);
bossHitbox.drawRect(0, 0, 10, 20);
camera.addChild(bossContainer);

export { bossContainer };
