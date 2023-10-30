import {
  Graphics, Sprite, Text, type TextStyle,
} from 'pixi.js';
import { Sound } from '@pixi/sound';
import app from '../pixi/initialize';
import { play } from '../utils/utils';
import { atlasLoader } from '../pixi/atlas-loader';

export function initializeWinScreen() {
  const background = new Graphics();
  background.beginFill('black');
  background.drawRect(0, 0, app.screen.width, app.screen.height);
  app.stage.addChild(background);

  const backgroundImage = Sprite.from('./screens/v3/win.png');
  // start.width = app.screen.width;
  // start.height = app.screen.height;
  backgroundImage.anchor.x = 0.5;
  backgroundImage.x = app.screen.width / 2;
  backgroundImage.anchor.y = 0.5;
  backgroundImage.y = app.screen.height / 2;
  app.stage.addChild(backgroundImage);

  const textStyle: TextStyle = {
    dropShadowColor: '#0a76db',
    fill: ['#ba7956', '#c97090'],
    fillGradientStops: [0.2],
    fontFamily: atlasLoader.yoster.family,
    fontVariant: 'small-caps',
    fontWeight: 'bolder',
    letterSpacing: 5,
    stroke: '#a4c09f',
    strokeThickness: 2,
    fontSize: app.screen.width / 15,
  };
  const title = new Text('CONGRATULATION !', textStyle);
  title.anchor.x = 0.5;
  title.x = app.screen.width / 2;
  title.anchor.y = 2.4;
  title.y = app.screen.height / 2;
  app.stage.addChild(title);

  const clicksound = Sound.from('/sons/bruitages/key.wav');
  const winmusic = Sound.from(atlasLoader.musicwin);
  const backgroundmusic = Sound.from('/sons/musiques/musicdungeon2.mp3');
  const playButtonStyle = { ...textStyle, fontSize: app.screen.width / 11 };
  const playButton = new Text('> Replay', playButtonStyle);
  playButton.anchor.x = 0.5;
  playButton.x = app.screen.width / 2;
  playButton.anchor.y = -1.2;
  playButton.y = app.screen.height / 2;
  playButton.eventMode = 'dynamic';
  playButton.on('click', () => {
    play();
    clicksound.play();
    clicksound.volume = 0.4;
    winmusic.play();
    winmusic.stop();
    backgroundmusic.play();
  });
  playButton.on('touchstart', () => {
    play();
    backgroundmusic.stop();
  });
  app.stage.addChild(playButton);
  winmusic.play();
  backgroundmusic.stop();
}
