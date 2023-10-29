import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import { Sound } from '@pixi/sound';
import app from './pixi/initialize';
import { atlasLoader } from './pixi/atlas-loader';

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
  dropShadowColor: '#0a76db',
  fill: [
    '#ba7956',
    '#c97090',

  ],
  fillGradientStops: [
    0.2,
  ],
  fontFamily: atlasLoader.yoster.family,
  fontVariant: 'small-caps',
  fontWeight: 'bolder',
  letterSpacing: 5,
  stroke: '#a4c09f',
  strokeThickness: 2,
  fontSize: app.screen.width / 11,
});
const title = new Text('You Win !', style);

title.anchor.x = 0.5;
title.x = app.screen.width / 2;

title.anchor.y = 2.9;
title.y = app.screen.height / 2;

app.stage.addChild(title);

// image

// lorsque l'on clique sur le boutton
const replaybutton = new Text('> Replay', style);

replaybutton.anchor.x = 0.5;
replaybutton.x = app.screen.width / 2;

replaybutton.anchor.y = -1.8;
replaybutton.y = app.screen.height / 2;

replaybutton.interactive = true;
replaybutton.on('click', () => {
  alert('clicked');
});
app.stage.addChild(replaybutton);

const musicwin = Sound.from({
  url: atlasLoader.musicwin,
  autoPlay: true,

});
app.stage.addChild(musicwin);
