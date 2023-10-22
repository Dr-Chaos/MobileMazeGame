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

export function createGhost(): AnimatedSprite {
  const ghost = new AnimatedSprite(atlasLoader.ghost.animations.idle);
  ghost.scale.set(2);
  ghost.animationSpeed = 0.17;
  ghost.play();

  return ghost;
}

export const ghost1 = createGhost();
export const ghost2 = createGhost();

camera.addChild(ghost1);
camera.addChild(ghost2);

const pointsGhost1: Point[] = [
  { x: +115, y: -410 },
  { x: +115, y: -270 },
  { x: -145, y: -270 },
  { x: -145, y: -410 },
];

const pointsGhost2: Point[] = [
  { x: 230, y: -430 },
  { x: 230, y: -230 },
  { x: -250, y: -230 },
  { x: -250, y: -430 },
];

let stateGhost1: MovementState = { index: 0, progress: 0 };
let stateGhost2: MovementState = { index: 0, progress: 0 };

let invulnerabilityTime = 0;
const invulnerabilityTimer = 1000;

function updateGhostMovement(
  ghost: AnimatedSprite,
  points: Point[],
  currentState: MovementState,
  delta: number,
  speed: number,
): { updatedGhost: AnimatedSprite; updatedState: MovementState } {
  const state = { ...currentState };
  const updatedGhost = ghost;

  if (state.progress >= 1) {
    state.index = (state.index + 1) % points.length;
    state.progress = 0;
  }

  const startPoint = points[state.index];
  const endPoint = points[(state.index + 1) % points.length];

  updatedGhost.x = startPoint.x + (endPoint.x - startPoint.x) * state.progress;
  updatedGhost.y = startPoint.y + (endPoint.y - startPoint.y) * state.progress;
  state.progress += speed * delta;

  return { updatedGhost, updatedState: state };
}

app.ticker.add((delta) => {
  const { updatedGhost: updatedGhost1, updatedState: updatedStateGhost1 } = updateGhostMovement(ghost1, pointsGhost1, stateGhost1, delta, 0.01);
  // Directly update the properties, don't reassign
  ghost1.x = updatedGhost1.x;
  ghost1.y = updatedGhost1.y;
  stateGhost1 = updatedStateGhost1; // Assuming this is a let variable, or else it should also not be reassiGhost

  const { updatedGhost: updatedGhost2, updatedState: updatedStateGhost2 } = updateGhostMovement(ghost2, pointsGhost2, stateGhost2, delta, 0.02);
  ghost2.x = updatedGhost2.x;
  ghost2.y = updatedGhost2.y;
  stateGhost2 = updatedStateGhost2;

  if (isColliding(playerHitbox, ghost1) && Date.now() - invulnerabilityTime > invulnerabilityTimer) {
    invulnerabilityTime = Date.now();
    playerStats.life -= 1;
    lifeHud.text = `Vie : ${playerStats.life}`;
  }

  if (isColliding(playerHitbox, ghost2) && Date.now() - invulnerabilityTime > invulnerabilityTimer) {
    invulnerabilityTime = Date.now();
    playerStats.life -= 1;
    lifeHud.text = `Vie : ${playerStats.life}`;
  }
});
