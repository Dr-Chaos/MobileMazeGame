import { Container, Graphics } from 'pixi.js';
import map from '../../tiled/map-collisions.json';
import app from '../pixi/initialize';
import { player } from '../player/player';
import { type Collider, isColliding, collisionResponseDirection } from '../math/collisions';
import { movePlayer } from '../player/move';
import { centerFromPivot } from '../utils/utils';
import { mapScaling } from './map-layers';
import { moveSkeleton, skeletons } from '../map-objects/skeleton';
import { camera } from '../camera';

// draw map
const mapData = map.layers[0].data;
const mapWidth = map.layers[0].width;
const mapHeight = map.layers[0].height;
let totalIterations = 0;
const colliderTiles: Collider[] = [];
const mapCollidersDraw = new Container();
mapCollidersDraw.name = 'mapCollidersDraw';
mapCollidersDraw.width = app.screen.width;
mapCollidersDraw.height = app.screen.height;
mapCollidersDraw.zIndex = 2;
// camera.addChild(mapCollidersDraw); // ! DRAW HITBOXES DURING DEV
const mapSizeInPixel = {
  width: map.width * map.tilewidth,
  height: map.height * map.tileheight,
};
for (let yIteration = 0; yIteration < mapHeight; yIteration++) {
  for (let xIteration = 0; xIteration < mapWidth; xIteration++) {
    const tileId = mapData[totalIterations];
    // if it's an empty cell (Tiled use id 0 to represent empty cell)
    if (tileId === 0) {
      totalIterations++;
      continue;
    }

    const tile = {
      x: xIteration * map.tilewidth,
      y: yIteration * map.tileheight,
      width: map.tilewidth * mapScaling,
      height: map.tileheight * mapScaling,
    };

    const tilePosition = centerFromPivot({
      x: tile.x, y: tile.y, width: mapSizeInPixel.width, height: mapSizeInPixel.height,
    }, mapScaling);

    const tilePositionned = {
      x: tilePosition.x,
      y: tilePosition.y,
      width: tile.width,
      height: tile.height,
    };

    // draw borders
    const mapColliderDraw = new Graphics();
    mapColliderDraw.beginFill('white', 0.5);
    // set x and y, then set 0,0 to drawRect
    // borderLeft.x = tile.x;
    // borderLeft.y = tile.y;
    // or directly set x and y in drawRect
    mapColliderDraw.drawRect(tilePositionned.x, tilePositionned.y, tilePositionned.width, tilePositionned.height);
    mapCollidersDraw.addChild(mapColliderDraw);
    totalIterations++;
    colliderTiles.push(tilePositionned);
  }
}

// console.table(tile);
export function mapCollision() {
  for (const tile of colliderTiles) {
    // collision with the player
    if (isColliding(tile, player.hitbox)) {
      movePlayer(collisionResponseDirection(player.hitbox, tile), 1);
    }

    // collision with skeletons
    for (const skeletonObject of skeletons) {
      const skeletonSprite = skeletonObject.container.sprite;
      if (isColliding(tile, skeletonSprite)) {
        console.log('Collision');

        // Sauvegardez la position précédente.
        const previousX = skeletonSprite.x;
        const previousY = skeletonSprite.y;

        // Calculez l'ajustement nécessaire pour éviter la collision.
        const collisionAdjustment = collisionResponseDirection(skeletonSprite, tile);

        // Ajustez la position du squelette en fonction de la collision.
        moveSkeleton(skeletonObject, collisionAdjustment.x, collisionAdjustment.y, 1);

        // Si le squelette est toujours en collision après l'ajustement, réinitialisez à la position précédente.
        if (isColliding(tile, skeletonSprite)) {
          moveSkeleton(skeletonObject, previousX, previousY, 1);
        }
      }
    }
  }
}
