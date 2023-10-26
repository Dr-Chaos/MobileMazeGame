import { AnimatedSprite, Text } from 'pixi.js';
import { Sound } from '@pixi/sound';
import app from '../pixi/initialize';
import { playerStats } from './stats';
import { atlasLoader } from '../pixi/atlas-loader';
import { inventory } from './inventory';

const lifeAnimation = new AnimatedSprite(atlasLoader.heart.animations.idle);
const lifeText = new Text();
const keyAnimation = new AnimatedSprite(atlasLoader.hudkey.animations.idle);
const keyText = new Text();
const backgroundmusic = Sound.from(atlasLoader.musicdungeon2);

export function initializeHud() {
  lifeAnimation.play();
  lifeAnimation.animationSpeed = 0.17;
  lifeAnimation.scale.set(2.5);

  lifeAnimation.x = 10;
  lifeAnimation.y = 0;
  lifeText.text = playerStats.life;
  lifeText.style = {
    fill: 'white',
  };
  lifeText.x = (lifeAnimation.x + lifeAnimation.width) + 5;
  lifeText.y = 0;
  app.stage.addChild(lifeAnimation);
  app.stage.addChild(lifeText);

  keyAnimation.play();
  keyAnimation.animationSpeed = 0.17;
  keyAnimation.scale.set(2.5);

  keyAnimation.x = 10;
  keyAnimation.y = lifeText.height + 5;
  keyText.text = inventory.keys;
  keyText.style = {
    fill: 'white',
  };
  keyText.x = (keyAnimation.x + keyAnimation.width) + 5;
  keyText.y = lifeText.height + 5;
  app.stage.addChild(keyAnimation);
  app.stage.addChild(keyText);
  backgroundmusic.play();
}

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
