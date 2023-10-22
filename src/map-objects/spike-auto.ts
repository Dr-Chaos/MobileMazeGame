// if solution active trap desctived done
// else :    if trap actived, colision trap, degat once,
import { AnimatedSprite } from 'pixi.js';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { lifeHud } from '../player/hud';
import { playerStats } from '../player/stats';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import { mapScaling } from '../map/map-layers';
import { isInvulnerable, startInvulnerabilityTimer } from '../player/invulnerability';

const spikesAuto: AnimatedSprite[] = [];
export function createSpikeAuto(x: number, y: number, name: string) {
  const spike = new AnimatedSprite(atlasLoader.spike.animations.idle);
  camera.addChild(spike);
  spike.scale.set(mapScaling);
  spike.animationSpeed = 0.09;
  spike.zIndex = -1;
  spike.play();
  spike.x = x;
  spike.y = y;
  spike.visible = true;
  spike.name = name;
  spikesAuto.push(spike);
  spike.onLoop = () => {
    spike.stop();
    spike.visible = false;
  };

  let displaySpikeTime = 0;
  const displaySpikeTimer = 1500;
  app.ticker.add(() => {
    if (spike.visible && !isInvulnerable() && isColliding(playerHitbox, spike)) {
      startInvulnerabilityTimer();
      console.log('Receive damage from spikes');
      playerStats.life -= 1;
      lifeHud.text = `Life: ${playerStats.life}`;
      console.log('Collision spike');
    }

    // if displaySpikeTimer seconds elapse
    // play spike animation
    if (Date.now() - displaySpikeTime <= displaySpikeTimer) return;
    spike.play();
    spike.visible = true;
    displaySpikeTime = Date.now();
  });
}

export { spikesAuto };
