import { Graphics } from 'pixi.js';
import './skull';
import { camera } from '../camera';
import app from '../pixi/initialize';

const movingObjectSkull = new Graphics();
movingObjectSkull.beginFill('blue');
movingObjectSkull.drawRect(0, 0, 50, 50);
camera.addChild(movingObjectSkull);

type Point = {
  x: number;
  y: number;
};

const points: Point[] = [
  { x: 50, y: 50 }, // point A
  { x: 100, y: 100 }, // point B
  { x: 150, y: 150 }, // point C
  { x: 200, y: 200 }, // point D

];

let index = 0;
let progress = 0;

function moveObjectSkull(delta: number): void {
  if (progress >= 1) {
    index++;
    if (index >= points.length) {
      index = 0;
    }

    progress = 0;
  }

  const startPoint = points[index];
  const endPoint = points[(index + 1) % points.length];

  movingObjectSkull.x = startPoint.x + (endPoint.x - startPoint.x) * progress;
  movingObjectSkull.y = startPoint.y + (endPoint.y - startPoint.y) * progress;
  progress += 0.01 * delta;
}

app.ticker.add(moveObjectSkull);
