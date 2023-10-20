/* eslint-disable no-continue */

import { CompositeTilemap } from '@pixi/tilemap';
import { Container } from 'pixi.js';
import map from '../../tiled/map.json';
import { loadedAtlas } from '../pixi/loaded-atlas';
import { camera } from '../camera';
import { createKey, keysContainer } from '../map-objects/key';

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
  const tilemap = new CompositeTilemap(loadedAtlas);

  // draw map
  const mapData = map.layers[layer].data;
  const mapWidth = map.layers[layer].width;
  const mapHeight = map.layers[layer].height;
  if (!mapWidth || !mapHeight || !mapData) return;
  let totalIterations = 0;
  const scale = {
    x: 2,
    y: 2,
    xOffet: -camera.x - mapWidth * 7.5,
    yOffset: -camera.y - mapHeight * 7.5,
  };
  for (let yIteration = 0; yIteration < mapHeight; yIteration++) {
    for (let xIteration = 0; xIteration < mapWidth; xIteration++) {
      const tileId = mapData[totalIterations];
      // if it's an empty cell (Tiled use id 0 to represent empty cell)
      if (tileId === 0) {
        totalIterations++;
        continue;
      }

      if (layerName === 'clefs') {
        const positions = {
          x: xIteration * map.tilewidth * scale.x + scale.xOffet,
          y: yIteration * map.tileheight * scale.y + scale.yOffset,
        };
        createKey(positions.x, positions.y);
        totalIterations++;
        continue;
      }

      // add the tile to the tilemap container
      const tileset = getTilesetFromTileId(tileId);
      if (!tileset) continue;
      const tilesetName = tileset.source.replace('.json', '');
      const tileName = `${tilesetName}-${tileId - tileset.firstgid + 1}.png`;
      const xPosition = xIteration * map.tilewidth;
      const yPosition = yIteration * map.tileheight;
      tilemap.tile(tileName, xPosition, yPosition);

      totalIterations++;
    }
  }

  // draw the tilemap
  tilemap.zIndex = zIndex;
  tilemap.width *= scale.x;
  tilemap.height *= scale.y;
  // tilemap.x = -camera.x - mapWidth * 7.5;
  // tilemap.y = -camera.y - mapHeight * 7.5;
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
