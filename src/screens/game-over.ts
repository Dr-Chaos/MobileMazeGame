import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import app from '../pixi/initialize';
import { initializeScene } from '../scene';
import { clearStage, play } from '../utils/utils';

export function initializeGameOverScreen() {
  const background = new Graphics();
  background.beginFill('black');
  background.drawRect(0, 0, app.screen.width, app.screen.height);
  app.stage.addChild(background);

  const backgroundImage = Sprite.from('./screens/v2/game-over.png');
  // start.width = app.screen.width;
  // start.height = app.screen.height;
  backgroundImage.anchor.x = 0.5;
  backgroundImage.x = app.screen.width / 2;
  backgroundImage.anchor.y = 0.5;
  backgroundImage.y = app.screen.height / 2;
  app.stage.addChild(backgroundImage);

  const gameOverTitleStyle = new TextStyle({
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
  const gameOverTitle = new Text('GAME OVER', gameOverTitleStyle);
  gameOverTitle.anchor.x = 0.45;
  gameOverTitle.x = app.screen.width / 2;
  gameOverTitle.anchor.y = 6.1;
  gameOverTitle.y = app.screen.height / 2;
  app.stage.addChild(gameOverTitle);

  const playAgainButton = new Text('Play again', gameOverTitleStyle);
  playAgainButton.anchor.x = 0.43;
  playAgainButton.x = app.screen.width / 2;
  playAgainButton.anchor.y = 1.5;
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
