import { Container, Sprite } from 'pixi.js';
import { atlasLoader } from '../pixi/atlas-loader';
import app from '../pixi/initialize';
import { camera } from '../camera';
import { mapScaling } from '../map/map-draw-layers';
import { collisionResponseDirection, isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { movePlayer } from '../player/move';
import { getCoordinates } from '../utils/utils';

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
camera.addChild(doorRoomBottom);
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
doorRoomRight.name = 'doorRightRoom';
camera.addChild(doorRoomRight);
export { doorRoomRight };

// DOORS CONTAINERS
const doorsContainers = [
  doorRoomBottom,
  doorRoomRight,
];

// DOORS COLLISIONS
app.ticker.add(() => {
  for (const doorContainer of doorsContainers) {
    const doorContainerCoordinates = getCoordinates(doorContainer);
    // need this line to manage perspectives
    if (doorContainer.name === 'doorRightRoom') doorContainerCoordinates.height = doorContainerCoordinates.height / 2 - 1.7;
    if (doorRoomBottom.visible && isColliding(playerHitbox, doorContainerCoordinates)) {
      movePlayer(collisionResponseDirection(playerHitbox, doorContainerCoordinates));
    }
  }
});
