import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import app from '../pixi/initialize';
import { play } from '../utils/utils';
import { atlasLoader } from '../pixi/atlas-loader';

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
    fontFamily: atlasLoader.yoster.family,
    dropShadowColor: '#0a76db',
    fill: ['#14520C', '#738C74'],
    fillGradientStops: [0.2],
    fontVariant: 'small-caps',
    fontWeight: 'bolder',
    letterSpacing: 5,
    stroke: '794F6C',
    strokeThickness: 2,
    fontSize: 60,
  });
  const gameOverTitle = new Text('GAME OVER', textStyle);
  gameOverTitle.anchor.x = 0.5;
  gameOverTitle.x = app.screen.width / 2;
  gameOverTitle.anchor.y = 2.9;
  gameOverTitle.y = app.screen.height / 2;
  app.stage.addChild(gameOverTitle);

  const playAgainButton = new Text('> Play again', textStyle);
  playAgainButton.anchor.x = 0.5;
  playAgainButton.x = app.screen.width / 2;
  playAgainButton.anchor.y = -0.55;
  playAgainButton.y = app.screen.height / 2;
  playAgainButton.eventMode = 'dynamic';
  playAgainButton.on('click', () => {
    play();
  });
  playAgainButton.on('touchstart', () => {
    play();
  });
  app.stage.addChild(playAgainButton);
}
