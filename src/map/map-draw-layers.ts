import { CompositeTilemap } from '@pixi/tilemap';
import map from '../../tiled/map-test.json';
import { camera } from '../camera';
import { createKey } from '../map-objects/key';
import { createTorch } from '../map-objects/torch';
import { createSkeleton } from '../map-objects/skeleton';

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

type LayerScale = {
  x: number;
  y: number;
  xOffet: number;
  yOffset: number;
};

const layerScale: LayerScale = {
  x: 2,
  y: 2,
  xOffet: -camera.x - map.width * 7.5,
  yOffset: -camera.y - map.height * 7.5,
};

function getTileScale(position: {x: number; y: number}) {
  return {
    x: position.x * layerScale.x + layerScale.xOffet,
    y: position.y * layerScale.y + layerScale.yOffset,
  };
}

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

      const tileScale = getTileScale(tilePosition);

      switch (layerName) {
        case 'decorsmurduhaut':
          createTorch(tileScale.x, tileScale.y);
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
  tilemap.width *= layerScale.x;
  tilemap.height *= layerScale.y;
  tilemap.x = layerScale.xOffet;
  tilemap.y = layerScale.yOffset;

  // tilemap.x = mapWidth
  camera.addChild(tilemap);
}

type Objects = Array<{
  gid: number;
  height: number;
  id: number;
  name: string;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}>;

function drawObjects(layerObjects: Objects) {
  for (const layerObject of layerObjects) {
    const objectType = layerObject.type;
    // sur l'axe Y nous devons soustraire la hauteur de la tile
    // car tiled positionne la première tile (0,0) en dehors de l'écran, aux lieux de la placer dans la case 1 (première case à l'intérieur de l'écran)
    const tilePosition = getTileScale({ x: layerObject.x, y: layerObject.y - layerObject.height });

    switch (objectType) {
      case 'clefs':
        createKey(tilePosition.x, tilePosition.y);
        continue;
      case 'spike':
        createSkeleton(tilePosition.x, tilePosition.y);
        continue;
      default:
        break;
    }
  }
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

  if (layerObjects) drawObjects(layer.objects);
}
