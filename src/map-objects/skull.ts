import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { atlasLoader } from '../pixi/atlas-loader';
import { playerStats } from '../player/stats';
import { isColliding } from '../math/collisions';
import { lifeHud } from '../player/hud';
import { playerHitbox } from '../player/player';

type Point = { x: number; y: number };
type MovementState = { index: number; progress: number };

export function createSkull(): AnimatedSprite {
  const skull = new AnimatedSprite(atlasLoader.skull.animations.idle);
  skull.scale.set(2);
  skull.animationSpeed = 0.17;
  skull.play();

  return skull;
}

export const skull1 = createSkull();
export const skull2 = createSkull();

camera.addChild(skull1);
camera.addChild(skull2);

const pointsSkull1: Point[] = [
  { x: -360, y: 230 },
  { x: -360, y: 360 },
  { x: 100, y: 360 },
  { x: 100, y: 230 },
];

const pointsSkull2: Point[] = [
  { x: -380, y: 200 },
  { x: 130, y: 200 },
  { x: 130, y: 390 },
  { x: -380, y: 390 },
];

let stateSkull1: MovementState = { index: 0, progress: 0 };
let stateSkull2: MovementState = { index: 0, progress: 0 };

let invulnerabilityTime = 0;
const invulnerabilityTimer = 1000;

function updateSkullMovement(
  skull: AnimatedSprite,
  points: Point[],
  currentState: MovementState,
  delta: number,
  speed: number,
): { updatedSkull: AnimatedSprite; updatedState: MovementState } {
  const state = { ...currentState };
  const updatedSkull = skull;

  if (state.progress >= 1) {
    state.index = (state.index + 1) % points.length;
    state.progress = 0;
  }

  const startPoint = points[state.index];
  const endPoint = points[(state.index + 1) % points.length];

  updatedSkull.x = startPoint.x + (endPoint.x - startPoint.x) * state.progress;
  updatedSkull.y = startPoint.y + (endPoint.y - startPoint.y) * state.progress;
  state.progress += speed * delta;

  return { updatedSkull, updatedState: state };
}

app.ticker.add((delta) => {
  const { updatedSkull: updatedSkull1, updatedState: updatedStateSkull1 } = updateSkullMovement(skull1, pointsSkull1, stateSkull1, delta, 0.01);

  skull1.x = updatedSkull1.x;
  skull1.y = updatedSkull1.y;
  stateSkull1 = updatedStateSkull1;

  const { updatedSkull: updatedSkull2, updatedState: updatedStateSkull2 } = updateSkullMovement(skull2, pointsSkull2, stateSkull2, delta, 0.02);
  skull2.x = updatedSkull2.x;
  skull2.y = updatedSkull2.y;
  stateSkull2 = updatedStateSkull2;

  if (isColliding(playerHitbox, skull1) && Date.now() - invulnerabilityTime > invulnerabilityTimer) {
    invulnerabilityTime = Date.now();
    playerStats.life -= 1;
    lifeHud.text = `Vie : ${playerStats.life}`;
  }

  if (isColliding(playerHitbox, skull2) && Date.now() - invulnerabilityTime > invulnerabilityTimer) {
    invulnerabilityTime = Date.now();
    playerStats.life -= 1;
    lifeHud.text = `Vie : ${playerStats.life}`;
  }
});
