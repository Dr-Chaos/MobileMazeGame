/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { Container, Graphics } from 'pixi.js';
import map from '../../../Ressources/tiled/mapcollision2.json';
import app from '../pixi/initialize';
import { type Collider, isColliding } from '../math/collisions';
import { direction } from '../player/move';
import { player, playerContainer } from '../player/player';

// draw map
const mapData = map.layers[0].data;
const mapWidth = map.layers[0].width;
const mapHeight = map.layers[0].height;
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
    // Si c'est une cellule vide, passez à la tuile suivante.
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

    colliderTiles.push(tile);

    const borderTile = new Graphics();
    borderTile.beginFill('white', 0.5);
    borderTile.drawRect(tile.x, tile.y, tile.width, tile.height);
    mapCollidersDraw.addChild(borderTile);

    totalIterations++;
  }
}

app.ticker.add((delta) => {
  for (const col of colliderTiles) {
    if (isColliding(col, player)) {
      if (direction.x !== 0) playerContainer.x += direction.x < 0 ? 1 * delta : -1 * delta;
      if (direction.y !== 0) playerContainer.y += direction.y < 0 ? 1 * delta : -1 * delta;
    }
  }
});
mapCollidersDraw.width = map.width * 3;
mapCollidersDraw.height = map.height * 3;
mapCollidersDraw.zIndex = -1;
