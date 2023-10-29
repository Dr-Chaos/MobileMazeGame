import { directionHistory } from './move-direction';

let touchStart = {
  x: 0,
  y: 0,
};

document.addEventListener('touchstart', (event) => {
  touchStart = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  };
});

document.addEventListener('touchmove', (event) => {
  const touchMove = {
    x: event.changedTouches[0].clientX,
    y: event.changedTouches[0].clientY,
  };

  const deltaX = touchMove.x - touchStart.x;
  const deltaY = touchMove.y - touchStart.y;
  const angle = Math.atan2(deltaY, deltaX);
  const degrees = (angle * 180) / Math.PI;

  if (!touchMove.x && !touchMove.y) {
    directionHistory.x = [0];
    directionHistory.y = [0];
    console.log('no move');
    return;
  }

  if (degrees > 150 || degrees < -150) {
    directionHistory.x = [-1];
    directionHistory.y = [0];
    console.log('left');
  }

  if (degrees < -105 && degrees > -150) {
    directionHistory.x = [-1];
    directionHistory.y = [-1];
    console.log('top left');
  }

  if (degrees < -60 && degrees > -105) {
    directionHistory.x = [0];
    directionHistory.y = [-1];
    console.log('top ');
  }

  if (degrees < -30 && degrees > -60) {
    directionHistory.x = [1];
    directionHistory.y = [-1];

    console.log('right top');
  }

  if (degrees > -30 && degrees < 30) {
    directionHistory.x = [1];
    directionHistory.y = [0];
    console.log('right');
  }

  if (degrees > 30 && degrees < 60) {
    directionHistory.x = [1];
    directionHistory.y = [1];
    console.log('right bottom');
  }

  if (degrees > 60 && degrees < 105) {
    directionHistory.x = [0];
    directionHistory.y = [1];
    console.log('bottom');
  }

  if (degrees > 105 && degrees < 150) {
    directionHistory.x = [-1];
    directionHistory.y = [1];
    console.log('bottom left');
  }
});

document.addEventListener('touchend', () => {
  directionHistory.x = [];
  directionHistory.y = [];
});
