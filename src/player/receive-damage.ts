import { Sound } from '@pixi/sound';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { AnimationStates, animationState } from './animations/animations';
import { fireball, moveFireball } from './fireball';
import { updateLifeHud } from './hud';
import { startInvulnerabilityTimer } from './invulnerability';
import { player } from './player';
import { playerStats } from './stats';
import { atlasLoader } from '../pixi/atlas-loader';

// const deathsound = Sound.from(atlasLoader.burn2);
const soundplayerdamage = Sound.from('./sons/bruitages/playerdamage.ogg');

export function damagePlayer(damageNumber: number) {
  if (playerStats.life <= 0) {
    // remove the fireball
    app.ticker.remove(moveFireball);
    camera.removeChild(fireball);
    // remove the player hitbox
    player.hitbox.x = 0;
    player.hitbox.y = 0;
    player.hitbox.width = 0;
    player.hitbox.height = 0;
    return;
  }

  startInvulnerabilityTimer();
  playerStats.life -= damageNumber;
  updateLifeHud(playerStats.life);
  animationState.current = AnimationStates.ReceiveDamage;
  soundplayerdamage.play();
}
