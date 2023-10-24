import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import { isColliding } from '../math/collisions';
import { player } from '../player/player';
import { isInvulnerable } from '../player/invulnerability';
import { damagePlayer } from '../player/receive-damage';

type Point = { x: number; y: number };
type MovementState = { index: number; progress: number };
type Skull = { sprite: AnimatedSprite; movementState: MovementState; points: Point[]; speed: number };
export const skulls: Skull[] = [];

export function createSkull(points: Point[], speed: number) {
  const skull = new AnimatedSprite(atlasLoader.skull.animations.idle);
  skull.scale.set(2);
  skull.animationSpeed = 0.17;
  skull.play();

  skulls.push({
    sprite: skull,
    movementState: { index: 0, progress: 0 },
    points,
    speed,
  });

  camera.addChild(skull);
}

export function initializeSkulls() {
  createSkull([
    { x: -360, y: 230 },
    { x: -360, y: 360 },
    { x: 100, y: 360 },
    { x: 100, y: 230 },
  ], 0.01);

  createSkull([
    { x: -380, y: 200 },
    { x: 130, y: 200 },
    { x: 130, y: 390 },
    { x: -380, y: 390 },
  ], 0.02);

  createSkull([
    { x: +115, y: -410 },
    { x: +115, y: -270 },
    { x: -145, y: -270 },
    { x: -145, y: -410 },
  ], 0.02);

  createSkull([
    { x: 230, y: -430 },
    { x: 230, y: -230 },
    { x: -250, y: -230 },
    { x: -250, y: -430 },
  ], 0.02);
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
  state.progress += speed * delta;

  return { updatedSkull, updatedState: state };
}

export function skullGameLoop(delta: number) {
  for (const skull of skulls) {
    const { updatedSkull, updatedState } = updateSkullMovement(skull.sprite, skull.points, skull.movementState, delta, skull.speed);

    skull.sprite.x = updatedSkull.x;
    skull.sprite.y = updatedSkull.y;
    skull.movementState = updatedState;

    if (!isInvulnerable() && isColliding(player.hitbox, skull.sprite)) {
      damagePlayer(1);
    }
  }
}
