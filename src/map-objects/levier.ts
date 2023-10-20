import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import app from '../pixi/initialize';
import { collisionResponseDirection, isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { movePlayer } from '../player/move';

export function createLevier(x: number, y: number) {
  const levier = new AnimatedSprite(atlasLoader.levier.animations.idle);
  levier.scale.set(2);
  levier.animationSpeed = 0;
  levier.play();
  levier.x = x;
  levier.y = y;
  levier.zIndex = -1;
  levier.onLoop = () => {
    console.log('Loop');
    const lastFrameIndex = levier.totalFrames - 1;
    levier.gotoAndStop(lastFrameIndex);
  };

  camera.addChild(levier);

  app.ticker.add(() => {
    if (isColliding(playerHitbox, levier)) {
      // movePlayer(collisionResponseDirection(playerHitbox, levier));
      levier.animationSpeed = 0.2;
    }
  });
}
