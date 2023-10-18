// if solution active trap desctived done
// else :    if trap actived, colision trap, degat once,
import { Graphics } from 'pixi.js';
import app from './pixi/initialize';
import { isColliding } from './math/collisions';
import { playerHitbox, playerStats } from './player/player';
import { lifeHud } from './hud';

// trap desactived xtime , return
// let trapActive = true;
// const trap = createTrap
// app.stage.addChild
// function destroye trap
// setTimeout(() => {}, timeout);// timeout
// trap active false
// app.stage.remove(trap)
// timeout

// app.degats.add (number)
// if trapActive & collision (trap,player
// console.log "COLLIS PIEGE"
// destroy trap)

// const myTrap = {
//   playerHaveReceiveDamage: false,
//   damage: 1,
//   isActive: false
// }

// trap
const trap = {
  x: app.screen.width / 2 + 120,
  y: app.screen.height / 2 - 50,
  width: 100,
  height: 100,
  isVisible: true,
  playerReceiveDamage: false,
};
const trapDraw = new Graphics();
trapDraw.beginFill('#ff8c8c', 0.7);
trapDraw.x = 40;
trapDraw.y = 40;
trapDraw.drawRect(
  0,
  0,
  trap.width,
  trap.height,
);
trapDraw.visible = trap.isVisible;
// camera.addChild(trapDraw);

setInterval(() => {
  trap.isVisible = !trap.isVisible;
  trapDraw.visible = trap.isVisible;
  if (!trap.isVisible) trap.playerReceiveDamage = false;
}, 1500);

function checkTrapsCollision() {
  if (!isColliding(trapDraw, playerHitbox)) {
    trap.playerReceiveDamage = false;
    return;
  }

  if (!trap.isVisible || trap.playerReceiveDamage) return;
  trap.playerReceiveDamage = true;
  playerStats.life -= 1;
  lifeHud.text = `Life: ${playerStats.life}`;
  console.log('Collision trap');
}

app.ticker.add(checkTrapsCollision);
