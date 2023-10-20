import { Graphics } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { playerContainer } from '../player/player';
import { skeletons, createSkeleton } from './map-objects/skeleton';

const skeleton = new Graphics();
skeleton.beginFill(0xFF_00_00);
skeleton.drawRect(0, 0, 50, 50);
camera.addChild(skeleton);

const speed = 2;

function moveSkeleton(): void {
  const playerX = playerContainer.x;
  const playerY = playerContainer.y;

  const directionX = playerX - skeleton.x;
  const directionY = playerY - skeleton.y;

  const distance = Math.hypot(directionX, directionY);

  const normalizedDirectionX = directionX / distance;
  const normalizedDirectionY = directionY / distance;

  skeleton.x += normalizedDirectionX * speed;
  skeleton.y += normalizedDirectionY * speed;
}

app.ticker.add(moveSkeleton);
