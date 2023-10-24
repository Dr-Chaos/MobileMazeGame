import { AnimatedSprite, Graphics } from 'pixi.js';
import { playerContainer } from './player';
import app from '../pixi/initialize';
import { atlasLoader } from '../pixi/atlas-loader';
import { camera } from '../camera';
import { playerAnimationsContainer } from './animations/animations';

// boss fireball
// const fireball = new AnimatedSprite(atlasLoader.bossFireball.animations.idle);
// witch fireball
const fireball = new AnimatedSprite(atlasLoader.fireball.animations.idle);
fireball.animationSpeed = 0.15;
fireball.scale.set(1.2);
fireball.play();
fireball.zIndex = 2;
camera.addChild(fireball); // DURING DEV, DISABLE THE DISPLAYED FIREBALL (THE FIREBALL HITBOX IS STILL ACTIVE)

const radius = 50;
let angle = 2;
function moveFireball() {
  fireball.x = playerContainer.x + radius * Math.cos(angle);
  fireball.y = playerContainer.y + radius * Math.sin(angle);
  angle += 0.1;
}

app.ticker.add(moveFireball);

export { fireball };
