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

const traps = [];
export function createSpike(x: number, y: number) {
  let canPlayerReceiveDamage = true;

  const trap = new AnimatedSprite(atlasLoader.spike.animations.idle);
  camera.addChild(trap);
  trap.scale.set(2);
  trap.animationSpeed = 0.1;
  trap.play();
  trap.x = x;
  trap.y = y;
  trap.visible = true;
  // torch.zIndex = zIndex;
  traps.push(trap);

  setInterval(() => {
    trap.visible = !trap.visible;
    // peut recevoir des dégâts lorsque le trap est visible
    if (trap.visible) canPlayerReceiveDamage = true;
  }, 1500);

  function checkTrapsCollision() {
    // si le joueur sort du trap, il peut à nouveau recevoir des dégâts
    if (!isColliding(trap, playerHitbox)) {
      canPlayerReceiveDamage = true;
      return;
    }

    if (!canPlayerReceiveDamage) return;
    // ne peut plus recevoir de dégâts tant que le trap réaparait à nouveau
    // ou que le joueur sort du trap (puis y rentre à nouveau)
    canPlayerReceiveDamage = false;
    playerStats.life -= 1;
    lifeHud.text = `Life: ${playerStats.life}`;
    console.log('Collision trap');
  }

  app.ticker.add(checkTrapsCollision);
}
