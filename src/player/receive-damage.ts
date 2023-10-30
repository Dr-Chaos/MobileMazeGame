import { camera } from '../camera';
import app from '../pixi/initialize';
import { sounds } from '../pixi/sounds';
import { AnimationStates, animationState } from './animations/animations';
import { fireball, moveFireball } from './fireball';
import { updateLifeHud } from './hud';
import { startInvulnerabilityTimer } from './invulnerability';
import { moveGameLoop } from './move';
import { player } from './player';
import { playerStats } from './stats';

export function damagePlayer(damageNumber: number) {
  startInvulnerabilityTimer();
  playerStats.life -= damageNumber;
  updateLifeHud(playerStats.life);
  animationState.current = AnimationStates.ReceiveDamage;
  sounds.playerDamage.play();

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
    // play sounds
    sounds.playerDeath.play();
    sounds.playerScream.play();
  }
}
