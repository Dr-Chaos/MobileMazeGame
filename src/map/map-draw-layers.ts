/* eslint-disable no-continue */

import { CompositeTilemap } from '@pixi/tilemap';
import map from '../../tiled/map.json';
import { camera } from '../camera';
import { createKey } from '../map-objects/key';
import { createTorch } from '../map-objects/torch';

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

function drawLayer(layer: number, zIndex: number, layerName?: string) {
  const tilemap = new CompositeTilemap();

  // draw map
  const mapData = map.layers[layer].data;
  const mapWidth = map.layers[layer].width;
  const mapHeight = map.layers[layer].height;
  if (!mapWidth || !mapHeight || !mapData) return;

  const scale = {
    x: 2,
    y: 2,
    xOffet: -camera.x - mapWidth * 7.5,
    yOffset: -camera.y - mapHeight * 7.5,
  };

  let totalIterations = 0;
  for (let yIteration = 0; yIteration < mapHeight; yIteration++) {
    for (let xIteration = 0; xIteration < mapWidth; xIteration++) {
      const tileId = mapData[totalIterations];

      // if it's an empty cell (Tiled use id 0 to represent empty cell)
      if (tileId === 0) {
        totalIterations++;
        continue;
      }

      const tilePosition = {
        x: xIteration * map.tilewidth,
        y: yIteration * map.tileheight,
      };

      // only used to place map objects (torches, enemies, keys, ets)
      const objectPosition = {
        x: tilePosition.x * scale.x + scale.xOffet,
        y: tilePosition.y * scale.y + scale.yOffset,
      };

      switch (layerName) {
        case 'clefs':
          createKey(objectPosition.x, objectPosition.y);
          totalIterations++;
          continue;
        case 'decorsmurduhaut':
          createTorch(objectPosition.x, objectPosition.y);
          totalIterations++;
          continue;
        default:
          break;
      }

      // add the tile to the tilemap container
      const tileset = getTilesetFromTileId(tileId);
      if (!tileset) continue;
      const tilesetName = tileset.source.replace('.json', '');
      const tileName = `${tilesetName}-${tileId - tileset.firstgid + 1}.png`;
      tilemap.tile(tileName, tilePosition.x, tilePosition.y);

      totalIterations++;
    }
  }

  // draw the tilemap
  tilemap.zIndex = zIndex;
  tilemap.width *= scale.x;
  tilemap.height *= scale.y;
  tilemap.x = scale.xOffet;
  tilemap.y = scale.yOffset;

  // tilemap.x = mapWidth
  camera.addChild(tilemap);
}

const layers = map.layers.length;
for (let index = 0; index < layers; index++) {
  // set mursdubas to index 1 for perspective
  const layerName = map.layers[index].name;
  if (layerName === 'mursdubas') {
    drawLayer(index, 1);
    continue;
  }

  drawLayer(index, -1, layerName);
}
