import '../style.css';
import character from './gameAssets/character.png';
import backgroundMap from './gameAssets/cccfinal.png';
import { gameLoop } from './game/gameLoop.js';
import { keyDownListener, keyUpListener } from './game/keyListeners.js';
import { FACING_DOWN } from './game/constants.js';

function resizeCanvas() {
  canvas.width = window.innerWidth; 
  canvas.height = window.innerHeight;  
}

const appDiv = document.querySelector("#app");
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;  
appDiv.appendChild(canvas);

let ctx = canvas.getContext("2d");

window.addEventListener("resize", resizeCanvas); 

let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX =  480;
let positionY =  450;
let img = new Image();
let bgImg = new Image();

window.addEventListener("keydown", (event) => keyDownListener(event, keyPresses));
window.addEventListener("keyup", (event) => keyUpListener(event, keyPresses));

bgImg.src = backgroundMap;
img.src = character;

img.onload = function () {
  console.log('Character image loaded');
};

bgImg.onload = function () {
  console.log('Background image loaded');
  function gameLoopWrapper() {
    ({ positionX, positionY, currentDirection, currentLoopIndex, frameCount } = gameLoop(ctx, canvas, img, bgImg, keyPresses, positionX, positionY, currentDirection, currentLoopIndex, frameCount));
    window.requestAnimationFrame(gameLoopWrapper);
  }
  window.requestAnimationFrame(gameLoopWrapper);
};

bgImg.onerror = function() {
  console.error('Failed to load background image');
};

img.onerror = function() {
  console.error('Failed to load character image');
};
