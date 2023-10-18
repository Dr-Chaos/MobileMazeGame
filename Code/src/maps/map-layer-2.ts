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
const layer = 1;
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

    const tileset = getTilesetFromTileId(tileId);
    const tilesetName = tileset?.source.replace('.json', '');
    const tileName = `${tilesetName}-${tileId - tileset?.firstgid + 1}.png`;

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
