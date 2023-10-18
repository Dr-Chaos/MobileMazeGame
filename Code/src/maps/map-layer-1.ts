/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { CompositeTilemap } from '@pixi/tilemap';
import map from '../../../Ressources/tiled/map.json';
import app from '../pixi/initialize';
import { mapTexture } from './load-map-tileset';
import { camera } from '../player/camera';

// the tilesets are already sorted
// const sorted = map.tilesets.sort((a, b) => a.firstgid - b.firstgid);
function getTilesetFromTileId(tileId: number) {
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
if (!mapData || !mapWidth || !mapHeight) throw new Error('Missing mapData, mapWidth or mapHeight');
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
    if (!tileset) continue;
    const tilesetName = tileset?.source.replace('.json', '');
    const tileName = `${tilesetName}-${tileId - tileset.firstgid + 1}.png`;

    // const tileName = `map-${tileId}.png`;
    const xPosition = xIteration * map.tilewidth;
    const yPosition = yIteration * map.tileheight;
    tilemap.tile(tileName, xPosition, yPosition);

    totalIterations++;
  }
}

// tilemap settings
tilemap.zIndex = -1;
const scale = 1;
tilemap.width = app.screen.width * scale;
tilemap.height = app.screen.height * scale;
tilemap.pivot.x = (tilemap.width / scale) * 0.5;
tilemap.pivot.y = (tilemap.height / scale) * 0.5;// tilemap.scale.x = 2;
// tilemap.scale.y = 2;

// draw the tilemap
camera.addChild(tilemap);
