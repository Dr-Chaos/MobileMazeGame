import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { atlasLoader } from '../pixi/atlas-loader';
import { playerStats } from '../player/stats';
import { isColliding } from '../math/collisions';
import { lifeHud } from '../player/hud';
import { playerHitbox } from '../player/player';
import { isInvulnerable, startInvulnerabilityTimer } from '../player/invulnerability';

type Point = { x: number; y: number };
type MovementState = { index: number; progress: number };

export function createSkull(): AnimatedSprite {
  const skull = new AnimatedSprite(atlasLoader.skull.animations.idle);
  skull.scale.set(2);
  skull.animationSpeed = 0.17;
  skull.play();
  return skull;
}

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
  state.progress += speed * delta * 0.3;

  return { updatedSkull, updatedState: state };
}

export const skull1 = createSkull();
export const skull2 = createSkull();
export const ghost1 = createSkull();
export const ghost2 = createSkull();

camera.addChild(skull1);
camera.addChild(skull2);

camera.addChild(ghost1);
camera.addChild(ghost2);

const pointsSkull1: Point[] = [
  { x: -304, y: 208 },
  { x: -304, y: 320 },
  { x: 80, y: 320 },
  { x: 80, y: 208 },
];

const pointsSkull2: Point[] = [
  { x: -330, y: 176 },
  { x: 104, y: 176 },
  { x: 104, y: 356 },
  { x: -330, y: 356 },
];

const pointsGhost1: Point[] = [
  { x: 96, y: -320 },
  { x: 96, y: -224 },
  { x: -128, y: -224 },
  { x: -128, y: -320 },
];

const pointsGhost2: Point[] = [
  { x: 186, y: -368 },
  { x: 186, y: -192 },
  { x: -224, y: -192 },
  { x: -224, y: -368 },
];

let stateSkull1: MovementState = { index: 0, progress: 0 };
let stateSkull2: MovementState = { index: 0, progress: 0 };
let stateGhost1: MovementState = { index: 0, progress: 0 };
let stateGhost2: MovementState = { index: 0, progress: 0 };

app.ticker.add((delta) => {
  const { updatedSkull: updatedSkull1, updatedState: updatedStateSkull1 } = updateSkullMovement(skull1, pointsSkull1, stateSkull1, delta, 0.01);

  skull1.x = updatedSkull1.x;
  skull1.y = updatedSkull1.y;
  stateSkull1 = updatedStateSkull1;

  const { updatedSkull: updatedSkull2, updatedState: updatedStateSkull2 } = updateSkullMovement(skull2, pointsSkull2, stateSkull2, delta, 0.02);
  skull2.x = updatedSkull2.x;
  skull2.y = updatedSkull2.y;
  stateSkull2 = updatedStateSkull2;

  const { updatedSkull: updatedGhost1, updatedState: updatedStateGhost1 } = updateSkullMovement(ghost1, pointsGhost1, stateGhost1, delta, 0.01);
  ghost1.x = updatedGhost1.x;
  ghost1.y = updatedGhost1.y;
  stateGhost1 = updatedStateGhost1;

  const { updatedSkull: updatedGhost2, updatedState: updatedStateGhost2 } = updateSkullMovement(ghost2, pointsGhost2, stateGhost2, delta, 0.02);
  ghost2.x = updatedGhost2.x;
  ghost2.y = updatedGhost2.y;
  stateGhost2 = updatedStateGhost2;

  if (!isInvulnerable() && isColliding(playerHitbox, skull1)) {
    startInvulnerabilityTimer();
    playerStats.life -= 1;
    lifeHud.text = `Vie : ${playerStats.life}`;
  }

  if (!isInvulnerable() && isColliding(playerHitbox, skull2)) {
    startInvulnerabilityTimer();
    playerStats.life -= 1;
    lifeHud.text = `Vie : ${playerStats.life}`;
  }

  if (!isInvulnerable() && isColliding(playerHitbox, ghost1)) {
    startInvulnerabilityTimer();
    playerStats.life -= 1;
    lifeHud.text = `Vie : ${playerStats.life}`;
  }

  if (!isInvulnerable() && isColliding(playerHitbox, ghost2)) {
    startInvulnerabilityTimer();
    playerStats.life -= 1;
    lifeHud.text = `Vie : ${playerStats.life}`;
  }
});
