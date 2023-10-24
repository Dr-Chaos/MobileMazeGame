import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import app from './pixi/initialize';

// forme (rectangle)
const gameover = new Graphics();
gameover.beginFill('black');
gameover.drawRect(0, 0, app.screen.width, app.screen.height);

app.stage.addChild(gameover);

const screenloser = Sprite.from('./screens/gameover.png');
app.stage.addChild(screenloser);

screenloser.anchor.x = 0.5;
screenloser.x = app.screen.width / 2;

screenloser.anchor.y = 0.5;
screenloser.y = app.screen.height / 2;

const style = new TextStyle({

  dropShadowBlur: 3,
  dropShadowDistance: 12,
  fontVariant: 'small-caps',
  fontWeight: 'bold',
  letterSpacing: 16,
  lineJoin: 'bevel',
  stroke: '#d20419',
  strokeThickness: 5,
  fontSize: 25,

});
const title = new Text('Game Over', style);

title.anchor.x = 0.5;
title.x = app.screen.width / 2;

title.anchor.y = 6;
title.y = app.screen.height / 2;

app.stage.addChild(title);

// image

// lorsque l'on clique sur le boutton
const replaybutton = new Text('Replay', style);

replaybutton.anchor.x = 0.5;
replaybutton.x = app.screen.width / 2;

replaybutton.anchor.y = -3;
replaybutton.y = app.screen.height / 2;

replaybutton.interactive = true;
replaybutton.on('click', () => {
  alert('clicked');
});
app.stage.addChild(replaybutton);
