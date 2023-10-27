import { AnimatedSprite, Container } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { atlasLoader } from '../pixi/atlas-loader';
import { gameConditions } from '../map/game-conditions';
import { fireball as playerFireball } from '../player/fireball';
import { player } from '../player/player';
import { damagePlayer } from '../player/receive-damage';
import { isInvulnerable } from '../player/invulnerability';

const scaling = {
  fireball: 1, // 3
  boss: 1, // 5
};

type Boss = {
  sprite: AnimatedSprite;
  fireballsContainer: Container;
  life: number;
  damage: number;
  isActive: boolean;
  invulnerabilityTime: number;
  invulnerabilityTimer: number;
};

export const boss: Boss = {
  sprite: new AnimatedSprite(atlasLoader.boss.animations.boss),
  fireballsContainer: new Container(),
  life: 0,
  damage: 0,
  isActive: false,
  invulnerabilityTime: 0,
  invulnerabilityTimer: 1000,
};

const fireballOne = new AnimatedSprite(atlasLoader.fireball.animations.idle);
fireballOne.name = 'fireballOne';
const fireballTwo = new AnimatedSprite(atlasLoader.fireball.animations.idle);
fireballTwo.name = 'fireballTwo';
const fireballThree = new AnimatedSprite(atlasLoader.fireball.animations.idle);
fireballThree.name = 'fireballThree';

let bossRadius = 0;
let bossAngle = 0;
let bossAngle1 = 0;
let bossAngle2 = 0;

export function createBoss(x: number, y: number) {
  boss.life = 1; // 500
  boss.damage = 10;
  boss.isActive = false;
  boss.invulnerabilityTime = 0;
  boss.invulnerabilityTimer = 1000;

  boss.sprite.scale.set(scaling.boss);
  boss.sprite.animationSpeed = 0.17;
  boss.sprite.play();
  boss.sprite.x = x;
  boss.sprite.y = y;
  boss.sprite.play();
  boss.sprite.zIndex = -1;
  camera.addChild(boss.sprite);

  bossRadius = 100;
  bossAngle = 0;
  bossAngle1 = 0.5;
  bossAngle2 = Math.PI;
  for (const iteratedFireball of [fireballOne, fireballTwo, fireballThree]) {
    iteratedFireball.scale.set(scaling.fireball);
    iteratedFireball.animationSpeed = 0.17;
    iteratedFireball.stop();
    iteratedFireball.visible = false;
    iteratedFireball.x = x;
    iteratedFireball.y = y;
    boss.fireballsContainer.addChild(iteratedFireball);
  }

  boss.fireballsContainer.x = x;
  boss.fireballsContainer.y = y;
  camera.addChild(boss.fireballsContainer);
}

export function activateBossFireballs() {
  const fireballs = [fireballOne, fireballTwo, fireballThree];
  for (const iteratedFireball of fireballs) {
    iteratedFireball.visible = true;
  }
}

function moveBossFireballs(delta: number) {
  let x = bossRadius * Math.cos(bossAngle);
  let y = bossRadius * Math.sin(bossAngle);
  fireballOne.x = x + 10 * delta;
  fireballOne.y = y + 20 * delta;
  bossAngle += 0.09;

  x = bossRadius * Math.cos(bossAngle1);
  y = bossRadius * Math.sin(bossAngle1);
  fireballTwo.position.set(x + 15 * delta, y + 15 * delta);
  bossAngle1 += 0.07;

  x = bossRadius * Math.cos(bossAngle2);
  y = bossRadius * Math.sin(bossAngle2);
  fireballThree.position.set(x + 25 * delta, y + 10 * delta);
  bossAngle2 += 0.07;
}

export function bossGameLoop(delta: number) {
  console.log(boss.life);

  // lorsque tous les leviers son activés et que le boss n'est pas encore actif, active le boss
  if (!boss.isActive && gameConditions.leverToAttackTheBoss <= 0) {
    boss.isActive = true;
    activateBossFireballs();
  }

  // si le boss n'est pas actif, stop l'execution de la fonction
  if (!boss.isActive) {
    return;
  }

  moveBossFireballs(delta);
  const fireballs = [fireballOne, fireballTwo, fireballThree];
  for (const fireball of fireballs) {
    const fireballCorrectionWithOffsets = {
      x: fireball.x + boss.sprite.x,
      y: fireball.y + boss.sprite.y,
      width: fireball.width,
      height: fireball.height,
    };

    // si la fireball du boss entre en collision avec le joueur
    if (isColliding(player.hitbox, fireballCorrectionWithOffsets) && !isInvulnerable()) damagePlayer(1);
  }

  // si la fireball du joueur entre en collision avec le boss
  if (isColliding(boss.sprite, playerFireball)) {
    boss.life -= 1;
    console.log('Boss takes damage');
    if (boss.life > 0) return;
    console.log('Boss is dead');
    camera.removeChild(boss.sprite);
    camera.removeChild(boss.fireballsContainer);

    // Jouer l'animation de mort
    const bossDeathAnimation = new AnimatedSprite(atlasLoader.bossDeath.animations.bossdeath);

    bossDeathAnimation.x = boss.sprite.x;
    bossDeathAnimation.y = boss.sprite.y;
    bossDeathAnimation.scale.set(scaling.boss);
    bossDeathAnimation.position.set(boss.sprite.x, boss.sprite.y); // la position de l'animation doit correspondre à celle du boss
    bossDeathAnimation.animationSpeed = 0.5;
    bossDeathAnimation.loop = false;
    bossDeathAnimation.zIndex = -1;
    bossDeathAnimation.play();
    camera.addChild(bossDeathAnimation);

    app.ticker.remove(bossGameLoop);
  }
}
