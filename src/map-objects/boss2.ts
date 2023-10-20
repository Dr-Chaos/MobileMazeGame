import { AnimatedSprite } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { fireball } from '../player/fireball';
import { atlasLoader } from '../pixi/atlas-loader';

type Boss = AnimatedSprite & { life: number; damage: number };
let boss: Boss;
let invulnerable = true; // État initial d'invulnérabilité

export function createBoss(x: number, y: number) {
  boss = new AnimatedSprite(atlasLoader.boss.animations.idle) as Boss;
  boss.scale.set(2);
  boss.animationSpeed = 0.17;
  boss.play();
  boss.x = x;
  boss.y = y;
  camera.addChild(boss);
  boss.life = 5;
  boss.damage = 1;
}

app.ticker.add(() => {
  // Vérifier si le boss est vulnérable avant de subir des dégâts
  if (!invulnerable && isColliding(boss, fireball)) {
    boss.life -= 1;
    if (boss.life <= 0) {
      camera.removeChild(boss);
    }
  }
});

// Fonction pour rendre le boss vulnérable lorsque certaines conditions sont remplies
export function makeBossVulnerable() {
  invulnerable = false;
}
