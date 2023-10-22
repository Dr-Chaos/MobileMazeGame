import { AnimatedSprite } from 'pixi.js';
import { playerContainer } from './player';
import app from '../pixi/initialize';
import { atlasLoader } from '../pixi/atlas-loader';
import { camera } from '../camera';

export function createfireball(): AnimatedSprite {
  const fireball = new AnimatedSprite(atlasLoader.fireball.animations.idle);
  fireball.scale.set(1);
  fireball.animationSpeed = 0.17;
  fireball.play();

  // It's important to return the 'fireball' before you try to use it outside the function.
  return fireball;
} // This closing brace was missing, causing your issue.

// Assuming 'fireball' is accessible in this scope (i.e., it's declared or imported in this file)
// you would add it to the playerContainer here, after the 'createfireball' function.
const fireball = createfireball(); // You need to create the fireball using the function above.
camera.addChild(fireball);

const radius = 50;
let angle = 2;

function moveFireball() {
  fireball.x = playerContainer.x + radius * Math.cos(angle);
  fireball.y = playerContainer.y + radius * Math.sin(angle);
  angle += 0.1;
}

app.ticker.add(moveFireball);

// If 'fireball' is a variable in the scope of this module, you can export it like this.
export { fireball };
