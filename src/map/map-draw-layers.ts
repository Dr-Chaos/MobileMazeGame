import { CompositeTilemap } from '@pixi/tilemap';
import { Graphics } from 'pixi.js';
import map from '../../tiled/map.json';
import { camera } from '../camera';
import { createKey } from '../map-objects/key';
import { createTorch } from '../map-objects/torch';
import { createSpike } from '../map-objects/spike';
import { createLever } from '../map-objects/lever';
import app from '../pixi/initialize';
import { applyScalingAndOffset } from '../utils/utils';

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

const mapSizeInPixel = {
  width: map.width * map.tilewidth,
  height: map.height * map.tileheight,
};

// NOTE: YOU MUST ALSO SCALE ALL YOU MAP OBJECT BY THIS VALUE
// CETTE VALEUR EST TOTALEMENT INDEPENDENTE DU SCALING DE LA CAMERA
const mapScaling = 1.7;
export { mapScaling };

function drawLayer(layerData: number[], zIndex: number, layerName?: string) {
  const tilemap = new CompositeTilemap();

  let totalIterations = 0;
  for (let yIteration = 0; yIteration < map.height; yIteration++) {
    for (let xIteration = 0; xIteration < map.width; xIteration++) {
      const tileId = layerData[totalIterations];

      // if it's an empty cell (Tiled use id 0 to represent empty cell)
      if (tileId === 0) {
        totalIterations++;
        continue;
      }

      const tilePosition = {
        x: xIteration * map.tilewidth,
        y: yIteration * map.tileheight,
      };

      const tileCentered = applyScalingAndOffset(tilePosition.x, tilePosition.y, mapSizeInPixel.width, mapSizeInPixel.height, mapScaling);
      switch (layerName) {
        case 'decorsmurduhaut':

          createTorch(tileCentered.x, tileCentered.y, zIndex);
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
      if (layerName === 'decorsmurduhaut') console.log(tilePosition);

      totalIterations++;
    }
  }

  // draw the tilemap
  tilemap.zIndex = zIndex;
  tilemap.scale.set(mapScaling);
  const tilemapCentered = applyScalingAndOffset(tilemap.x, tilemap.y, mapSizeInPixel.width, mapSizeInPixel.height, mapScaling);
  tilemap.x = tilemapCentered.x;
  tilemap.y = tilemapCentered.y;
  camera.addChild(tilemap);
}

const layers = map.layers.length;
for (let index = 0; index < layers; index++) {
  // display the literated layer
  const layer = map.layers[index];
  const layerName = layer.name;
  const layerData = layer.data;
  const layerObjects = layer.objects;

  // draw tilemap
  if (layerData) {
  // set mursdubas to index 1 for perspective
    if (layerName === 'mursdubas') {
      drawLayer(layerData, 1);
    } else {
      drawLayer(layerData, -1, layerName);
    }
  }

  // draw objects
  if (!layerObjects) continue;
  for (const layerObject of layerObjects) {
    const objectType = layerObject.type;
    const objectName = layerObject.name;
    // sur l'axe Y nous devons soustraire la hauteur de la tile
    // car tiled positionne la première tile (0,0) en dehors de l'écran, aux lieux de la placer dans la case 1 (première case à l'intérieur de l'écran)
    const tilePosition = { x: layerObject.x, y: layerObject.y - layerObject.height };
    const positionCentered = applyScalingAndOffset(tilePosition.x, tilePosition.y, mapSizeInPixel.width, mapSizeInPixel.height, mapScaling);

    switch (objectType) {
      case 'key':
        if (objectName === 'key1') {
          createKey(positionCentered.x, positionCentered.y, objectName, false);
          continue;
        }

        createKey(positionCentered.x, positionCentered.y, objectName);
        continue;
      case 'spike':
        createSpike(positionCentered.x, positionCentered.y, objectName);
        continue;
      case 'lever':
        createLever(positionCentered.x, positionCentered.y, objectName);
        continue;
      default:
        break;
    }
  }
}
