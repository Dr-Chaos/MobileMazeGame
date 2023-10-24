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

  if (userTouch.x < originTouch.x) {
    console.log('Left');
    directionHistory.x.push(-1);
  } else if (userTouch.x > originTouch.x) {
    console.log('right');
    directionHistory.x.push(1);
  }

  if (userTouch.y < originTouch.y) {
    console.log('top');
    directionHistory.y.push(-1);
  } else if (userTouch.y > originTouch.y) {
    console.log('bottom');
    directionHistory.y.push(1);
  }

  previousTouch = {
    x: userTouch.x,
    y: userTouch.y,
  };

  // Calculate the angle
  const deltaX = userTouch.x - originTouch.x;
  const deltaY = userTouch.y - originTouch.y;
  const angle = Math.atan2(deltaY, deltaX);
  let degrees = (angle * 180) / Math.PI;
  // to have 360° instead of 180
  if (degrees < 0) {
    degrees += 360;
  }

  console.log(degrees);
});

document.addEventListener('touchend', (event) => {
  directionHistory.x = [];
  directionHistory.y = [];
});
