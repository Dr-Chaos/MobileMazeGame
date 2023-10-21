// import './utils/atlas-generator';
import './map/map-draw-layers';
import './map/map-collisions';
// import './map-objects/traps';
// import './player/fireball';
import app from './pixi/initialize';
import { camera } from './camera';
// import { playerHitbox } from './player/player';
import './player/move'; // handle move inputs
// import { createSkeleton } from './map-objects/skeleton';
import { atlasLoader } from './pixi/atlas-loader';
import { collisionResponseDirection, isColliding } from './math/collisions';
import { playerHitbox } from './player/player';
import { Graphics } from 'pixi.js';
// import { createSkeleton } from './map-objects/skeleton';

app.stage.addChild(camera); // create the world / camera

// const maPorte = {
//   x: 10,
//   y: 10,
//   width: 100,
//   height: 100,
// };

// const t = new Graphics();
// t.beginFill('red');
// t.drawRect(maPorte.x, maPorte.y, maPorte.width, maPorte.height);
// camera.addChild(t);
// app.ticker.add(() => {
//   if (isColliding(maPorte, playerHitbox)) {
//     movePlayer(collisionResponseDirection(playerHitbox, maPorte));
//   }
// });

// display debug logs when press key 1
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Digit1') return;
  const allPixiObjects = app.stage.children;
  console.log(allPixiObjects);
  console.log(atlasLoader);

  // console.table(playerHitbox);
});
