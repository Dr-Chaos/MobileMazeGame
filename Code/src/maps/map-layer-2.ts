/* eslint-disable no-continue */

import {
  Assets, type BaseTexture, Graphics, type Texture,
} from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import map from '../../../Ressources/tiled/map.json';
import app from '../pixi/initialize';
import { mapTexture } from './load-map-tileset';

const x = await Assets.load('/map/map.json');
const tilemap2 = new CompositeTilemap(x);

// draw map
const mapData = map.layers[1].data;
const mapWidth = map.layers[1].width;
const mapHeight = map.layers[1].height;
console.log(map.layers[1].name);

let totalIterations = 0;
for (let yIteration = 0; yIteration < mapHeight; yIteration++) {
  for (let xIteration = 0; xIteration < mapWidth; xIteration++) {
    const tileId = mapData[totalIterations];
    // if it's an empty cell (Tiled use id 0 to represent empty cell)
    if (tileId === 0) {
      totalIterations++;
      continue;
    }

    const tileName = `/map/map-${tileId}.png`;
    const xPosition = xIteration * map.tilewidth;
    const yPosition = yIteration * map.tileheight;
    tilemap2.tile(tileName, xPosition, yPosition);

    totalIterations++;
  }
}

// tilemap settings
tilemap2.zIndex = -1;
tilemap2.width = app.screen.width;
tilemap2.height = app.screen.height;

tilemap2.zIndex = -1;
tilemap2.width = app.screen.width * 1;
tilemap2.height = app.screen.height * 1;
// draw the tilemap
app.stage.addChild(tilemap2);
