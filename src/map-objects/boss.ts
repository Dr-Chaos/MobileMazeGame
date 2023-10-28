import { AnimatedSprite, Container, Graphics } from 'pixi.js';
import { camera } from '../camera';
import app from '../pixi/initialize';
import { isColliding } from '../math/collisions';
import { atlasLoader } from '../pixi/atlas-loader';
import { gameConditions } from '../map/game-conditions';
import { fireball as playerFireball } from '../player/fireball';
import { player } from '../player/player';
import { damagePlayer } from '../player/receive-damage';
import { isInvulnerable } from '../player/invulnerability';
import { clearStage } from '../utils/utils';
import { initializeWinScreen } from '../screens/win';
import { clearScene, removeGameLoops, uninitializeScene } from '../scene';

const scaling = {
  fireball: 3, // 3
  boss: 5, // 5
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

const fireballOne = new AnimatedSprite(atlasLoader.bossFireball.animations.idle);
const fireballOneDraw = new Graphics();
fireballOne.name = 'fireballOne';
const fireballTwo = new AnimatedSprite(atlasLoader.bossFireball.animations.idle);
const fireballTwoDraw = new Graphics();
fireballTwo.name = 'fireballTwo';
const fireballThree = new AnimatedSprite(atlasLoader.bossFireball.animations.idle);
const fireballThreeDraw = new Graphics();
fireballThree.name = 'fireballThree';

let bossRadius = 0;
let bossAngle = 0;
let bossAngle1 = 0;
let bossAngle2 = 0;

export function createBoss(x: number, y: number) {
  boss.life = 500;
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
  boss.fireballsContainer.sortableChildren = true;
  for (const fireball of [fireballOne, fireballTwo, fireballThree]) {
    fireball.scale.set(scaling.fireball);
    fireball.animationSpeed = 0.17;
    fireball.stop();
    fireball.visible = false;
    boss.fireballsContainer.addChild(fireball);
  }

  for (const fireballDraw of [fireballOneDraw, fireballTwoDraw, fireballThreeDraw]) {
    fireballDraw.beginFill('yellow', 0.1);
    fireballDraw.drawRect(0, 0, fireballOne.width, fireballOne.height);
    fireballDraw.zIndex = -1;
    // boss.fireballsContainer.addChild(fireballDraw); // ! DURING DEV, DISPLAY FIREBALL HITBOX
  }

  boss.fireballsContainer.x = x;
  boss.fireballsContainer.y = y;
  camera.addChild(boss.fireballsContainer);
}

export function activateBossFireballs() {
  const fireballs = [fireballOne, fireballTwo, fireballThree];
  for (const iteratedFireball of fireballs) {
    iteratedFireball.play();
    iteratedFireball.visible = true;
  }
}

function moveBossFireballs() {
  let x = bossRadius * Math.cos(bossAngle);
  let y = bossRadius * Math.sin(bossAngle);
  fireballOne.position.set(x + 10, y + 20);
  fireballOneDraw.position.set(x + 10, y + 20);
  bossAngle += 0.09 / 2;

  x = bossRadius * Math.cos(bossAngle1);
  y = bossRadius * Math.sin(bossAngle1);
  fireballTwo.position.set(x + 15, y + 15);
  fireballTwoDraw.position.set(x + 15, y + 15);
  bossAngle1 += 0.07 / 2;

  x = bossRadius * Math.cos(bossAngle2);
  y = bossRadius * Math.sin(bossAngle2);
  fireballThree.position.set(x + 25, y + 10);
  fireballThreeDraw.position.set(x + 25, y + 10);
  bossAngle2 += 0.07 / 2;
}

export function bossGameLoop(delta: number) {
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
    bossDeathAnimation.animationSpeed = 0.2;
    bossDeathAnimation.loop = false;
    bossDeathAnimation.zIndex = -1;
    bossDeathAnimation.play();
    camera.addChild(bossDeathAnimation);
    app.ticker.remove(bossGameLoop);
    setTimeout(() => {
      uninitializeScene();
      initializeWinScreen();
    }, 3000);
  }
}
