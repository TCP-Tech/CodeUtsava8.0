import '../style.css';
import sprite from './assets/images/spritesheet.png';
import { gameLoop } from './game/gameLoop.js';
import { keyDownListener, keyUpListener } from './game/keyListeners.js';
import { FACING_DOWN } from './game/constants.js';

document.querySelector("#app").innerHTML = `
  <div>
    <canvas width="800" height="500"></canvas>
  </div>
`;

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;
let img = new Image();

window.addEventListener("keydown", (event) => keyDownListener(event, keyPresses));
window.addEventListener("keyup", (event) => keyUpListener(event, keyPresses));

img.src = sprite;
img.onload = function () {
  function gameLoopWrapper() {
    ({ positionX, positionY, currentDirection, currentLoopIndex, frameCount } = gameLoop(ctx, canvas, img, keyPresses, positionX, positionY, currentDirection, currentLoopIndex, frameCount));
    window.requestAnimationFrame(gameLoopWrapper);
  }
  window.requestAnimationFrame(gameLoopWrapper);
};
