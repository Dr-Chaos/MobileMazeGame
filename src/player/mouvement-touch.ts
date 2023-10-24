import { directionHistory } from './move-direction';

let previousTouch = {
  x: 0,
  y: 0,
};

// fix relative andabsolute positions
let originTouch = {
  x: 0,
  y: 0,
};

document.addEventListener('touchstart', (event) => {
  originTouch = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  };
});

document.addEventListener('touchmove', (event) => {
  const userTouch = {
    x: event.changedTouches[0].clientX,
    y: event.changedTouches[0].clientY,
  };

  // console.log(event.changedTouches);

  // console.log(userTouch);

  if (userTouch.x + 100 < originTouch.x) {
    console.log('Left');
    directionHistory.x.push(-1);
  } else if (userTouch.x - 100 > originTouch.x) {
    console.log('right');
    directionHistory.x.push(1);
  }

  if (userTouch.y + 100 < originTouch.y) {
    console.log('top');
    directionHistory.y.push(-1);
  } else if (userTouch.y - 100 > originTouch.y) {
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
