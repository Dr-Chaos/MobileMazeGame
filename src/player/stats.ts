const playerStats = {
  life: 0,
  speed: 0,
  canReceiveDamageFromSpike: true,
};

export function initializePlayerStats() {
  playerStats.life = 5;
  playerStats.speed = 2;
  playerStats.canReceiveDamageFromSpike = true;
}

export { playerStats };
