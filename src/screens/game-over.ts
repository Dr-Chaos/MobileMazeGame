import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import { Sound } from '@pixi/sound';
import app from '../pixi/initialize';
import { play } from '../utils/utils';
import { fontLoader } from '../pixi/atlas-loader';
import { sounds } from '../sounds';

export function initializeGameOverScreen() {
  const background = new Graphics();
  background.beginFill('black');
  background.drawRect(0, 0, app.screen.width, app.screen.height);
  app.stage.addChild(background);

  const backgroundImage = Sprite.from('./screens/v3/game-over.png');
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
    fill: ['#14520C', '#738C74'],
    fillGradientStops: [0.2],
    fontVariant: 'small-caps',
    fontWeight: 'bolder',
    letterSpacing: 5,
    stroke: '794F6C',
    strokeThickness: 2,
    fontSize: app.screen.width / 11,
  });
  const gameOverTitle = new Text('GAME OVER', textStyle);
  gameOverTitle.anchor.x = 0.5;
  gameOverTitle.x = app.screen.width / 2;
  gameOverTitle.anchor.y = 2.4;
  gameOverTitle.y = app.screen.height / 2;
  app.stage.addChild(gameOverTitle);

  const playAgainButton = new Text('> Play again', textStyle);
  playAgainButton.anchor.x = 0.5;
  playAgainButton.x = app.screen.width / 2;
  playAgainButton.anchor.y = -1.2;
  playAgainButton.y = app.screen.height / 2;
  playAgainButton.eventMode = 'dynamic';
  playAgainButton.on('click', () => {
    play();
    sounds.key.play();
    sounds.key.volume = 0.4;
  });
  playAgainButton.on('touchstart', () => {
    play();
    sounds.key.play();
    sounds.key.volume = 0.4;
  });
  app.stage.addChild(playAgainButton);
}
