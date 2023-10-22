import { AnimatedSprite } from 'pixi.js';
import { gameConditions } from '../map/game-conditions';
import app from '../pixi/initialize';
import { atlasLoader } from '../pixi/atlas-loader';
import { camera } from '../camera';

export function createBoss(x: number, y: number) {
  const boss = new AnimatedSprite(atlasLoader.boss.animations.boss);
  boss.play();
  boss.animationSpeed = 0.08;
  boss.scale.set(6);
  boss.zIndex = -1;
  boss.x = x;
  boss.y = y;
  camera.addChild(boss);
}

function disableBossInvulnerability() {
  if (gameConditions.leverToAttackTheBoss > 0) return;
  app.ticker.remove(disableBossInvulnerability);
  console.log('BOSS SPAWN');
}

app.ticker.add(disableBossInvulnerability);
