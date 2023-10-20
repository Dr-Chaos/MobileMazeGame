/* Meme CODE QUE POUR L?AUTRE MAIS DES CONDITIONS A RAJOUTER

import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { atlasLoader } from '../pixi/atlas-loader';

type Point = { x: number; y: number };
type MovementState = { index: number; progress: number };

function createSkull(): AnimatedSprite {
  const skull = new AnimatedSprite(atlasLoader.skull.animations.idle);
  skull.scale.set(2);
  skull.animationSpeed = 0.17;
  skull.play();
  camera.addChild(skull);
  return skull;
}

let skull1 = createSkull();
let skull2 = createSkull();

const pointsSkull1: Point[] = [
  { x: 50, y: 50 },
  { x: 100, y: 100 },
  { x: 150, y: 150 },
  { x: 200, y: 200 },
];

const pointsSkull2: Point[] = [
  { x: 200, y: 50 },
  { x: 150, y: 100 },
  { x: 100, y: 150 },
  { x: 50, y: 200 },
];

let stateSkull1: MovementState = { index: 0, progress: 0 };
let stateSkull2: MovementState = { index: 0, progress: 0 };

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
  const result1 = updateSkullMovement(skull1, pointsSkull1, stateSkull1, delta, 0.01);
  skull1 = result1.updatedSkull;
  stateSkull1 = result1.updatedState;

  const result2 = updateSkullMovement(skull2, pointsSkull2, stateSkull2, delta, 0.02);
  skull2 = result2.updatedSkull;
  stateSkull2 = result2.updatedState;
});
export { skull1, skull2 };
