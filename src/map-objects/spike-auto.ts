// if solution active trap desctived done
// else :    if trap actived, colision trap, degat once,
import { AnimatedSprite } from 'pixi.js';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { player, playerHitbox } from '../player/player';
import { lifeHud, updateLifeHud } from '../player/hud';
import { playerStats } from '../player/stats';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import { mapScaling } from '../map/map-layers';
import { isInvulnerable, startInvulnerabilityTimer } from '../player/invulnerability';
import { damagePlayer } from '../player/receive-damage';

type SpikeAuto = {
  animation: AnimatedSprite;
  displayTime: number;
  displayTimer: number;
};

const spikesAuto: SpikeAuto[] = [];

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
  spike.onLoop = () => {
    spike.stop();
    spike.visible = false;
  };

  spikesAuto.push({
    animation: spike,
    displayTime: 0,
    displayTimer: 1500,
  });
}

export function activateSpikesAuto() {
  for (const spike of spikesAuto) {
    // if displaySpikeTimer seconds elapse
    // play spike animation
    if (Date.now() - spike.displayTime <= spike.displayTimer) return;
    spike.animation.play();
    spike.animation.visible = true;
    spike.displayTime = Date.now();

    // the check if spike is in collision with the player
    // ! YOU MUST PLACE THIS CONDITION HERE, AFTER CHECKING IF SPIKE IS ACTIVATE, BECAUSE PREVIOUSLY
    // ! WE SET visible = true
    if (spike.animation.visible && !isInvulnerable() && isColliding(player.hitbox, spike.animation)) {
      console.log('Damage');
      damagePlayer(1);
    }
  }
}

export { spikesAuto };
