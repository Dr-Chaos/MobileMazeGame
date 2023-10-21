import { AnimatedSprite, Graphics } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { atlasLoader } from '../pixi/atlas-loader';

// Code de la fireball du joueur
const playerFireball = new Graphics();
playerFireball.beginFill('green');
playerFireball.drawRect(0, 0, 20, 20);

const radius = 50;
let angle = 0;

function movePlayerFireball() {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  playerFireball.position.set(x, y + 20);
  angle += 0.1;
}

// Code pour les fireballs du boss
const bossFireball1 = new Graphics();
bossFireball1.beginFill('red');
bossFireball1.drawRect(0, 0, 20, 20);

const bossFireball2 = new Graphics();
bossFireball2.beginFill('blue');
bossFireball2.drawRect(0, 0, 20, 20);

const bossRadius = 60;
let bossAngle1 = 0;
let bossAngle2 = Math.PI; // Angle initial pour la deuxième fireball

function moveBossFireballs() {
  // Mouvement de la première fireball
  const x1 = bossRadius * Math.cos(bossAngle1);
  const y1 = bossRadius * Math.sin(bossAngle1);
  bossFireball1.position.set(x1, y1);
  bossAngle1 += 0.05;

  // Mouvement de la deuxième fireball
  const x2 = bossRadius * Math.cos(bossAngle2);
  const y2 = bossRadius * Math.sin(bossAngle2);
  bossFireball2.position.set(x2, y2);
  bossAngle2 += 0.05;
}

// Incorporer les fireballs du joueur et du boss dans le boss
type Boss = AnimatedSprite & { life: number; damage: number };
let boss: Boss;
let invulnerable = false;

export function createBoss(x: 217, y: 56) {
  boss = new AnimatedSprite(atlasLoader.boss.animations.idle) as Boss;
  boss.scale.set(6);
  boss.animationSpeed = 0.17;
  boss.play();
  boss.x = x;
  boss.y = y;
  camera.addChild(boss);
  boss.life = 500;
  boss.damage = 10;

  // Ajouter les fireballs du joueur au boss
  boss.addChild(playerFireball);

  // Ajouter les fireballs du boss au boss, mais initialement invisibles
  boss.addChild(bossFireball1);
  boss.addChild(bossFireball2);
  bossFireball1.visible = true;
  bossFireball2.visible = true;
}

// Fonction pour rendre le boss vulnérable lorsque certaines conditions sont remplies
export function makeBossVulnerable() {
  invulnerable = true;
  bossFireball1.visible = true; // Rendre les fireballs du boss visibles
  bossFireball2.visible = true;
}

// Fonction pour activer les fireballs du boss
export function activateBossFireballs() {
  bossFireball1.visible = true;
  bossFireball2.visible = true;
}

app.ticker.add(() => {
  // Vérifier si le boss est vulnérable avant de déplacer la fireball du joueur
  if (!invulnerable) {
    if (isColliding(boss, playerFireball)) {
      boss.life -= 1;
      if (boss.life <= 0) {
        camera.removeChild(boss);
      }
    }

    // Déplacer la fireball du joueur
    movePlayerFireball();
  }

  // Déplacer les fireballs du boss
  moveBossFireballs();
});

export { boss };
