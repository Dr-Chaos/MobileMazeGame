import { directionHistory } from './move-direction';

let previousTouch = {
  x: 0,
  y: 0,
};

document.addEventListener('touchmove', (event) => {
  const userTouch = {
    x: event.changedTouches[0].clientX,
    y: event.changedTouches[0].clientY,
  };

  console.log(event.changedTouches);

  // console.log(userTouch);

  if (userTouch.x + 100 < window.innerWidth / 2) {
    console.log('Left');
    directionHistory.x.push(-1);
  } else if (userTouch.x - 100 > window.innerWidth / 2) {
    console.log('right');
    directionHistory.x.push(1);
  }

  if (userTouch.y + 100 < window.innerHeight / 2) {
    console.log('top');
    directionHistory.y.push(-1);
  } else if (userTouch.y - 100 > window.innerHeight / 2) {
    console.log('bottom');
    directionHistory.y.push(1);
  }

  previousTouch = {
    x: userTouch.x,
    y: userTouch.y,
  };
});

document.addEventListener('touchend', (event) => {
  directionHistory.x = [];
  directionHistory.y = [];
});
