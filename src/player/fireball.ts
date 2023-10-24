import { AnimatedSprite, Graphics } from 'pixi.js';
import app from '../pixi/initialize';
import { atlasLoader } from '../pixi/atlas-loader';
import { camera } from '../camera';
import { playerAnimationsContainer } from './animations/animations';
import { player } from './player';

// boss fireball
// const fireball = new AnimatedSprite(atlasLoader.bossFireball.animations.idle);
// witch fireball
const fireball = new AnimatedSprite(atlasLoader.fireball.animations.idle);
let radius = 0;
let angle = 0;

export function initializeFireball() {
  fireball.animationSpeed = 0.15;
  fireball.scale.set(1.2);
  fireball.play();
  fireball.zIndex = 2;
  camera.addChild(fireball); // DURING DEV, DISABLE THE DISPLAYED FIREBALL (THE FIREBALL HITBOX IS STILL ACTIVE)
  radius = 50;
  angle = 2;
}

export function moveFireball() {
  fireball.x = player.container.x + radius * Math.cos(angle);
  fireball.y = player.container.y + radius * Math.sin(angle);
  angle += 0.1;
}

export { fireball };
