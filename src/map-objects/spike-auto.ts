// if solution active trap desctived done
// else :    if trap actived, colision trap, degat once,
import { AnimatedSprite, Graphics } from 'pixi.js';
import { isColliding } from '../math/collisions';
import { player } from '../player/player';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import { mapScaling } from '../map/map-layers';
import { isInvulnerable } from '../player/invulnerability';
import { damagePlayer } from '../player/receive-damage';
import { type Rectangle } from '../utils/utils';

type SpikeAuto = {
  animation: AnimatedSprite;
  hitbox: Rectangle;
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

  const hitbox: Rectangle = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  if (name.includes('|largeHitbox|')) {
    hitbox.x = spike.x;
    hitbox.y = spike.y;
    hitbox.width = spike.width;
    hitbox.height = spike.height;
  } else {
    hitbox.x = spike.x + 3;
    hitbox.y = spike.y + 11;
    hitbox.width = spike.width - 5;
    hitbox.height = spike.height - 12;
  }

  const hitboxDraw = new Graphics();
  hitboxDraw.beginFill('white', 0.1);
  hitboxDraw.x = hitbox.x;
  hitboxDraw.y = hitbox.y;
  // hitboxDraw.drawRect(0, 0, hitbox.width, hitbox.height); // ! DURIN DEW, DRAW HITBOX
  camera.addChild(hitboxDraw);

  spikesAuto.push({
    animation: spike,
    hitbox,
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
    if (spike.animation.visible && !isInvulnerable() && isColliding(player.hitbox, spike.hitbox)) {
      console.log('Damage');
      damagePlayer(1);
    }
  }
}

export { spikesAuto };
