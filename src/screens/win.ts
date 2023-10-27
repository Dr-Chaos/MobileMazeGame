import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import app from '../pixi/initialize';
import { initializeScene } from '../scene';
import { clearStage } from '../utils/utils';

export function initializeWinScreen() {
  const background = new Graphics();
  background.beginFill('black');
  background.drawRect(0, 0, app.screen.width, app.screen.height);
  app.stage.addChild(background);

  const backgroundImage = Sprite.from('./screens/start.png');
  // start.width = app.screen.width;
  // start.height = app.screen.height;
  backgroundImage.anchor.x = 0.5;
  backgroundImage.x = app.screen.width / 2;
  backgroundImage.anchor.y = 0.5;
  backgroundImage.y = app.screen.height / 2;
  app.stage.addChild(backgroundImage);

  const titleStyle = new TextStyle({
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
  const title = new Text('CONGRATULATION !', titleStyle);
  title.anchor.x = 0.45;
  title.x = app.screen.width / 2;
  title.anchor.y = 6.1;
  title.y = app.screen.height / 2;
  app.stage.addChild(title);

  const playButton = new Text('Play', titleStyle);
  playButton.anchor.x = 0.43;
  playButton.x = app.screen.width / 2;
  playButton.anchor.y = 1.5;
  playButton.y = app.screen.height / 2;
  playButton.interactive = true;
  playButton.on('click', () => {
    clearStage();
    initializeScene();
  });
  app.stage.addChild(playButton);
}
