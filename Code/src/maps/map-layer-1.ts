/* eslint-disable no-continue */
/* eslint-disable no-plusplus */

import {
  Assets, type BaseTexture, Graphics, type Texture,
} from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import map from '../../../Ressources/tiled/map.json';
import app from '../pixi/initialize';
import { mapTexture } from './load-map-tileset';

const tilemap = new CompositeTilemap(mapTexture);
// draw map
const mapData = map.layers[0].data;
const mapWidth = map.layers[0].width;
const mapHeight = map.layers[0].height;
console.log(map.layers[0].name);

let totalIterations = 0;
for (let yIteration = 0; yIteration < mapHeight; yIteration++) {
  for (let xIteration = 0; xIteration < mapWidth; xIteration++) {
    const tileId = mapData[totalIterations];
    // if it's an empty cell (Tiled use id 0 to represent empty cell)
    if (tileId === 0) {
      totalIterations++;
      continue;
    }

    const tileName = `map-${tileId}.png`;
    const xPosition = xIteration * map.tilewidth;
    const yPosition = yIteration * map.tileheight;
    tilemap.tile(tileName, xPosition, yPosition);

    totalIterations++;
  }
}

// tilemap settings
tilemap.zIndex = -1;
tilemap.width = app.screen.width;
tilemap.height = app.screen.height;

// draw the tilemap
app.stage.addChild(tilemap);
