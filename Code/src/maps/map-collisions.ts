/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { Container, Graphics } from 'pixi.js';
import map from '../../../Ressources/tiled/map.json';
import app from '../pixi/initialize';
import { playerContainer, playerHitbox } from '../player/player';
import { type Collider, isColliding } from '../math/collisions';
import { direction } from '../player/move';
import { camera } from '../player/camera';

// draw map
const mapData = map.layers[1].data;
const mapWidth = map.layers[1].width;
const mapHeight = map.layers[1].height;
let totalIterations = 0;
const colliderTiles: Collider[] = [];
const mapCollidersDraw = new Container();
mapCollidersDraw.name = 'mapCollidersDraw';
mapCollidersDraw.width = app.screen.width;
mapCollidersDraw.height = app.screen.height;
camera.addChild(mapCollidersDraw);
// scaling = 500 / 16 * 100
const mapScaling = {
  width: app.screen.width / map.tilewidth / map.width,
  height: app.screen.height / map.tileheight / map.width,
};
for (let yIteration = 0; yIteration < mapHeight; yIteration++) {
  for (let xIteration = 0; xIteration < mapWidth; xIteration++) {
    const tileId = mapData[totalIterations];
    // if it's an empty cell (Tiled use id 0 to represent empty cell)
    if (tileId === 0) {
      totalIterations++;
      continue;
    }

    // const tile = {
    //   x: xIteration * map.tilewidth * mapScaling.width,
    //   y: yIteration * map.tileheight * mapScaling.height,
    //   width: map.tilewidth * mapScaling.width,
    //   height: map.tileheight * mapScaling.height,
    // };

    const tile = {
      x: -100,
      y: -100,
      width: 100,
      height: 100,
    };
    // draw borders
    const borderLeft = new Graphics();
    borderLeft.beginFill('white', 0.5);
    borderLeft.drawRect(xIteration * map.tilewidth - camera.x, yIteration * map.tileheight - camera.y, 16, 16);
    mapCollidersDraw.addChild(borderLeft);
    totalIterations++;
    colliderTiles.push(tile);
  }
}

// console.table(tile);
app.ticker.add((delta) => {
  for (const col of colliderTiles) {
    if (isColliding(col, playerHitbox)) {
      if (direction.x !== 0) playerContainer.x += direction.x < 0 ? 10 * delta : -10 * delta;
      if (direction.y !== 0) playerContainer.y += direction.y < 0 ? 10 * delta : -10 * delta;
    }
  }
});
