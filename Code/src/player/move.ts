import { Point } from 'pixi.js';
import '@pixi/math-extras';
import app from '../pixi/initialize';
import {
  Movements, movement, player, playerContainer,
} from './player';

// pressed movement key history (by default no movement)
type KeyHistory = { x: number[]; y: number[] };
const keyHistory: KeyHistory = { x: [0], y: [0] };

// push the pressed key in the keyHistory, if not already present
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
      if (keyHistory.y.includes(-1)) return;
      keyHistory.y.push(-1);
      break;
    case 'KeyA':
      if (keyHistory.x.includes(-1)) return;
      keyHistory.x.push(-1);
      break;
    case 'KeyS':
      if (keyHistory.y.includes(1)) return;
      keyHistory.y.push(1);
      break;
    case 'KeyD':
      if (keyHistory.x.includes(1)) return;
      keyHistory.x.push(1);
      break;
    default:
      break;
  }
});

// remove key from keyHistory
document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
      keyHistory.y = keyHistory.y.filter((element) => element !== -1);
      break;
    case 'KeyA':
      keyHistory.x = keyHistory.x.filter((element) => element !== -1);
      break;
    case 'KeyS':
      keyHistory.y = keyHistory.y.filter((element) => element !== 1);
      break;
    case 'KeyD':
      keyHistory.x = keyHistory.x.filter((element) => element !== 1);
      break;
    default:
      break;
  }
});

let direction: Point;
app.ticker.add((delta: number) => {
  direction = new Point(keyHistory.x.at(-1), keyHistory.y.at(-1));
  // normalize direction only if the player move (x !== 0 or y ! == 0)
  // because Pixi will return NaN if you use normalize() on a Point(0, 0) (no movement)
  if (direction.x !== 0 || direction.y !== 0) {
    direction = direction.normalize();
    movement.current = Movements.Walk;
    playerContainer.scale.x = direction.x < 0 ? -1 : 1;
  } else {
    movement.current = Movements.Idle;
  }

  const speed = 2;
  playerContainer.x += direction.x * speed * delta;
  playerContainer.y += direction.y * speed * delta;
});

export { direction };
