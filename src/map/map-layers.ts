import { CompositeTilemap } from '@pixi/tilemap';
import map from '../../tiled/map.json';
import { camera } from '../camera';
import { createKey } from '../map-objects/key';
import { createTorch } from '../map-objects/torch';
import { createSpike } from '../map-objects/spike';
import { createLever } from '../map-objects/lever';
import { centerFromPivot, getCoordinates } from '../utils/utils';
import {
  createDoorType1Bottom, createDoorType1Top, createDoorType2, createDoorType3PartLeft, createDoorType3PartRight, doorRoomBottom, doorRoomRight, doorRoomTop,
} from '../map-objects/door';
import { createSkeleton } from '../map-objects/skeleton';
import { createSpikeAuto } from '../map-objects/spike-auto';
import { createBoss } from '../map-objects/boss';

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

      const tileCentered = centerFromPivot(tilePosition.x, tilePosition.y, mapSizeInPixel.width, mapSizeInPixel.height, mapScaling);
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
  const tilemapCentered = centerFromPivot(tilemap.x, tilemap.y, mapSizeInPixel.width, mapSizeInPixel.height, mapScaling);
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
      drawLayer(layerData, -2, layerName);
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
    const positionCentered = centerFromPivot(tilePosition.x, tilePosition.y, mapSizeInPixel.width, mapSizeInPixel.height, mapScaling);

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
      case 'spikeAuto':
        createSpikeAuto(positionCentered.x, positionCentered.y, objectName);
        continue;
      case 'lever':
        createLever(positionCentered.x, positionCentered.y, objectName);
        continue;
      case 'doorType1':
        if (objectName === 'door1PartTop') {
          const door = createDoorType1Top(0, 0);
          doorRoomBottom.addChild(door);
          doorRoomBottom.x = positionCentered.x;
          doorRoomBottom.y = positionCentered.y;
        }

        if (objectName === 'door1PartBottom') {
          const door = createDoorType1Bottom(0, map.tileheight * mapScaling);
          doorRoomBottom.addChild(door);
        }

        continue;
      case 'doorType2':
        if (objectName === 'door2') {
          const door = createDoorType2(0, 0);
          doorRoomRight.addChild(door);
          doorRoomRight.x = positionCentered.x;
          doorRoomRight.y = positionCentered.y;
          doorRoomRight.zIndex = -1;
        }

        continue;
      case 'doorType3':
        if (objectName === 'doorType3PartLeft') {
          const door = createDoorType3PartLeft(0, 0);
          doorRoomTop.addChild(door);
          doorRoomTop.x = positionCentered.x;
          doorRoomTop.y = positionCentered.y;
          doorRoomTop.zIndex = -1;
        }

        if (objectName === 'doorType3PartRight') {
          const door = createDoorType3PartRight(map.tilewidth * mapScaling, 0);
          doorRoomTop.addChild(door);
        }

        continue;
      case 'skeleton':
        createSkeleton(positionCentered.x, positionCentered.y, objectName);
        continue;
      case 'boss':
        // createBoss(positionCentered.x, positionCentered.y);
        continue;
      default:
        break;
    }
  }
}
