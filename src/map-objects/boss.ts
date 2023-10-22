import { AnimatedSprite, Container, Graphics } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { atlasLoader } from '../pixi/atlas-loader';
import { playerStats } from '../player/stats';
import { playerHitbox } from '../player/player';
import { lifeHud } from '../player/hud';
import { gameConditions } from '../map/game-conditions';

// position.x + scalePosition.x
// position.y + scalePosition.y
const offsetPosition = {
  x: -35,
  y: -450,
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

// Remplacez par votre chemin d'accès réel
// ... autres imports ...

const boss = new AnimatedSprite(atlasLoader.boss.animations.boss, 500, 10);
// life: number, damage: number
export function createBoss(x: number, y: number) {
  boss.play();
  boss.animationSpeed = 0.08;
  boss.scale.set(6);
  boss.zIndex = -1;
  boss.x = x;
  boss.y = y;
  camera.addChild(boss);

  boss.scale.set(scaling.boss);
  boss.animationSpeed = 0.17;
  boss.play();
  bossContainer.addChild(boss);
  boss.x += offsetPosition.x;
  boss.y += offsetPosition.y;

  // boss.life = life;
  // boss.damage = damage;
}

// Ajouter les fireballs du boss au boss, mais initialement invisibles
bossContainer.addChild(bossFireball);
bossContainer.addChild(bossFireball1);
bossContainer.addChild(bossFireball2);
bossFireball.visible = true;
bossFireball1.visible = true;
bossFireball2.visible = true;

/* //////////////////////////// GAME LOOP  //////////////////////////// */
/* //////////////////////////// BOUGER LES FIREBALLS CHAQUE FRAMES  //////////////////////////// */
/* //////////////////////////// VERIFIER SI UNE FIREBALL ENTRE EN COUTACTE AVEC LE JOUEUR  //////////////////////////// */
/* //////////////////////////// ETC  //////////////////////////// */

let invulnerabilityTime = 0;
const invulnerabilityTimer = 1000;

function disableBossInvulnerability() {
  if (gameConditions.leverToAttackTheBoss > 0) return;
  app.ticker.remove(disableBossInvulnerability);
  console.log('BOSS SPAWN');
}

app.ticker.add(disableBossInvulnerability);

app.ticker.add(() => {
  const fireballs = [bossFireball, bossFireball1, bossFireball2];

  // Vérifier si le boss est vulnérable avant de déplacer la fireball du joueur
  // if (!invulnerable) {a
  for (const fireball of fireballs) {
    const fireballCorrectionWithOffets = {
      x: fireball.x + offsetPosition.x,
      y: fireball.y + offsetPosition.y,
      width: fireball.width,
      height: fireball.height,
    };

    if (isColliding(playerHitbox, fireballCorrectionWithOffets)) {
      // if (fireball.name !== 'fireball') continue;

      // console.table(getCoordinates(fireball));
      console.log('damage');
      if (Date.now() - invulnerabilityTime <= invulnerabilityTimer) continue;
      invulnerabilityTime = Date.now();
      playerStats.life -= 1;
      lifeHud.text = `Life: ${playerStats.life}`;
      // if (boss.life <= 0) {
      // camera.removeChild(boss);
      // }
    }
  }

  moveFireballs();

  const drawFireball = new Graphics();
  drawFireball.beginFill('red');
  drawFireball.drawRect(0, 0, bossFireball.width, bossFireball.height);
  camera.addChild(drawFireball);

  const drawFireball1 = new Graphics();
  drawFireball1.beginFill('red');
  drawFireball1.drawRect(0, 0, bossFireball1.width, bossFireball1.height);
  // boss.addChild(drawFireball1);

  const drawFireball2 = new Graphics();
  drawFireball2.beginFill('yellow');
  drawFireball2.drawRect(0, 0, bossFireball2.width, bossFireball2.height);
  // boss.addChild(drawFireball2);
});
