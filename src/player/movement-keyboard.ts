import { directionHistory } from './move-direction';

// push the pressed key in the keyHistory, if not already present
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
      if (directionHistory.y.includes(-1)) return;
      directionHistory.y.push(-1);
      break;
    case 'KeyA':
      if (directionHistory.x.includes(-1)) return;
      directionHistory.x.push(-1);
      break;
    case 'KeyS':
      if (directionHistory.y.includes(1)) return;
      directionHistory.y.push(1);
      break;
    case 'KeyD':
      if (directionHistory.x.includes(1)) return;
      directionHistory.x.push(1);
      break;
    default:
      break;
  }
});

// remove key from keyHistory
document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
      directionHistory.y = directionHistory.y.filter((element) => element !== -1);
      break;
    case 'KeyA':
      directionHistory.x = directionHistory.x.filter((element) => element !== -1);
      break;
    case 'KeyS':
      directionHistory.y = directionHistory.y.filter((element) => element !== 1);
      break;
    case 'KeyD':
      directionHistory.x = directionHistory.x.filter((element) => element !== 1);
      break;
    default:
      break;
  }
});
