import { AnimatedSprite } from 'pixi.js';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { playerHitbox } from '../player/player';
import { lifeHud } from '../player/hud';
import { playerStats } from '../player/stats';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';

type Trap = {
  x: number;
  y: number;
  active: boolean;
  playerReceiveDamage: boolean;
  animation: AnimatedSprite;
};

// Fonction pour créer un piège avec des intervalles d'activation et de désactivation spécifiques
function createTrap(x: number, y: number, activationInterval: number, deactivationInterval: number) {
  // Créez un piège animé
  const trap: Trap = {
    x: 8,
    y: 8,
    active: false,
    playerReceiveDamage: false, // Le joueur n'a pas encore été blessé
    animation: new AnimatedSprite(atlasLoader.spike.animations.idle),
  };
  // trap.animation.zIndex = 3;
  trap.animation.scale.set(2);
  trap.animation.animationSpeed = 0.1;
  trap.animation.play();
  trap.animation.visible = trap.active;
  camera.addChild(trap.animation);

  // Gérez l'invulnérabilité du joueur
  let invulnerabilityTime = 0;
  const invulnerabilityTimer = 1500;

  // Fonction pour vérifier la collision entre le piège et le joueur
  function checkTrapCollision() {
    if (!trap.active || trap.playerReceiveDamage) return;
    if (Date.now() - invulnerabilityTime <= invulnerabilityTimer) return;
    if (isColliding(trap.animation, playerHitbox)) {
      console.log('Le joueur subit des dégâts du piège');
      trap.playerReceiveDamage = true;
      playerStats.life -= 1;
      lifeHud.text = `Vie : ${playerStats.life}`;
      invulnerabilityTime = Date.now();
    }
  }

  setInterval(() => {
    trap.active = true;
    setTimeout(() => {
      trap.active = false;
      trap.playerReceiveDamage = false;
    }, deactivationInterval);
  }, activationInterval);

  app.ticker.add(checkTrapCollision);
}

export { createTrap };
