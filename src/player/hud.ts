import { AnimatedSprite, Text } from 'pixi.js';
import inventory from './inventory';
import app from '../pixi/initialize';
import { playerStats } from './stats';
import { atlasLoader } from '../pixi/atlas-loader';

const lifeAnimation = new AnimatedSprite(atlasLoader.torch.animations.idle);
lifeAnimation.play();
lifeAnimation.animationSpeed = 0.17;
lifeAnimation.scale.set(2.5);
const lifeText = new Text(`${playerStats.life}`, {
  fill: 'white',
});
lifeAnimation.x = 10;
lifeAnimation.y = 0;
lifeText.x = (lifeAnimation.x + lifeAnimation.width) + 5;
lifeText.y = 0;
app.stage.addChild(lifeAnimation);
app.stage.addChild(lifeText);

const keyAnimation = new AnimatedSprite(atlasLoader.key.animations.idle);
keyAnimation.play();
keyAnimation.animationSpeed = 0.17;
keyAnimation.scale.set(2.5);
const keyText = new Text(`${inventory.keys}`, {
  fill: 'white',
});
keyAnimation.x = 10;
keyAnimation.y = lifeText.height + 5;
keyText.x = (keyAnimation.x + keyAnimation.width) + 5;
keyText.y = lifeText.height + 5;
app.stage.addChild(keyAnimation);
app.stage.addChild(keyText);

// export {
//   lifeText as lifeHud,
//   keyText as keyHud,
// };

export function updateLifeHud(value: number) {
  lifeText.text = value;
}

export function updateKeyHud(value: number) {
  keyText.text = value;
}
