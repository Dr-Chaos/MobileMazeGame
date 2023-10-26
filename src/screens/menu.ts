import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import app from '../pixi/initialize';
import { clearAndInitializeScene, initializeScene } from '../scene';
import { clearContainerChildrenRecursively } from '../utils/utils';
import { camera } from '../camera';

export function clearMenu() {
  clearContainerChildrenRecursively(app.stage);
  app.stage.addChild(camera);
}

export function initializeMenu() {
  const menu = new Graphics();
  menu.beginFill('black');
  menu.drawRect(0, 0, app.screen.width, app.screen.height);

  app.stage.addChild(menu);

  const start = Sprite.from('./screens/start.png');
  app.stage.addChild(start);

  start.anchor.x = 0.5;
  start.x = app.screen.width / 2;

  start.anchor.y = 0.5;
  start.y = app.screen.height / 2;

  const style = new TextStyle({
    dropShadow: true,
    dropShadowAlpha: 0.8,
    dropShadowAngle: -1.5,
    dropShadowBlur: 3,
    dropShadowDistance: 12,
    fontVariant: 'small-caps',
    fontWeight: 'bold',
    letterSpacing: 9,
    lineJoin: 'bevel',
    stroke: '#d20419',
    strokeThickness: 3,
    fontSize: 16,

  });
  const title = new Text('Witch Dungeon', style);

  title.anchor.x = 0.45;
  title.x = app.screen.width / 2;

  title.anchor.y = 6.1;
  title.y = app.screen.height / 2;

  app.stage.addChild(title);

  // image
  // lorsque l'on clique sur le boutton
  const playbutton = new Text('Play', style);

  playbutton.anchor.x = 0.43;
  playbutton.x = app.screen.width / 2;

  playbutton.anchor.y = 1.5;
  playbutton.y = app.screen.height / 2;

  playbutton.interactive = true;
  playbutton.on('click', () => {
    clearMenu();
    initializeScene();
    // alert('clicked');
  });
  app.stage.addChild(playbutton);
}
