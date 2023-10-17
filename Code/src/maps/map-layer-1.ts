/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import {
  Assets, type BaseTexture, Graphics, type Texture,
} from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import map from '../../../Ressources/tiled/map.json';
import app from '../pixi/initialize';
import { mapTexture } from './load-map-tileset';

// the tilesets are already sorted
// const sorted = map.tilesets.sort((a, b) => a.firstgid - b.firstgid);
function getTilesetFromTileId(tileId: number) {
  let closestTileset;

  // cherche le tileset qui contiens le tileId
  for (const tileset of map.tilesets) {
    if (tileset.firstgid <= tileId) {
      closestTileset = tileset;
    } else {
      break; // stop when you find the first number greater than needthe tileId.
    }
  }

  return closestTileset;
}

const tilemap = new CompositeTilemap(mapTexture);

// draw map
const mapData = map.layers[2].data;
const mapWidth = map.layers[2].width;
const mapHeight = map.layers[2].height;

let totalIterations = 0;
for (let yIteration = 0; yIteration < mapHeight; yIteration++) {
  for (let xIteration = 0; xIteration < mapWidth; xIteration++) {
    const tileId = mapData[totalIterations];
    // if it's an empty cell (Tiled use id 0 to represent empty cell)
    if (tileId === 0) {
      totalIterations++;
      continue;
    }

    const tileset = getTilesetFromTileId(tileId);
    const tilesetName = tileset?.source.replace('.json', '');
    const tileName = `${tilesetName}-${tileId - tileset?.firstgid}.png`;

    // const tileName = `map-${tileId}.png`;
    const xPosition = xIteration * map.tilewidth;
    const yPosition = yIteration * map.tileheight;
    tilemap.tile(tileName, xPosition, yPosition);

    totalIterations++;
  }
}

// const s = map.tilesets.find((x) => x.firstgid >= r && x.firstgid <= 4);
// console.log(map.tilesets.map((v) => v.firstgid));

// for (const x of map.tilesets) {
//   console.log(x);
// }

// tilemap settings
tilemap.zIndex = -1;
tilemap.width = app.screen.width;
tilemap.height = app.screen.height;

// draw the tilemap
app.stage.addChild(tilemap);
