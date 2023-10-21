import { Container, Sprite } from 'pixi.js';
import { atlasLoader } from '../pixi/atlas-loader';
import app from '../pixi/initialize';
import { camera } from '../camera';
import { mapScaling } from '../map/map-draw-layers';
import { collisionResponseDirection, isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { movePlayer } from '../player/move';

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

app.ticker.add(() => {
  if (doorRoomBottom.visible && isColliding(playerHitbox, doorRoomBottom)) {
    movePlayer(collisionResponseDirection(playerHitbox, doorRoomBottom));
  }
});

// deprecated, example to create a door
export function doorExample() {
  const door = new Container();
  const doorPartTop = new Sprite(atlasLoader.map.textures['map-tileset-47.png']);
  const doorPartBottom = new Sprite(atlasLoader.map.textures['map-tileset-57.png']);
  doorPartBottom.y += doorPartTop.height;
  camera.addChild(door);
  door.addChild(doorPartTop);
  door.addChild(doorPartBottom);
}

export { doorRoomBottom };
