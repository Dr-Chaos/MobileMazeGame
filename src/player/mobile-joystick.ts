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

const bigCircle = new Graphics();
bigCircle.beginFill('white', 0.1);
bigCircle.drawCircle(0, 0, 25);
bigCircle.visible = false;

const littleCircle = new Graphics();
littleCircle.beginFill('red', 1);
littleCircle.drawCircle(0, 0, 12.5);
littleCircle.visible = false;

export function initializeJoystick() {
  app.stage.addChild(bigCircle);
  app.stage.addChild(littleCircle);
}

export function joystickGameLoop() {
  if (!touch.x || !touch.y) {
    bigCircle.visible = false;
    littleCircle.visible = false;
    return;
  }

  bigCircle.x = touch.x;
  bigCircle.y = touch.y;
  bigCircle.visible = true;

  // Calcul de la direction et de la distance depuis le centre
  const deltaX = touchMove.x - touch.x;
  const deltaY = touchMove.y - touch.y;
  const distanceFromCenter = Math.hypot(deltaX, deltaY);

  // Limitez la distance depuis le centre
  const maximumDistance = bigCircle.width / 2;
  if (distanceFromCenter > maximumDistance) {
    const angle = Math.atan2(deltaY, deltaX);
    touchMove.x = touch.x + Math.cos(angle) * maximumDistance;
    touchMove.y = touch.y + Math.sin(angle) * maximumDistance;
  }

  littleCircle.x = touchMove.x;
  littleCircle.y = touchMove.y;
  littleCircle.visible = true;

  // Calcul de l'angle en degrés
  const angleInRadians = Math.atan2(deltaY, deltaX);
  const angleInDegrees = (angleInRadians * 180) / Math.PI;

  // Utilisez angleInDegrees pour déterminer la direction
  if (angleInDegrees > 150 || angleInDegrees < -150) {
    console.log('left');
  } else if (angleInDegrees < -105 && angleInDegrees > -150) {
    console.log('top left');
  } else if (angleInDegrees < -60 && angleInDegrees > -105) {
    console.log('top');
  } else if (angleInDegrees < -30 && angleInDegrees > -60) {
    console.log('right top');
  } else if (angleInDegrees > -30 && angleInDegrees < 30) {
    console.log('right');
  } else if (angleInDegrees > 30 && angleInDegrees < 60) {
    console.log('right bottom');
  } else if (angleInDegrees > 60 && angleInDegrees < 105) {
    console.log('bottom');
  } else if (angleInDegrees > 105 && angleInDegrees < 150) {
    console.log('bottom left');
  }
}

document.addEventListener('touchmove', (event) => {
  touchMove.x = event.changedTouches[0].clientX;
  touchMove.y = event.changedTouches[0].clientY;
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
