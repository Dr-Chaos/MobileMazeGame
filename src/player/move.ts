import {
  AnimationStates, Movements, animationState, movement, playerAnimationsContainer,
} from './animations/animations';
import { camera } from '../camera';
import { inputMovementDirection } from './movement-keyboard';
import { playerStats } from './stats';
import { player } from './player';

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

export function moveGameLoop(delta: number) {
  if (animationState.current === AnimationStates.Death) return;
  const direction = inputMovementDirection();
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
