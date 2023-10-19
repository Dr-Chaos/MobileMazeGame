import { Sprite, Graphics, Application } from 'pixi.js';

export type Collider = { x: number; y: number; width: number; height: number };

export function isColliding(object1: Collider, object2: Collider): boolean {
  return (
    object1.x < object2.x + object2.width
    && object1.x + object1.width > object2.x
    && object1.y < object2.y + object2.height
    && object1.y + object1.height > object2.y
  );
}

// const gameMapWidth = 480;
// const gameMapHeight = 480;
// const gameTileWidth = 16;
// const gameTileHeight = 16;
// const collisionTileWidth = 8;
// const collisionTileHeight = 8;

// const colliderTiles: Collider[] = [];

// const collisionMapData = 'C:\Users\Nicolas\Desktop\MobileMazeGame\code\public\map\MapCollisionV2.json';

// for (let yIteration = 0; yIteration < gameMapHeight / collisionTileHeight; yIteration++) {
//   for (let xIteration = 0; xIteration < gameMapWidth / collisionTileWidth; xIteration++) {
//     const tileId = collisionMapData[yIteration][xIteration];

//     if (tileId === 0) {
//       continue;
//     }

//     const tile: Collider = {
//       x: xIteration * collisionTileWidth,
//       y: yIteration * collisionTileHeight,
//       width: collisionTileWidth,
//       height: collisionTileHeight,
//     };

//     colliderTiles.push(tile);
//   }
// }

// app.ticker.add((delta) => {
//   for (const col of colliderTiles) {
//     if (isColliding(player, col)) {
//       if (deltaX > 0) {
//         player.x = col.x - player.width;
//       } else if (deltaX < 0) {
//         player.x = col.x + col.width;
//       }

//       if (deltaY > 0) {
//         player.y = col.y - player.height;
//       } else if (deltaY < 0) {
//         player.y = col.y + col.height;
//       }
//     }
//   }
// });
