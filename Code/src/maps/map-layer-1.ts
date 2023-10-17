import {
  Assets, type BaseTexture, Graphics, type Texture,
} from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import map from '../../../Ressources/tiled/map.json';
import app from '../pixi/initialize';
import { mapTexture } from './load-map-tileset';

const sorted = map.tilesets.sort((a, b) => a.firstgid - b.firstgid);
function searchTileset(needle: number) {
  let closestTileset;

  for (const tileset of sorted) {
    if (tileset.firstgid <= needle) {
      closestTileset = tileset;
    } else {
      break; // Stop when you find the first number greater than needle.
    }
  }

  return closestTileset;
}

function getTilePrefix(tileId: number) {
  if (tileId >= 1 && tileId < 101) return { file: 'map-tileset', firstgrid: 1 };
  if (tileId >= 101 && tileId < 104) return { file: 'levier', firstgrid: 101 };
  if (tileId >= 104 && tileId < 110) return { file: 'spike', firstgrid: 104 };
  if (tileId >= 110 && tileId < 118) return { file: 'key', firstgrid: 110 };
  if (tileId >= 118 && tileId < 126) return { file: 'torch', firstgrid: 118 };
  if (tileId >= 126 && tileId < 130) return { file: 'boss', firstgrid: 126 };
  if (tileId >= 130 && tileId < 134) return { file: 'skull', firstgrid: 130 };
  if (tileId >= 134) return { file: 'skeleton', firstgrid: 134 };
}

const tilemap = new CompositeTilemap(mapTexture);
// draw map
const layer = 0;
const mapData = map.layers[layer].data;
const mapWidth = map.layers[layer].width;
const mapHeight = map.layers[layer].height;

let totalIterations = 0;
for (let yIteration = 0; yIteration < mapHeight; yIteration++) {
  for (let xIteration = 0; xIteration < mapWidth; xIteration++) {
    const tileId = mapData[totalIterations];
    // if it's an empty cell (Tiled use id 0 to represent empty cell)
    if (tileId === 0) {
      totalIterations++;
      continue;
    }

    // const prefix = getTilePrefix(tileId);
    // const tileName = `${prefix?.file}-${tileId - prefix?.firstgrid + 1}.png`; // resulat torxh-N.png , nom

    const file = searchTileset(tileId);
    const prefix = file?.source.replace('.json', '');
    const tileName = `${prefix}-${tileId - file?.firstgid + 1}.png`;

    const xPosition = xIteration * map.tilewidth;
    const yPosition = yIteration * map.tileheight;
    tilemap.tile(tileName, xPosition, yPosition);

    totalIterations++;
  }
}

// tilemap settings
tilemap.zIndex = -1;
tilemap.width = app.screen.width * 1;
tilemap.height = app.screen.height * 1;

app.stage.addChild(tilemap);
