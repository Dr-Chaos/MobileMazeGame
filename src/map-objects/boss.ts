import { AnimatedSprite, Graphics } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { atlasLoader } from '../pixi/atlas-loader';

export function createfireball(): AnimatedSprite {
  const bossFireball = new AnimatedSprite(atlasLoader.bossfireball.animations.idle);
  const bossFireball1 = new AnimatedSprite(atlasLoader.bossfireball.animations.idle);
  const bossFireball2 = new AnimatedSprite(atlasLoader.bossfireball.animations.idle);
  [bossFireball, bossFireball1, bossFireball2].forEach(fireball => {
    fireball.scale.set(2);
    fireball.animationSpeed = 0.17;
    fireball.play();
  });

  return bossFireball;

const bossRadius = 15;
let bossAngle = 0;
let bossAngle1 = 0.5;
let bossAngle2 = Math.PI; // Angle initial pour la deuxième fireball

function moveBossFireballs() {
  // Mouvement de la troisieme fireball
  let x = bossRadius * Math.cos(bossAngle);
  let y = bossRadius * Math.sin(bossAngle);
  bossFireball2.position.set(x + 5, y + 10);
  bossAngle += 0.05;

  // Mouvement de la première fireball
  x = bossRadius * Math.cos(bossAngle1);
  y = bossRadius * Math.sin(bossAngle1);
  bossFireball1.position.set(x, y);
  bossAngle1 += 0.1;

  // Mouvement de la deuxième fireball
  x = bossRadius * Math.cos(bossAngle2);
  y = bossRadius * Math.sin(bossAngle2);
  bossFireball2.position.set(x + 5, y + 10);
  bossAngle2 += 0.05;
}

// Incorporer les fireballs du joueur et du boss dans le boss
type Boss = AnimatedSprite & { life: number; damage: number };
let boss: Boss;
let invulnerable = false;

export function createBoss(x: number, y: number) {
  boss = new AnimatedSprite(atlasLoader.boss.animations.idle) as Boss;
  boss.scale.set(6);
  boss.animationSpeed = 0.17;
  boss.play();
  boss.x = x;
  boss.y = y;
  camera.addChild(boss);
  boss.life = 500;
  boss.damage = 10;

  // Ajouter les fireballs du boss au boss, mais initialement invisibles
  boss.addChild(bossFireball);
  boss.addChild(bossFireball1);
  boss.addChild(bossFireball2);
  bossFireball1.visible = true;
  bossFireball2.visible = true;
}

// Fonction pour rendre le boss vulnérable lorsque certaines conditions sont remplies
export function makeBossVulnerable() {
  invulnerable = true;
  bossFireball.visible = true;
  bossFireball1.visible = true; // Rendre les fireballs du boss visibles
  bossFireball2.visible = true;
}


app.ticker.add(() => {
  // Vérifier si le boss est vulnérable avant de déplacer la fireball du joueur
  if (!invulnerable) {
    if (isColliding(boss, Fireball)) {
      boss.life -= 1;
      if (boss.life <= 0) {
        camera.removeChild(boss);
      }
    }

  }

  // Déplacer les fireballs du boss
  moveBossFireballs();
});

export { boss };
