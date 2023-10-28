import { AnimatedSprite, Text } from 'pixi.js';
import app from '../pixi/initialize';
import { playerStats } from './stats';
import { atlasLoader } from '../pixi/atlas-loader';
import { inventory } from './inventory';

const lifeAnimation = new AnimatedSprite(atlasLoader.heart.animations.default);
const lifeText = new Text();
const keyAnimation = new AnimatedSprite(atlasLoader.hudKey.animations.default);
const keyText = new Text();

const fpsText = new Text();

export function initializeHud() {
  // life animation
  lifeAnimation.play();
  lifeAnimation.animationSpeed = 0.17;
  lifeAnimation.scale.set(1.8);
  lifeAnimation.x = 10;
  lifeAnimation.y = 0;
  lifeAnimation.animationSpeed = 0.04;
  // life text
  lifeText.text = playerStats.life;
  lifeText.style = {
    fill: 'white',
  };
  lifeText.x = (lifeAnimation.x + lifeAnimation.width) + 5;
  lifeText.y = 0;
  app.stage.addChild(lifeAnimation);
  app.stage.addChild(lifeText);

  // key animation
  keyAnimation.play();
  keyAnimation.animationSpeed = 0.17;
  keyAnimation.scale.set(2.2);
  keyAnimation.x = 6.4;
  keyAnimation.y = lifeText.height + 5;
  // key text
  keyText.text = inventory.keys;
  keyText.style = {
    fill: 'white',
  };
  keyText.x = (keyAnimation.x + keyAnimation.width) + 5;
  keyText.y = lifeText.height + 7;
  app.stage.addChild(keyAnimation);
  app.stage.addChild(keyText);

  fpsText.x = 20;
  fpsText.y = lifeText.height + keyText.height + 10;
  fpsText.style = {
    fill: 'white',
  };
  app.stage.addChild(fpsText);
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

export function updateFpsText(value: number) {
  fpsText.text = Math.trunc(value) === 59 ? 60 : Math.trunc(value);
}
