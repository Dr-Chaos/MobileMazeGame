// if solution active trap desctived done
// else :    if trap actived, colision trap, degat once,
import { AnimatedSprite } from 'pixi.js';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { lifeHud, updateLifeHud } from '../player/hud';
import { playerStats } from '../player/stats';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import { mapScaling } from '../map/map-layers';
import { isInvulnerable, startInvulnerabilityTimer } from '../player/invulnerability';

const spikes: AnimatedSprite[] = [];
export function createSpike(x: number, y: number, name: string, visible = false) {
  const spike = new AnimatedSprite(atlasLoader.spike.animations.idle);
  camera.addChild(spike); // HIDE SPIKES DURING DEV
  spike.scale.set(mapScaling);
  spike.animationSpeed = 0.09;
  spike.zIndex = -1;
  spike.stop();
  spike.x = x;
  spike.y = y;
  spike.visible = visible;
  spike.name = name;
  spikes.push(spike);
  spike.onLoop = () => {
    spike.stop();
    spike.visible = false;
  };
}

app.ticker.add(() => {
  for (const spike of spikes) {
    if (spike.visible && !isInvulnerable() && isColliding(playerHitbox, spike)) {
      startInvulnerabilityTimer();
      console.log('Receive damage from spikes');
      playerStats.life -= 1;
      updateLifeHud(playerStats.life);
      console.log('Collision spike');
    }
  }
});

export { spikes };
