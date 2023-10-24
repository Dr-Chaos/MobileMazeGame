import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import app from './pixi/initialize';

// forme (rectangle)
const youwin = new Graphics();
youwin.beginFill('black');
youwin.drawRect(0, 0, app.screen.width, app.screen.height);

app.stage.addChild(youwin);

const screenwinner = Sprite.from('./screens/win.png');
app.stage.addChild(screenwinner);

screenwinner.anchor.x = 0.5;
screenwinner.x = app.screen.width / 2;

screenwinner.anchor.y = 0.5;
screenwinner.y = app.screen.height / 2;

const style = new TextStyle({

  dropShadowBlur: 3,
  dropShadowDistance: 12,
  fontVariant: 'small-caps',
  fontWeight: 'bold',
  letterSpacing: 10,
  lineJoin: 'bevel',
  stroke: '#d20419',
  strokeThickness: 5,
  fontSize: 20,

});
const title = new Text('You Win !', style);

title.anchor.x = 0.5;
title.x = app.screen.width / 2;

title.anchor.y = 4.3;
title.y = app.screen.height / 2;

app.stage.addChild(title);

// image

// lorsque l'on clique sur le boutton
const replaybutton = new Text('Replay', style);

replaybutton.anchor.x = 0.5;
replaybutton.x = app.screen.width / 2;

replaybutton.anchor.y = 1;
replaybutton.y = app.screen.height / 2;

replaybutton.interactive = true;
replaybutton.on('click', () => {
  alert('clicked');
});
app.stage.addChild(replaybutton);
