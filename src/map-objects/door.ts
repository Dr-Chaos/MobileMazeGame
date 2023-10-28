import { Container, Sprite } from 'pixi.js';
import { atlasLoader } from '../pixi/atlas-loader';
import app from '../pixi/initialize';
import { camera } from '../camera';
import { mapScaling } from '../map/map-layers';
import { collisionResponseDirection, isColliding } from '../math/collisions';
import { player } from '../player/player';
import { movePlayer } from '../player/move';
import { getCoordinates } from '../utils/utils';
import { gameConditions } from '../map/game-conditions';
import { inventory } from '../player/inventory';

// DEMO TO CREATE DOOR IN MULTIPLE PARTS
export function doorExample() {
  const door = new Container();
  const doorPartTop = new Sprite(atlasLoader.map.textures['map-tileset-47.png']);
  const doorPartBottom = new Sprite(atlasLoader.map.textures['map-tileset-57.png']);
  doorPartBottom.y += doorPartTop.height;
  camera.addChild(door);
  door.addChild(doorPartTop);
  door.addChild(doorPartBottom);
}

// DOOR ROOM BOTTOM
export function createDoorType1Top(x: number, y: number) {
  const doorPartTop = new Sprite(atlasLoader.map.textures['map-tileset-47.png']);
  doorPartTop.scale.set(mapScaling);
  doorPartTop.x = x;
  doorPartTop.y = y;
  return doorPartTop;
}

export function createDoorType1Bottom(x: number, y: number) {
  const doorPartTop = new Sprite(atlasLoader.map.textures['map-tileset-57.png']);
  doorPartTop.scale.set(mapScaling);
  doorPartTop.x = x;
  doorPartTop.y = y;
  return doorPartTop;
}

const doorRoomBottom = new Container();
export { doorRoomBottom };

// DOOR ROOM RIGHT
export function createDoorType2(x: number, y: number) {
  const doorType2 = new Sprite(atlasLoader.map.textures['map-tileset-38.png']);
  doorType2.scale.set(mapScaling);
  doorType2.x = x;
  doorType2.y = y;
  return doorType2;
}

const doorRoomRight = new Container();
doorRoomRight.name = 'doorRoomRIght';
export { doorRoomRight };

// DOOR ROOM TOP
export function createDoorType3PartLeft(x: number, y: number) {
  const doorType3PartLeft = new Sprite(atlasLoader.map.textures['map-tileset-67.png']);
  doorType3PartLeft.scale.set(mapScaling);
  doorType3PartLeft.x = x;
  doorType3PartLeft.y = y;
  return doorType3PartLeft;
}

export function createDoorType3PartRight(x: number, y: number) {
  const doorType3PartRight = new Sprite(atlasLoader.map.textures['map-tileset-68.png']);
  doorType3PartRight.scale.set(mapScaling);
  doorType3PartRight.x = x;
  doorType3PartRight.y = y;
  return doorType3PartRight;
}

const doorRoomTop = new Container();
doorRoomTop.name = 'doorRoomTop';
export { doorRoomTop };

// DOORS CONTAINERS
export const doorsContainers: { list: Container[] } = {
  list: [],
};

// DOORS COLLISIONS
export function doorsCollisionsGameLoop(delta: number) {
  for (const doorContainer of doorsContainers.list) {
    const doorContainerCoordinates = getCoordinates(doorContainer);
    // need this lines to manage perspectives
    if (doorContainer.name === 'doorRoomRIght' || doorContainer.name === 'doorRoomTop') {
      doorContainerCoordinates.height = doorContainerCoordinates.height / 2 - 1.7;
    }

    if (isColliding(player.hitbox, doorContainerCoordinates)) {
      movePlayer(collisionResponseDirection(player.hitbox, doorContainerCoordinates), delta);
    }
  }
}

// OPEN DOOR ROOM TOP
export function removeDoorRoomTop() {
  // supprimer la porte de la camera
  // supprimer la porte du tableau
  // supprimer cette fonction de la game loop
  // si clés === 3
  if (inventory.keys !== gameConditions.keysToOpenTopRoom) return;
  console.log('remove');

  camera.removeChild(doorRoomTop);
  doorsContainers.list = doorsContainers.list.filter((doorContainer) => doorContainer !== doorRoomTop);
  app.ticker.remove(removeDoorRoomTop);
}

export function initializeDoorsContainers() {
  doorsContainers.list = [
    doorRoomBottom,
    doorRoomRight,
    doorRoomTop,
  ];
  camera.addChild(doorRoomTop);
  camera.addChild(doorRoomRight);
  camera.addChild(doorRoomBottom);
}
