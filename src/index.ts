// import './utils/atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
import app from './pixi/initialize';
import { camera } from './camera';
import './player/move'; // handle move inputs
import { atlasLoader } from './pixi/atlas-loader';
import { AnimatedSprite } from 'pixi.js';
import './player/fireball';

app.stage.addChild(camera); // create the world / camera

// display debug logs when press key 1
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  const allPixiObjects = app.stage.children;
  console.log(allPixiObjects);
  console.log(atlasLoader);

  // console.table(playerHitbox);
});

console.log(atlasLoader.bossFireball);

// test animations
// const animation = new AnimatedSprite(atlasLoader.boss.animations.idle);
// animation.animationSpeed = 0.18;
// animation.scale.set(2);
// animation.play();
// camera.addChild(animation);
