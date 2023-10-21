import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';

import { atlasLoader } from '../pixi/atlas-loader';
import { mapScaling } from '../map/map-layers';
import { mapCondition } from '../map/map-conditions';
import { doorRoomBottom, doorRoomRight, doorsContainers } from './door';

type Skeleton = AnimatedSprite & { life: number; damage: number };
let skeletons: Skeleton[] = [];

export function createSkeleton(x: number, y: number, name: string) {
  const skeleton: Skeleton = new AnimatedSprite(atlasLoader.skeleton.animations.idle) as Skeleton;
  skeleton.scale.set(mapScaling);
  skeleton.animationSpeed = 0.13;
  skeleton.play();
  skeleton.x = x;
  skeleton.y = y;
  camera.addChild(skeleton);
  skeleton.life = 5;
  skeleton.damage = 1;
  skeleton.name = name;
  skeletons.push(skeleton);
}

app.ticker.add(() => {
  for (const skeleton of skeletons) {
    if (!isColliding(skeleton, playerHitbox)) continue;
    skeleton.life -= 1;
    if (skeleton.life > 0) continue;
    camera.removeChild(skeleton);
    skeletons = skeletons.filter((itaratedSkeleton) => itaratedSkeleton !== skeleton);
    // if it's skeleton form room 2
    if (skeleton.name === 'skeletonRoomRight' && mapCondition.skeletonToKillToOpenDoor2 > 0) {
      mapCondition.skeletonToKillToOpenDoor2 -= 1;
      if (mapCondition.skeletonToKillToOpenDoor2 > 0) continue;
      // disable the room2 door
      camera.removeChild(doorRoomRight);
      doorsContainers.list = doorsContainers.list.filter((doorContainer) => doorContainer !== doorRoomRight);
      console.log(doorsContainers);
    }
  }
});

export { skeletons };
