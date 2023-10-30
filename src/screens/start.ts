import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import { Sound } from '@pixi/sound';
import app from '../pixi/initialize';
import { play } from '../utils/utils';
import { fontLoader } from '../pixi/atlas-loader';
import { sounds } from '../sounds';

export function initializeStartScreen() {
  const background = new Graphics();
  background.beginFill('black');
  background.drawRect(0, 0, app.screen.width, app.screen.height);
  app.stage.addChild(background);

  const backgroundImage = Sprite.from('./screens/v3/start.png');
  // start.width = app.screen.width;
  // start.height = app.screen.height;
  backgroundImage.anchor.x = 0.5;
  backgroundImage.x = app.screen.width / 2;
  backgroundImage.anchor.y = 0.5;
  backgroundImage.y = app.screen.height / 2;
  app.stage.addChild(backgroundImage);

  const textStyle = new TextStyle({
    fontFamily: fontLoader.yoster.family,
    dropShadowColor: '#0a76db',
    fill: ['#68386e', '#a94f05', '#8b5a5d'],
    fillGradientStops: [0.2],
    fontVariant: 'small-caps',
    fontWeight: 'bolder',
    letterSpacing: 5,
    stroke: '#3e6e38',
    strokeThickness: 6,
    fontSize: app.screen.width / 11,
  });
  const title = new Text('Witch+Skeletons', textStyle);
  title.anchor.x = 0.5;
  title.x = app.screen.width / 2;
  title.anchor.y = 2.4;
  title.y = app.screen.height / 2;
  app.stage.addChild(title);

  const playButton = new Text('> Play', textStyle);
  playButton.anchor.x = 0.5;
  playButton.x = app.screen.width / 2;
  playButton.anchor.y = -1.2;
  playButton.y = app.screen.height / 2;
  playButton.eventMode = 'dynamic';
  playButton.on('click', () => {
    play();
    sounds.key.play();
    sounds.key.volume = 0.4;
  });
  playButton.on('touchstart', () => {
    play();
    sounds.key.play();
    sounds.key.volume = 0.4;
  });
  app.stage.addChild(playButton);
  sounds.background.play();
  sounds.background.loop = true;
}
