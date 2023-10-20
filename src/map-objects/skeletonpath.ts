import { Graphics } from 'pixi.js';
import './skull';
import { camera } from '../camera';
import app from '../pixi/initialize';

type Point = {
  x: number;
  y: number;
};

let playerPosition: Point = { x: 0, y: 0 };

function getPlayerPosition(): Point {
  playerPosition.x += 1;
  playerPosition.y += 1;

  return playerPosition;
}

const movingskeleton = new Graphics();
movingskeleton.beginFill(0x00_00_FF); // Utilisation d'une couleur hexadécimale (bleu)
movingskeleton.drawRect(0, 0, 50, 50);
camera.addChild(movingskeleton);

function moveskeleton(): void {
  playerPosition = getPlayerPosition();

  movingskeleton.x = playerPosition.x;
  movingskeleton.y = playerPosition.y;
}

app.ticker.add(moveskeleton);
