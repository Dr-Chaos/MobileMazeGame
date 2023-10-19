import { Text } from 'pixi.js';
import inventory from './inventory';
import app from '../pixi/initialize';
import { playerStats } from './stats';

const lifeHud = new Text(`Life: ${playerStats.life}`, {
  fill: 'white',
});
app.stage.addChild(lifeHud);

const keyHud = new Text(`Keys: ${inventory.keys}`, {
  fill: 'white',
});
keyHud.y = lifeHud.height + 5;
app.stage.addChild(keyHud);

export {
  lifeHud,
  keyHud,
};
