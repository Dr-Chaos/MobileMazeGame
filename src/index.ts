import './index.css';
// import './atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
// import './map-objects/traps';
// import './player/fireball';
import { AnimatedSprite } from 'pixi.js';
import app from './pixi/initialize';
import { camera } from './camera';
// import { playerHitbox } from './player/player';
import './player/move'; // handle move inputs
import { createSkeleton } from './map-objects/skeleton';
import './map-objects/skeletonpath';
import { inputMovementDirection } from './input/mouvement';
import { boss, createBoss } from './map-objects/boss';
import { skull1, skull2, createSkull } from './map-objects/skull';
import { atlasLoader } from './pixi/atlas-loader';

app.stage.addChild(camera); // create the world / camera

// créer un skeleton ici
// createSkeleton(0, 0);
createBoss(-40, -450);
// Press D key to display debug logs
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  // const allPixiObjects = app.stage.children;
  // console.table(playerHitbox);
});

const animation = new AnimatedSprite(atlasLoader.boss.animations.idle);
animation.animationSpeed = 0.18;
animation.scale.set(2);
animation.play();
camera.addChild(animation);
