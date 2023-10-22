import { AnimatedSprite, Graphics } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';

import { atlasLoader } from '../pixi/atlas-loader';
import { mapScaling } from '../map/map-layers';
import { mapCondition } from '../map/game-conditions';
import { doorRoomBottom, doorRoomRight, doorsContainers } from './door';
import { centerFromPivot, centerIfPivotIsUpperLeft } from '../utils/utils';

type SkeletonContainer = {
  sprite: AnimatedSprite;
  playerDetectionZone: Graphics;
};

type Skeleton = {
  container: SkeletonContainer;
  life: number;
  name: string;
  damage: number;
};

const skeletons: Skeleton[] = [];

export function createSkeleton(x: number, y: number, name: string) {
  const skeleton = new AnimatedSprite(atlasLoader.skeleton.animations.idle);
  skeleton.scale.set(mapScaling);
  skeleton.animationSpeed = 0.13;
  skeleton.play();
  skeleton.x = x;
  skeleton.y = y;
  camera.addChild(skeleton);

  const playerDetectionDraw = new Graphics();
  playerDetectionDraw.beginFill('white', 0.5);
  const playerDetection = centerIfPivotIsUpperLeft(
    {
      x: skeleton.x,
      y: skeleton.y,
      width: skeleton.width,
      height: skeleton.height,
    },
    5.5,
  );
  playerDetectionDraw.x = playerDetection.x;
  playerDetectionDraw.y = playerDetection.y;
  playerDetectionDraw.drawRect(0, 0, playerDetection.width, playerDetection.height);
  playerDetectionDraw.visible = false; // dispaly or hide the player detection zone
  camera.addChild(playerDetectionDraw);

  skeletons.push({
    container: {
      sprite: skeleton,
      playerDetectionZone: playerDetectionDraw,
    },
    life: 5,
    damage: 1,
    name,
  });
}

function moveSkeletonToPlayer(skeleton: Skeleton) {
  const playerX = playerHitbox.x;
  const playerY = playerHitbox.y;

  const directionX = playerX - skeleton.container.sprite.x;
  const directionY = playerY - skeleton.container.sprite.y;

  const distance = Math.hypot(directionX, directionY);

  const normalizedDirectionX = directionX / distance;
  const normalizedDirectionY = directionY / distance;

  const speed = 1;
  skeleton.container.sprite.x += normalizedDirectionX * speed;
  skeleton.container.sprite.y += normalizedDirectionY * speed;
  skeleton.container.playerDetectionZone.position.x += normalizedDirectionX * speed;
  skeleton.container.playerDetectionZone.position.y += normalizedDirectionY * speed;
}

app.ticker.add(() => {
  for (const skeleton of skeletons) {
    //     // if (skeleton.name === 'special') {
    //     //   // moveSkeletonToPlayer(skeleton);
    //     //   continue;
    //     // }

    if (isColliding(playerHitbox, skeleton.container.playerDetectionZone)) {
      console.log('Detection');
      moveSkeletonToPlayer(skeleton);
      continue;
    }

    //     moveSkeletonToPlayer(skeleton);
    //     if (isColliding(skeleton.container.sprite, playerHitbox)) continue;
    //     skeleton.life -= 1;
    //     if (skeleton.life > 0) continue;
    //     camera.removeChild(skeleton.container.sprite);
    //     camera.removeChild(skeleton.container.playerDetectionZone);
    //     skeletons = skeletons.filter((itaratedSkeleton) => itaratedSkeleton !== skeleton);
    //     // if it's skeleton form room 2
    //     if (skeleton.name === 'skeletonRoomRight' && mapCondition.skeletonToKillToOpenDoor2 > 0) {
    //       mapCondition.skeletonToKillToOpenDoor2 -= 1;
    //       if (mapCondition.skeletonToKillToOpenDoor2 > 0) continue;
    //       // disable the room2 door
    //       camera.removeChild(doorRoomRight);
    //       doorsContainers.list = doorsContainers.list.filter((doorContainer) => doorContainer !== doorRoomRight);
    //       console.log(doorsContainers);
    //     }
  }
});

export { skeletons };
