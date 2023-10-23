import { AnimatedSprite, Container } from 'pixi.js';
import { camera } from '../../camera';
import app from '../../pixi/initialize';
import { isColliding } from '../../math/collisions';
import { atlasLoader } from '../../pixi/atlas-loader';
import { playerStats } from '../../player/stats';
import { playerHitbox } from '../../player/player';
import { lifeHud } from '../../player/hud';
import { gameConditions } from '../../map/game-conditions';
import { fireball } from '../../player/fireball';
import { startInvulnerabilityTimer } from '../../player/invulnerability';

// position.x + scalePosition.x
// position.y + scalePosition.y
const offsetPosition = {
  x: -40,
  y: -352,
};

// si scaling fireball 1: size: 16
// si scaling fireball 2: size: 32
// si scaling boss à 4: les firebasse s'agrendissent visuellement, mais leur size reste à 16
const scaling = {
  fireball: 3,
  boss: 5,
};

/* //////////////////////////// CREATION DES FIREBALLS  //////////////////////////// */
const bossFireball = new AnimatedSprite(atlasLoader.fireball.animations.idle);
bossFireball.name = 'fireball';
const bossFireball1 = new AnimatedSprite(atlasLoader.fireball.animations.idle);
bossFireball1.name = 'fireball1';
const bossFireball2 = new AnimatedSprite(atlasLoader.fireball.animations.idle);
bossFireball2.name = 'fireball2';

for (const fireball of [bossFireball, bossFireball1, bossFireball2]) {
  fireball.scale.set(scaling.fireball);
  fireball.animationSpeed = 0.17;
  fireball.play();
}

/* //////////////////////////// FONCTION POUR BOUGER LES FIREBALLS  //////////////////////////// */
const bossRadius = 100;
let bossAngle = 0;
let bossAngle1 = 0.5;
let bossAngle2 = Math.PI; // Angle initial pour la deuxième fireball
function moveFireballs() {
  // Mouvement de la troisieme fireball
  let x = bossRadius * Math.cos(bossAngle);
  let y = bossRadius * Math.sin(bossAngle);
  bossFireball.position.set(x + 10, y + 20);
  bossAngle += 0.09;

  // Mouvement de la première fireball
  x = bossRadius * Math.cos(bossAngle1);
  y = bossRadius * Math.sin(bossAngle1);
  bossFireball1.position.set(x + 15, y + 15);
  bossAngle1 += 0.07;

  // Mouvement de la deuxième fireball
  x = bossRadius * Math.cos(bossAngle2);
  y = bossRadius * Math.sin(bossAngle2);
  bossFireball2.position.set(x + 25, y + 10);
  bossAngle2 += 0.07;
}

/* //////////////////////////// CREATION DU BOSS + LIER LES FIREBALLS AU BOSS  //////////////////////////// */
// // Incorporer les fireballs du joueur et du boss dans le boss
const bossContainer = new Container();
camera.addChild(bossContainer);
bossContainer.x += offsetPosition.x;
bossContainer.y += offsetPosition.y;

type Boss = AnimatedSprite & { life: number; damage: number };

export function createBoss(x: number, y: number);
const boss = new AnimatedSprite(atlasLoader.boss.animations.boss) as Boss;
boss.scale.set(scaling.boss);
boss.animationSpeed = 0.17;
boss.play();
bossContainer.addChild(boss);
boss.x += offsetPosition.x;
boss.y += offsetPosition.y;
boss.life = 500;
boss.damage = 10;
boss.play();
boss.zIndex = -1;

// Ajouter les fireballs du boss au boss, mais initialement invisibles
bossContainer.addChild(bossFireball);
bossContainer.addChild(bossFireball1);
bossContainer.addChild(bossFireball2);
bossFireball.visible = true;
bossFireball1.visible = true;
bossFireball2.visible = true;

camera.addChild(boss);

/* //////////////////////////// GAME LOOP  //////////////////////////// */
/* //////////////////////////// BOUGER LES FIREBALLS CHAQUE FRAMES  //////////////////////////// */
/* //////////////////////////// VERIFIER SI UNE FIREBALL ENTRE EN COUTACTE AVEC LE JOUEUR  //////////////////////////// */
/* //////////////////////////// ETC  //////////////////////////// */

let invulnerabilityTime = 0;
const invulnerabilityTimer = 1000;
const playerfireball = fireball;

let bossIsActive = false;
let bossIsAlive = true; // Consider the boss as alive initially
let bossIsInvulnerable = true; // The boss starts invulnerable

function activateBoss() {
  bossIsActive = true;
  bossIsAlive = true; // The boss is now active and alive
  bossIsInvulnerable = false; // The boss can now take damage
  // Any additional setup when the boss becomes active
}

function deactivateBoss() {
  bossIsActive = false;
  bossIsAlive = false; // The boss is no longer active or alive
  // Any cleanup when the boss is deactivated
}

function deactivateFireballs() {
  const fireballs = [bossFireball, bossFireball1, bossFireball2];
  for (const fireball of fireballs) {
    fireball.visible = false; // Make fireballs invisible
    // any other properties to 'deactivate' the fireball
  }
}

function activateFireballs() {
  const fireballs = [bossFireball, bossFireball1, bossFireball2];
  for (const fireball of fireballs) {
    fireball.visible = true; // Make fireballs visible
    // any other properties to 'activate' the fireball
  }
}

app.ticker.add(() => {
  if (!bossIsActive && gameConditions.leverToAttackTheBoss <= 0) {
    activateBoss();
    activateFireballs();
  }

  if (!bossIsAlive) {
    return;
  }

  const fireballs = [bossFireball, bossFireball1, bossFireball2];

  for (const fireball of fireballs) {
    const fireballCorrectionWithOffsets = {
      x: fireball.x + offsetPosition.x,
      y: fireball.y + offsetPosition.y,
      width: fireball.width,
      height: fireball.height,
    };

    if (bossIsAlive && !bossIsInvulnerable && isColliding(playerHitbox, fireballCorrectionWithOffsets)) {
      console.log('Player takes damage');
      if (Date.now() - invulnerabilityTime <= invulnerabilityTimer) continue;
      invulnerabilityTime = Date.now();
      playerStats.life -= 1;
      lifeHud.text = `Life: ${playerStats.life}`;
      if (playerStats.life <= 0) {
        //  player death
      }
    }

    if (isColliding(boss, playerfireball) && !bossIsInvulnerable && bossIsAlive) {
      boss.life -= 1;
      console.log('Boss takes damage');
      if (boss.life <= 0) {
        console.log('Boss is dead');
        deactivateBoss();
        bossContainer.removeChild(bossFireball);
        bossContainer.removeChild(bossFireball1);
        bossContainer.removeChild(bossFireball2);
        camera.removeChild(bossContainer);
        camera.removeChild(boss);
      }
    }
  }

  if (bossIsAlive) {
    moveFireballs();
  }
});
deactivateBoss();
deactivateFireballs();
