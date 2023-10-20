import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import app from '../pixi/initialize';
import { collisionResponseDirection, isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { movePlayer } from '../player/move';
import { keys } from './key';
import { spikes } from './spike';
import { mapScaling } from '../map/map-draw-layers';

type Lever = AnimatedSprite & { mustBeActivated: boolean};

export function createLever(x: number, y: number, name: string) {
  const lever = new AnimatedSprite(atlasLoader.lever.animations.idle) as Lever;
  lever.scale.set(mapScaling);
  lever.animationSpeed = 0;
  lever.play();
  lever.x = x;
  lever.y = y;
  lever.zIndex = -1;
  lever.name = name;
  lever.mustBeActivated = true;
  lever.onLoop = () => {
    console.log('Loop');
    const lastFrameIndex = lever.totalFrames - 1;
    lever.gotoAndStop(lastFrameIndex);

    // levier1
    setTimeout(() => {
      if (name === 'lever1') {
        const key1 = keys.find((key) => key.name === 'key1')!;
        key1.visible = true;
      }
    }, 135);

    // levier 2, 3 et 4
    if (name === 'lever2' || name === 'lever3' || name === 'lever4') {
      const spikesRoom1 = spikes.filter((spike) => spike.name === 'spikeRoom1');
      for (const spike of spikesRoom1) {
        spike.visible = true;
        spike.play();
      }
    }
  };

  camera.addChild(lever);

  app.ticker.add(() => {
    if (isColliding(playerHitbox, lever) && lever.mustBeActivated) {
      lever.mustBeActivated = false;
      lever.animationSpeed = 0.2;
    }
  });
}
