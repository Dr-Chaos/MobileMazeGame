import { Container } from 'pixi.js';
import skeletonIdleAnimation from './skeletonidle/skeleton.json';
import { skeletons } from './../../src/map-objects/skeleton/skeleton';
import skeletonWalkAnimation from './skeletonwalk/skeletonwalk.json';
import skeletonDeathAnimation from './skeletondeath/skeletondeath.json'
import app from './../../src/pixi/initialize';



const skeletonAnimation = {
  width: 32,
  height: 48,
};
const skeletonAnimationsContainer = new Container();
skeletonAnimationsContainer.pivot.x = skeletonAnimation.width / 2; // place le pivot au millieux du sprite pour pouvoir le rotate
skeletonAnimationsContainer.pivot.y = skeletonAnimation.height / 2;
SkeletonContainer.addChild(skeletonAnimationsContainer);

skeletonAnimationsContainer.addChild(skeletonIdleAnimation);
skeletonAnimationsContainer.addChild(skeletonWalkAnimation);
skeletonAnimationsContainer.addChild(skeletonDeathAnimation);

enum Movements {
  Idle = 'Idle',
  Walk = 'Walk',
  Death = 'Death'
}

const movement = {
  current: 'Idle',
};

const animations = [
  { state: Movements.Idle, animation: skeletonIdleAnimation },
  { state: Movements.Walk, animation: skeletonWalkAnimation },
  { state: Movements.Death, animation: skeletonDeathAnimation},
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
