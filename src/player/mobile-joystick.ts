import { Graphics } from 'pixi.js';
import app from '../pixi/initialize';

const touch = {
  x: 0,
  y: 0,
};

const touchMove = {
  x: 0,
  y: 0,
};

const bigCirle = new Graphics();
bigCirle.beginFill('white', 0.1);
bigCirle.drawCircle(0, 0, 25);
bigCirle.visible = false;
const littleCircle = new Graphics();
littleCircle.beginFill('red', 100);
littleCircle.drawCircle(0, 0, 12.5);
littleCircle.visible = false;

export function initializeJoystick() {
  app.stage.addChild(bigCirle);
  app.stage.addChild(littleCircle);
}

export function joystickGameLoop() {
  if (!touch.x || !touch.y) {
    bigCirle.visible = false;
    littleCircle.visible = false;
    return;
  }

  bigCirle.x = touch.x;
  bigCirle.y = touch.y;
  bigCirle.visible = true;

  const litleCircleDirection = {
    x: touchMove.x || touch.x,
    y: touchMove.y || touch.y,
  };
  // distance depuis le centre
  const deltaX = touchMove.x - touch.x;
  const deltaY = touchMove.y - touch.y;
  // const distanceFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const distanceFromCenter = Math.hypot(deltaX, deltaY);
  const maximumDistance = bigCirle.width / 2;
  // left
  if (bigCirle.x - litleCircleDirection.x > maximumDistance) {
    litleCircleDirection.x = (touch.x - touchMove.x) - maximumDistance;
    // litleCircleDirection.x = (touch.x + touchMove.x) - maximumDistance;
    // return;
  }

  // right
  if (litleCircleDirection.x - bigCirle.x > maximumDistance) {
    litleCircleDirection.x = (touch.x - touchMove.x) - maximumDistance;
  }

  // bottom
  if (litleCircleDirection.y - bigCirle.y > maximumDistance) {}

  // top
  if (bigCirle.y - litleCircleDirection.y > maximumDistance) {}

  littleCircle.x = litleCircleDirection.x;
  littleCircle.y = litleCircleDirection.y;
  littleCircle.visible = true;
}

document.addEventListener('touchmove', (event) => {
  touchMove.x = event.changedTouches[0].clientX;
  touchMove.y = event.changedTouches[0].clientY;

  const deltaX = touchMove.x - touch.x;
  const deltaY = touchMove.y - touch.y;
  const angle = Math.atan2(deltaY, deltaX);
  const degrees = (angle * 180) / Math.PI;

  if (degrees > 150 || degrees < -150) {
    // directionHistory.x = [-1];
    // directionHistory.y = [0];
    console.log('left');
  }

  if (degrees < -105 && degrees > -150) {
    // directionHistory.x = [-1];
    // directionHistory.y = [-1];
    console.log('top left');
  }

  if (degrees < -60 && degrees > -105) {
    // directionHistory.x = [0];
    // directionHistory.y = [-1];
    console.log('top ');
  }

  if (degrees < -30 && degrees > -60) {
    // directionHistory.x = [1];
    // directionHistory.y = [-1];

    console.log('right top');
  }

  if (degrees > -30 && degrees < 30) {
    // directionHistory.x = [1];
    // directionHistory.y = [0];
    console.log('right');
  }

  if (degrees > 30 && degrees < 60) {
    // directionHistory.x = [1];
    // directionHistory.y = [1];
    console.log('right bottom');
  }

  if (degrees > 60 && degrees < 105) {
    // directionHistory.x = [0];
    // directionHistory.y = [1];
    console.log('bottom');
  }

  if (degrees > 105 && degrees < 150) {
    // directionHistory.x = [-1];
    // directionHistory.y = [1];
    console.log('bottom left');
  }
});

document.addEventListener('touchstart', (event) => {
  touch.x = event.touches[0].clientX;
  touch.y = event.touches[0].clientY;
});

document.addEventListener('touchend', () => {
  touch.x = 0;
  touch.y = 0;
  touchMove.x = 0;
  touchMove.y = 0;
});
