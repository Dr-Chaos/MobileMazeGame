import { Point } from 'pixi.js';
import { camera } from '../camera';
import { playerStats } from './stats';
import { player } from './player';
// eslint-disable-next-line object-curly-newline
import { AnimationStates, Movements, animationState, movement, playerAnimationsContainer } from './animations/animations';
import { directionHistory } from './move-direction';

import './movement-keyboard'; // add key support
import './movement-touch'; // add touch support

export function movePlayer(direction: {x: number; y: number}, delta: number) {
  // move the player container (sprites, hitbox draw, etc)
  player.container.x += direction.x * delta;
  player.container.y += direction.y * delta;

  // adjust the hitbox values
  // positionHistory.old = { x: playerHitbox.x, y: playerHitbox.y };
  player.hitbox.x += direction.x * delta;
  player.hitbox.y += direction.y * delta;
  // positionHistory.new = { x: playerHitbox.x, y: playerHitbox.y };

  // adjust the camera
  camera.pivot.copyFrom(player.container);
}

function moveDirection() {
  const x = directionHistory.x.at(-1) ?? 0;
  const y = directionHistory.y.at(-1) ?? 0;
  // if don't move or move in a single direction
  if (!y || !x) return { x, y };
  // else if move in two directions, normalize the values
  const normalizedDirection = new Point(x, y).normalize();
  return { x: normalizedDirection.x, y: normalizedDirection.y };
}

export function moveGameLoop(delta: number) {
  if (animationState.current === AnimationStates.Death) return;
  const direction = moveDirection();
  // if don't move, set Idle state
  if (!direction.x && !direction.y) {
    movement.current = Movements.Idle;
    return;
  }

  // else set Walk state
  movement.current = Movements.Walk;

  // if move on the x axis, flip the sprite
  playerAnimationsContainer.scale.x = direction.x < 0 ? -1 : 1;

  const movePosition = {
    x: direction.x * playerStats.speed,
    y: direction.y * playerStats.speed,
  };

  movePlayer(movePosition, delta);
}
