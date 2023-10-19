import {
    AnimatedSprite, type Texture, Assets,
  } from 'pixi.js';
  import { player, playerContainer } from './player';

let isEPressed = false;

document.addEventListener("keydown", (event) => {
    if (event.key === "e") {
        isEPressed = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "e") {
        isEPressed = false;
    }
});
