import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import app from '../pixi/initialize';
import { play } from '../utils/utils';
import { atlasLoader } from '../pixi/atlas-loader';

export function initializeStartScreen() {
  const background = new Graphics();
  background.beginFill('black');
  background.drawRect(0, 0, app.screen.width, app.screen.height);
  app.stage.addChild(background);

  const backgroundImage = Sprite.from('./screens/v3/start.png');
  backgroundImage.anchor.x = 0.5;
  backgroundImage.x = app.screen.width / 2;
  backgroundImage.anchor.y = 0.5;
  backgroundImage.y = app.screen.height / 2;
  app.stage.addChild(backgroundImage);

  const fontSize = app.screen.width / 11;
  const fontSizeMaximumValue = 60;
  const fontSizeMaximum = fontSize <= fontSizeMaximumValue ? fontSize : fontSizeMaximumValue;
  const textStyle = new TextStyle({
    fontFamily: atlasLoader.yoster.family,
    fill: '#e6e6e6',
    fontWeight: 'bolder',
    letterSpacing: 5,
    stroke: '#3e6e38',
    strokeThickness: 2,
    fontSize: fontSizeMaximum,
  });

  const title = new Text('Witch+Skeletons', textStyle);
  title.anchor.x = 0.5;
  title.x = app.screen.width / 2;
  title.y = app.screen.height / 5;
  const titleWidth = app.screen.width - 40;
  const titleWidthMax = 700;
  title.width = titleWidth <= titleWidthMax ? titleWidth : titleWidthMax;
  app.stage.addChild(title);

  const playButton = new Text('> Play', textStyle);
  playButton.anchor.x = 0.5;
  playButton.x = app.screen.width / 2;
  playButton.y = app.screen.height / 1.6;
  playButton.eventMode = 'dynamic';
  playButton.on('click', () => {
    play();
  });
  playButton.on('touchstart', () => {
    play();
  });
  app.stage.addChild(playButton);
}
