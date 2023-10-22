import { gameConditions } from '../map/game-conditions';
import app from '../pixi/initialize';

function spawnBoss() {
  if (gameConditions.leverToAttackTheBoss > 0) return;
  app.ticker.remove(spawnBoss);
  console.log('BOSS SPAWN');
}

app.ticker.add(spawnBoss);
