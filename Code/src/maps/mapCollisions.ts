/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { Container, Graphics } from 'pixi.js';
import map from '../../../Ressources/tiled/map.json';
import app from '../pixi/initialize';
import { player, playerContainer } from '../player/player';
import { type Collider, isColliding } from '../math/collisions';
import { direction } from '../player/move';

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
app.stage.addChild(mapCollidersDraw);
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

    const tile = {
      x: xIteration * map.tilewidth * mapScaling.width,
      y: yIteration * map.tileheight * mapScaling.height,
      width: map.tilewidth * mapScaling.width,
      height: map.tileheight * mapScaling.height,
    };

    // draw borders
    const borderLeft = new Graphics();
    borderLeft.beginFill('white', 0.5);
    borderLeft.drawRect(tile.x, tile.y, tile.width, tile.height);
    mapCollidersDraw.addChild(borderLeft);
    totalIterations++;
    colliderTiles.push(tile);
  }
}

console.log(mapScaling);

console.log(colliderTiles[0]);

// console.table(tile);
app.ticker.add((delta) => {
  for (const col of colliderTiles) {
    if (isColliding(col, player)) {
      if (direction.x !== 0) playerContainer.x += direction.x < 0 ? 10 * delta : -10 * delta;
      if (direction.y !== 0) playerContainer.y += direction.y < 0 ? 10 * delta : -10 * delta;
    }
  }
});

// tilemap settings
// tilemap.zIndex = -1;
// tilemap.width = app.screen.width;
// tilemap.height = app.screen.height;

// draw the tilemap
// app.stage.addChild(tilemap);
