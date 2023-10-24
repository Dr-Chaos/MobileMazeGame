import app from '../pixi/initialize';
import { Movements, movement, playerAnimationsContainer } from './animations/animations';
import { camera } from '../camera';
import { inputMovementDirection } from './movement-keyboard';
import {
  playerContainer, playerHitbox,
} from './player';
import { playerStats } from './stats';

export function movePlayer(direction: {x: number; y: number}) {
  // move the player container (sprites, hitbox draw, etc)
  playerContainer.x += direction.x;
  playerContainer.y += direction.y;

  // adjust the hitbox values
  // positionHistory.old = { x: playerHitbox.x, y: playerHitbox.y };
  playerHitbox.x += direction.x;
  playerHitbox.y += direction.y;
  // positionHistory.new = { x: playerHitbox.x, y: playerHitbox.y };

  // adjust the camera
  camera.pivot.copyFrom(playerContainer);
}

// move the player when direction change
app.ticker.add((delta) => {
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
    x: direction.x * playerStats.speed * delta,
    y: direction.y * playerStats.speed * delta,
  };

  movePlayer(movePosition);
});
