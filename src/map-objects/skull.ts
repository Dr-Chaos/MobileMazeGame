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
    { x: -304, y: 208 },
    { x: -304, y: 320 },
    { x: 80, y: 320 },
    { x: 80, y: 208 },
  ], 0.003);

  createSkull([
    { x: -330, y: 176 },
    { x: 104, y: 176 },
    { x: 104, y: 356 },
    { x: -330, y: 356 },
  ], 0.006);

  createSkull([
    { x: 96, y: -320 },
    { x: 96, y: -224 },
    { x: -128, y: -224 },
    { x: -128, y: -320 },
  ], 0.003);

  createSkull([
    { x: 186, y: -368 },
    { x: 186, y: -192 },
    { x: -224, y: -192 },
    { x: -224, y: -368 },
  ], 0.006);
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
