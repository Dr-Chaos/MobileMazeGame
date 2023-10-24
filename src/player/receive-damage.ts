import { AnimationStates, animationState } from './animations/animations';
import { updateLifeHud } from './hud';
import { startInvulnerabilityTimer } from './invulnerability';
import { playerStats } from './stats';

export function damagePlayer(damageNumber: number) {
  if (playerStats.life <= 0) return;
  startInvulnerabilityTimer();
  playerStats.life -= damageNumber;
  updateLifeHud(playerStats.life);
  animationState.current = AnimationStates.ReceiveDamage;
}
