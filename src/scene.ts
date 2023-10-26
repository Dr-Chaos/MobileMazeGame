import { camera } from './camera';
import { doorsCollisionsGameLoop, initializeDoorsContainers, removeDoorRoomTop } from './map-objects/door';
import { keyGameLoop, keys } from './map-objects/key';
import { levers, leversGameLoop } from './map-objects/lever';
import { skeletons, skeletonsGameLoop } from './map-objects/skeleton';
import { initializeSkulls, skullGameLoop, skulls } from './map-objects/skull';
import { activeSpikes, spikes } from './map-objects/spike';
import { activateSpikesAuto, spikesAuto } from './map-objects/spike-auto';
import { torches } from './map-objects/torch';
import { mapCollision } from './map/map-collisions';
import { initializeMap } from './map/map-layers';
import app from './pixi/initialize';
import { animationsGameLoop, initializePlayerAnimations } from './player/animations/animations';
import { initializeFireball, moveFireball } from './player/fireball';
import { initializeHud } from './player/hud';
import { initializeInventory } from './player/inventory';
import { moveGameLoop } from './player/move';
import { directionHistory } from './player/move-direction';
import { initializePlayer } from './player/player';
import { initializePlayerStats } from './player/stats';
import { clearContainerChildrenRecursively } from './utils/utils';

export const gameLoops: Array<(delta: number) => void> = [];

gameLoops.push(
  moveGameLoop,
  animationsGameLoop,
  moveFireball,
  activeSpikes,
  activateSpikesAuto,
  skeletonsGameLoop,
  leversGameLoop,
  keyGameLoop,
  removeDoorRoomTop,
  doorsCollisionsGameLoop,
  mapCollision,
  skullGameLoop,
);

export function initializeGameLoops() {
  for (const gameLoop of gameLoops) {
    app.ticker.add(gameLoop);
  }
}

export function removeGameLoops() {
  for (const gameLoop of gameLoops) {
    app.ticker.remove(gameLoop);
  }
}

export function clearScene() {
  // ! clear camera containers and game loop
  clearContainerChildrenRecursively(camera);
  // ! clear all game loops (search on all files: ticker.add)
  removeGameLoops();

  // ! clear arrays (search on all files: [] and push)
  skeletons.length = 0;
  keys.length = 0;
  spikesAuto.length = 0;
  spikes.length = 0;
  torches.length = 0;
  levers.length = 0;
  skulls.length = 0;
  directionHistory.x = [];
  directionHistory.y = [];

  // ! PENSEZ EGALEMENT A RESET TOUS LES STATES DES STATES MACHINES
}

export function initializeScene() {
  // ! TRY TO INITIALIZE ONLY ONE FUNCTION, TO SEE IF IT APPEARS
  // ! AND IS TOTALLY INDEPENDENT FROM OTHER CODE
  // initialize the map
  initializeMap();
  initializeSkulls();
  initializeDoorsContainers();
  // initialize player
  initializePlayer();
  initializePlayerAnimations();
  initializeFireball();
  initializePlayerStats();
  initializeInventory();
  // initialize hud
  initializeHud();
  // initialize game loops
  initializeGameLoops();
}
