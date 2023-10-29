import { Sound } from '@pixi/sound';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import app from '../pixi/initialize';
import { AnimationStates, animationState } from './animations/animations';
import { fireball, moveFireball } from './fireball';
import { updateLifeHud } from './hud';
import { startInvulnerabilityTimer } from './invulnerability';
import { moveGameLoop } from './move';
import { player } from './player';
import { playerStats } from './stats';

const playerDamageSound = Sound.from(atlasLoader.playerdamagesound);
const playerdeathSound = Sound.from(atlasLoader.burn4);
const playerdeathScream = Sound.from(atlasLoader.deathsound);

export function damagePlayer(damageNumber: number) {
  startInvulnerabilityTimer();
  playerStats.life -= damageNumber;
  updateLifeHud(playerStats.life);
  animationState.current = AnimationStates.ReceiveDamage;
  playerDamageSound.play();

  if (playerStats.life <= 0) {
    // remove the fireball
    app.ticker.remove(moveFireball);
    // disable player movements
    app.ticker.remove(moveGameLoop);
    camera.removeChild(fireball);
    // remove the player hitbox
    player.hitbox.x = 0;
    player.hitbox.y = 0;
    player.hitbox.width = 0;
    player.hitbox.height = 0;
    playerdeathSound.play();
    playerdeathScream.play();
  }
}
