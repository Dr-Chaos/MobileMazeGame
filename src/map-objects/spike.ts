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

const spikes: AnimatedSprite[] = [];
export function createSpike(x: number, y: number, name: string) {
  const spike = new AnimatedSprite(atlasLoader.spike.animations.idle);
  camera.addChild(spike); // HIDE SPIKES DURING DEV
  spike.scale.set(2);
  spike.animationSpeed = 0.15;
  spike.zIndex = -1;
  spike.stop();
  spike.x = x;
  spike.y = y;
  spike.visible = false;
  spike.name = name;
  spikes.push(spike);
  spike.onLoop = () => {
    spike.stop();
    spike.visible = false;
  };
}

let invulnerabilityTime = 0;
const invulnerabilityTimer = 1000;
app.ticker.add(() => {
  for (const spike of spikes) {
    if (spike.visible && isColliding(playerHitbox, spike)) {
      if (Date.now() - invulnerabilityTime <= invulnerabilityTimer) continue;
      console.log('Receive damage from spikes');
      invulnerabilityTime = Date.now();
      playerStats.life -= 1;
      lifeHud.text = `Life: ${playerStats.life}`;
      console.log('Collision trap');
    }
  }
});

export { spikes };
