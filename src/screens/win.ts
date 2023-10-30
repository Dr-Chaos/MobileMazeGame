import {
  Graphics, type ITextStyle, Sprite, Text,
} from 'pixi.js';
import app from '../pixi/initialize';
import { play } from '../utils/utils';
import { atlasLoader } from '../pixi/atlas-loader';

export function initializeWinScreen() {
  const background = new Graphics();
  background.beginFill('black');
  background.drawRect(0, 0, app.screen.width, app.screen.height);
  app.stage.addChild(background);

  const backgroundImage = Sprite.from('./screens/v3/win.png');
  backgroundImage.anchor.x = 0.5;
  backgroundImage.x = app.screen.width / 2;
  backgroundImage.anchor.y = 0.5;
  backgroundImage.y = app.screen.height / 2;
  app.stage.addChild(backgroundImage);

  const fontSize = app.screen.width / 11;
  const fontSizeMaximumValue = 60;
  const fontSizeMaximum = fontSize <= fontSizeMaximumValue ? fontSize : fontSizeMaximumValue;
  const textStyle: Partial<ITextStyle> = {
    fontFamily: atlasLoader.yoster.family,
    dropShadowColor: '#0a76db',
    // fill: ['#ba7956', '#c97090'],
    fill: '#e6e6e6',
    fillGradientStops: [0.2],
    fontVariant: 'small-caps',
    fontWeight: 'bolder',
    letterSpacing: 5,
    stroke: '#a4c09f',
    strokeThickness: 2,
    fontSize: fontSizeMaximum,
  };
  const title = new Text('CONGRATULATION !', textStyle);
  title.anchor.x = 0.5;
  title.x = app.screen.width / 2;
  title.y = app.screen.height / 5;
  const titleWidth = app.screen.width - 40;
  const titleWidthMax = 700;
  title.width = titleWidth <= titleWidthMax ? titleWidth : titleWidthMax;
  app.stage.addChild(title);

  const playButtonStyle = { ...textStyle, fontSize: fontSizeMaximum };
  const playButton = new Text('> Replay', playButtonStyle);
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
