import { Container, Graphics } from 'pixi.js';
import app from '../pixi/initialize';
import witchIdleAnimation from './idle';
import witchWalkAnimation from './walk';

// ANIMATION

// dans ce container on mettra les sprites/animations
// axe x
// et y

// 128
// 105
const playerContainer = new Container();
playerContainer.x = 130; // +ou-la valeurs de decalage ?
playerContainer.y = 130; // +ou-la valeurs de decalage ?
// playerContainer.pivot.x = (playerContainer.width / playerContainer.scale.x) * 0.5;
// playerContainer.pivot.y = (playerContainer.height / playerContainer.scale.y) * 0.5;
// const x = {
//   position: player,
//   container: playerContainer,
// };

const base = {
  x: 32 * 2,
  y: 48 * 2,
};
const scaleX = 1.5;
const scaleY = 1.5;
const offsetX = 23;
const offsetY = 20;
const player = {
  x: playerContainer.x - offsetX,
  y: playerContainer.y + offsetY,
  width: base.x / scaleX,
  height: base.y / scaleY,
  life: 5,
};

// hitbox
const playerHitbox = new Graphics();
playerHitbox.beginFill('#8c9fff', 0.4);
playerHitbox.x = player.x;
playerHitbox.y = player.y;
playerHitbox.drawRect(0, 0, player.width, player.height);
app.stage.addChild(playerHitbox);

// animated sprite
app.stage.addChild(playerContainer);
playerContainer.addChild(witchIdleAnimation);
playerContainer.addChild(witchWalkAnimation);

app.ticker.add((delta: number) => { // Ligne 48 : Vous ajoutez witchAnimation et witchWalkAnimation comme enfants au même conteneur sans condition, ce qui pourrait poser problème selon la logique de votre jeu car les deux animations pourraient s'afficher en même temps.
  player.x = playerContainer.x - offsetX;
  player.y = playerContainer.y + offsetY;
  playerHitbox.x = playerContainer.x - offsetX;
  playerHitbox.y = playerContainer.y + offsetY;
});

enum Movements { // app.ticker.add((delta: number) => {...}); Le paramètre delta n'est pas utilisé dans le bloc de code. Même s'il n'agit pas directement comme une erreur de syntaxe, c'est une mauvaise pratique de laisser des paramètres inutilisés dans vos fonctions.
  Idle = 'Idle',
  Walk = 'Walk',
}

const movement = {
  current: 'Idle',
};

const animations = [
  { state: Movements.Idle, animation: witchIdleAnimation },
  { state: Movements.Walk, animation: witchWalkAnimation },

];

app.ticker.add(() => {
  for (const animation of animations) {
    switch (movement.current) {
      case Movements.Idle:
        animation.animation.visible = animation.state === Movements.Idle;
        break;
      case Movements.Walk:
        animation.animation.visible = animation.state === Movements.Walk;

        break;
      default:
        animation.animation.visible = animation.state === Movements.Idle;
        break;
    }
  }
});

export {
  player,
  playerContainer,
  movement,
  Movements,
};
