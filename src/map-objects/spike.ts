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
import { type Rectangle, centerIfPivotIsUpperLeft } from '../utils/utils';

type Spike = {
  sprite: AnimatedSprite;
  hitbox: Rectangle;
};

const spikes: Spike[] = [];
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
  spike.onLoop = () => {
    spike.stop();
    spike.visible = false;
  };

  const hitbox = centerIfPivotIsUpperLeft(spike);
  const hitboxDraw = new Graphics();
  hitboxDraw.beginFill('white', 0.1);
  hitboxDraw.x = hitbox.x;
  hitboxDraw.y = hitbox.y;
  hitboxDraw.drawRect(0, 0, hitbox.width, hitbox.height);
  camera.addChild(hitboxDraw);

  spikes.push({
    sprite: spike,
    hitbox,
  });
}

export function activeSpikes() {
  for (const spike of spikes) {
    if (spike.sprite.visible && !isInvulnerable() && isColliding(player.hitbox, spike.hitbox)) {
      damagePlayer(1);
    }
  }
}

export { spikes };
