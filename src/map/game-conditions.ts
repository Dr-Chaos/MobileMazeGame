export const gameConditions = {
  skeletonToKillToOpenDoor2: 0,
  keysToOpenTopRoom: 0,
  leverToAttackTheBoss: 0,
};

export function initializeGameConditions() {
  gameConditions.skeletonToKillToOpenDoor2 = 5;
  gameConditions.keysToOpenTopRoom = 3;
  gameConditions.leverToAttackTheBoss = 2;
}
