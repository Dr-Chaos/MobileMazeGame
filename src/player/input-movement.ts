import { Point } from 'pixi.js';
import '@pixi/math-extras';

// pressed movement key history (by default no movement)
type KeyHistory = { x: number[]; y: number[] };
const keyHistory: KeyHistory = { x: [], y: [] };

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

export function inputMovementDirection() {
  const x = keyHistory.x.at(-1) ?? 0;
  const y = keyHistory.y.at(-1) ?? 0;
  // if don't move or move in a single direction
  if (!y || !x) return { x, y };
  // else if move in two directions, normalize the values
  const normalizedDirection = new Point(x, y).normalize();
  return { x: normalizedDirection.x, y: normalizedDirection.y };
}
