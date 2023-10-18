/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { CompositeTilemap } from '@pixi/tilemap';
import map from '../../../Ressources/tiled/map.json';
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

function drawLayer(layer: number, zIndex: number) {
  const tilemap = new CompositeTilemap(mapTexture);

  // draw map
  const mapData = map.layers[layer].data;
  const mapWidth = map.layers[layer].width;
  const mapHeight = map.layers[layer].height;
  if (!mapWidth || !mapHeight || !mapData) return;
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
  tilemap.zIndex = zIndex;
  // const scale = 1; // 2.5s
  // tilemap.width *= mapWidth / 22.6;
  // tilemap.height *= mapHeight / 24.3;

  tilemap.width *= 2;
  tilemap.height *= 2;

  // tilemap.height = app.screen.height * scale;
  // tilemap.pivot.x = (tilemap.width / scale) * 0.5;
  // tilemap.pivot.y = (tilemap.height / scale) * 0.5;

  // tilemap.width = 2;
  // tilemap.height = 2;
  // tilemap.height = app.screen.height;
  // tilemap.pivot.x = (mapWidth) * 0.5;
  // tilemap.pivot.y = (mapHeight) * 0.5;
  tilemap.x = -camera.x - mapWidth * 7.5;
  tilemap.y = -camera.y - mapHeight * 7.5;

  // draw the tilemap
  camera.addChild(tilemap);
}

const layers = map.layers.length;
let mursDuBasLayerIndex = 0;
for (let index = 0; index < layers; index++) {
  // skip mursdubas for perspective
  if (map.layers[index].name === 'mursdubas') {
    mursDuBasLayerIndex = index;
    continue;
  }

  drawLayer(index, -1);
}

drawLayer(mursDuBasLayerIndex, 1);
