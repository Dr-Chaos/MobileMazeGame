import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import app from '../pixi/initialize';
import { collisionResponseDirection, isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { movePlayer } from '../player/move';

export function createLever(x: number, y: number) {
  const lever = new AnimatedSprite(atlasLoader.lever.animations.idle);
  lever.scale.set(2);
  lever.animationSpeed = 0;
  lever.play();
  lever.x = x;
  lever.y = y;
  lever.zIndex = -1;
  lever.onLoop = () => {
    console.log('Loop');
    const lastFrameIndex = lever.totalFrames - 1;
    lever.gotoAndStop(lastFrameIndex);
  };

  camera.addChild(lever);

  app.ticker.add(() => {
    if (isColliding(playerHitbox, lever)) {
      // movePlayer(collisionResponseDirection(playerHitbox, levier));
      lever.animationSpeed = 0.2;
    }
  });
}
