import {
  Application, BaseTexture, Container, Graphics, SCALE_MODES,
} from 'pixi.js';
import * as PIXI from 'pixi.js';

const player = new Graphics();
player.beginFill(0xFF_00_00); // Utilisez un nombre hexadécimal pour la couleur
player.drawRect(0, 0, 100, 100);
camera.addChild(player);

const walter = new Graphics();
walter.beginFill(0x00_00_FF); // Utilisez un nombre hexadécimal pour la couleur
walter.drawRect(-40, -40, 30, 30);
camera.addChild(walter);

app.ticker.add(() => {
  camera.pivot.copyFrom(player);
});

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
});
document.body.append(app.view);

const camera = new PIXI.Container();
app.stage.addChild(camera);

const worldWidth = 480;
const worldHeight = 480;

function updateCamera() {
  camera.position.x = Math.min(Math.max(camera.position.x, 0), worldWidth - app.renderer.width);
  camera.position.y = Math.min(Math.max(camera.position.y, 0), worldHeight - app.renderer.height);
}

function update(delta: number) {
  updateCamera();
}

app.ticker.add((delta) => {
  update(delta);
});

update(0);
