/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { Container, Graphics } from 'pixi.js';
import map from '../../../Ressources/tiled/map.json';

import mapCollisions from '../../../Ressources/tiled/map-collision.json';
import app from '../pixi/initialize';
import { playerContainer, playerHitbox } from '../player/player';
import { type Collider, isColliding } from '../math/collisions';
import { camera } from '../player/camera';
import { direction } from '../player/move';

// draw map
const mapData = mapCollisions.layers[0].data;
const mapWidth = mapCollisions.layers[0].width;
const mapHeight = mapCollisions.layers[0].height;
let totalIterations = 0;
const colliderTiles: Collider[] = [];
const mapCollidersDraw = new Container();
mapCollidersDraw.name = 'mapCollidersDraw';
mapCollidersDraw.width = app.screen.width;
mapCollidersDraw.height = app.screen.height;
mapCollidersDraw.zIndex = 2;
camera.addChild(mapCollidersDraw);
// scaling = 500 / 16 * 100
// const mapScaling = {
//   width: app.screen.width / mapCollisions.tilewidth / mapCollisions.width,
//   height: app.screen.height / mapCollisions.tileheight / mapCollisions.width,
// };
for (let yIteration = 0; yIteration < mapHeight; yIteration++) {
  for (let xIteration = 0; xIteration < mapWidth; xIteration++) {
    const tileId = mapData[totalIterations];
    // if it's an empty cell (Tiled use id 0 to represent empty cell)
    if (tileId === 0) {
      totalIterations++;
      continue;
    }

    const tile = {
      x: xIteration * map.tilewidth - camera.x - mapCollisions.width * 3.735,
      y: yIteration * map.tileheight - camera.y - mapCollisions.height * 3.7,
      width: map.tilewidth,
      height: map.tileheight,
    };

    // draw borders
    const mapColliderDraw = new Graphics();
    mapColliderDraw.beginFill('white', 0.5);
    // set x and y, then set 0,0 to drawRect
    // borderLeft.x = tile.x;
    // borderLeft.y = tile.y;
    // or directly set x and y in drawRect
    mapColliderDraw.drawRect(tile.x, tile.y, tile.width, tile.height);
    mapCollidersDraw.addChild(mapColliderDraw);
    totalIterations++;
    colliderTiles.push(tile);
  }
}

// console.table(tile);
app.ticker.add((delta) => {
  for (const col of colliderTiles) {
    if (isColliding(col, playerHitbox)) {
      console.log('Collising with wall');

      // if (direction.x !== 0) playerContainer.x += direction.x < 0 ? 2 * delta : -2 * delta;
      // if (direction.y !== 0) playerContainer.y += direction.y < 0 ? 2 * delta : -2 * delta;
    }
  }
});
