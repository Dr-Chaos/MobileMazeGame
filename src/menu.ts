import {
  Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';
import { Sound } from '@pixi/sound';
import app from './pixi/initialize';
import { atlasLoader } from './pixi/atlas-loader';

// forme (rectangle)
const menu = new Graphics();
menu.beginFill('black');
menu.drawRect(0, 0, app.screen.width, app.screen.height);

app.stage.addChild(menu);

const start = Sprite.from('./screens/start.png');
app.stage.addChild(start);

start.anchor.x = 0.5;
start.x = app.screen.width / 2;

start.anchor.y = 0.5;
start.y = app.screen.height / 2;

const style = new TextStyle({
  dropShadowColor: '#0a76db',
  fill: [

    '#68386e',
    '#a94f05',
    '#8b5a5d',

  ],
  fillGradientStops: [
    0.2,
  ],
  fontFamily: atlasLoader.yoster.family,
  fontVariant: 'small-caps',
  fontWeight: 'bolder',
  letterSpacing: 5,
  stroke: '#3e6e38',
  strokeThickness: 6,
  fontSize: app.screen.width / 11,
});
const title = new Text('Witch+Skeletons', style);

title.anchor.x = 0.5;
title.x = app.screen.width / 2;

title.anchor.y = 2.4;
title.y = app.screen.height / 2;

app.stage.addChild(title);

// image

const clicksound = Sound.from('./sons/bruitages/key.wav');

// lorsque l'on clique sur le boutton
const playbutton = new Text('> Play', style);

playbutton.anchor.x = 0.5;
playbutton.x = app.screen.width / 2;

playbutton.anchor.y = -1.5;
playbutton.y = app.screen.height / 2;

playbutton.interactive = true;
playbutton.on('click', () => {
  alert('clicked');
});
app.stage.addChild(playbutton);

const backgroundmusic = Sound.from({
  url: './sons/musiques/musicdungeon2.mp3',
  autoPlay: true,

});
app.stage.addChild(backgroundmusic);
