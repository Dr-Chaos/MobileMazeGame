import { Container } from 'pixi.js';
import skeletonIdleAnimation from './skeletonidle';
import { skeletonContainer } from './player';
import skeletonWalkAnimation from './skeletonwalk';
import app from '../pixi/initialize';



const skeletonAnimation = {
  width: 32,
  height: 48,
};
const skeletonAnimationsContainer = new Container();
skeletonAnimationsContainer.pivot.x = skeletonAnimation.width / 2; // place le pivot au millieux du sprite pour pouvoir le rotate
skeletonAnimationsContainer.pivot.y = skeletonAnimation.height / 2;
skeletonContainer.addChild(skeletonAnimationsContainer);

skeletonAnimationsContainer.addChild(skeletonIdleAnimation);
skeletonAnimationsContainer.addChild(skeletonWalkAnimation);

enum Movements {
  Idle = 'Idle',
  Walk = 'Walk',
}

const movement = {
  current: 'Idle',
};

const animations = [
  { state: Movements.Idle, animation: skeletonIdleAnimation },
  { state: Movements.Walk, animation: skeletonWalkAnimation },
];

app.ticker.add(() => {
  for (const animation of animations) {
    switch (movement.current) {
      case Movements.Idle:
        animation.animation.visible = animation.state === Movements.Idle;
        break;
      case Movements.Walk:
        animation.animation.visible = animation.state === Movements.Walk;

        break;
      default:
        animation.animation.visible = animation.state === Movements.Idle;
        break;
    }
  }
});

export {
  Movements,
  movement,
  skeletonAnimationsContainer,
};
