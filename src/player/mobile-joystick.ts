import { Graphics } from 'pixi.js';
import app from '../pixi/initialize';
import { directionHistory } from './move-direction';

const touchStart = {
  x: 0,
  y: 0,
};

const touchMove = {
  x: 0,
  y: 0,
};

const bigCircle = new Graphics();
bigCircle.beginFill('white', 0.1);
bigCircle.drawCircle(0, 0, 35);
bigCircle.visible = false;

const littleCircle = new Graphics();
littleCircle.beginFill('white', 0.2);
littleCircle.drawCircle(0, 0, 17.5);
littleCircle.visible = false;

export function initializeJoystick() {
  app.stage.addChild(bigCircle);
  app.stage.addChild(littleCircle);
}

export function joystickGameLoop() {
  if (!touchStart.x || !touchStart.y) {
    bigCircle.visible = false;
    littleCircle.visible = false;
    return;
  }

  bigCircle.x = touchStart.x;
  bigCircle.y = touchStart.y;
  bigCircle.visible = true;

  // Calcul de la direction et de la distance depuis le centre
  const deltaX = touchMove.x - touchStart.x;
  const deltaY = touchMove.y - touchStart.y;
  const distanceFromCenter = Math.hypot(deltaX, deltaY);

  const litleCircleDirection = {
    x: touchMove.x || touchStart.x,
    y: touchMove.y || touchStart.y,
  };

  // Limitez la distance depuis le centre
  const maximumDistance = bigCircle.width / 2;
  const exceedDistanceX = touchMove.x !== 0 && distanceFromCenter > maximumDistance;
  const exceedDistanceY = touchMove.y !== 0 && distanceFromCenter > maximumDistance;
  if (exceedDistanceX || exceedDistanceY) {
    const angle = Math.atan2(deltaY, deltaX);
    litleCircleDirection.x = touchStart.x + Math.cos(angle) * maximumDistance;
    litleCircleDirection.y = touchStart.y + Math.sin(angle) * maximumDistance;
  }

  littleCircle.x = litleCircleDirection.x;
  littleCircle.y = litleCircleDirection.y;
  littleCircle.visible = true;

  const minimumDistance = maximumDistance / 2;
  if (distanceFromCenter < minimumDistance) {
    directionHistory.x = [0];
    directionHistory.y = [0];
    // console.log("don't move");
    return;
  }

  if (!touchMove.x && !touchMove.y) {
    directionHistory.x = [0];
    directionHistory.y = [0];
    // console.log("don't move");
    return;
  }

  const angle = Math.atan2(deltaY, deltaX);
  const degrees = (angle * 180) / Math.PI;

  if (degrees > 150 || degrees < -150) {
    directionHistory.x = [-1];
    directionHistory.y = [0];
    // console.log('left');
  }

  if (degrees < -105 && degrees > -150) {
    directionHistory.x = [-1];
    directionHistory.y = [-1];
    // console.log('top left');
  }

  if (degrees < -60 && degrees > -105) {
    directionHistory.x = [0];
    directionHistory.y = [-1];
    // console.log('top ');
  }

  if (degrees < -30 && degrees > -60) {
    directionHistory.x = [1];
    directionHistory.y = [-1];
    // console.log('right top');
  }

  if (degrees > -30 && degrees < 30) {
    directionHistory.x = [1];
    directionHistory.y = [0];
    // console.log('right');
  }

  if (degrees > 30 && degrees < 60) {
    directionHistory.x = [1];
    directionHistory.y = [1];
    // console.log('right bottom');
  }

  if (degrees > 60 && degrees < 105) {
    directionHistory.x = [0];
    directionHistory.y = [1];
    // console.log('bottom');
  }

  if (degrees > 105 && degrees < 150) {
    directionHistory.x = [-1];
    directionHistory.y = [1];
    // console.log('bottom left');
  }
}

document.addEventListener('touchstart', (event) => {
  touchStart.x = event.touches[0].clientX;
  touchStart.y = event.touches[0].clientY;
});

document.addEventListener('touchmove', (event) => {
  touchMove.x = event.changedTouches[0].clientX;
  touchMove.y = event.changedTouches[0].clientY;
});

document.addEventListener('touchend', () => {
  touchStart.x = 0;
  touchStart.y = 0;
  touchMove.x = 0;
  touchMove.y = 0;
  directionHistory.x = [0];
  directionHistory.y = [0];
});
