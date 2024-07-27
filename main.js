import "./style.css";
import sprite from "./assets/spritesheet.png";

document.querySelector("#app").innerHTML = `
  <div>
    <canvas width="800" height="500"></canvas>
  </div>
`;

// Constants for game settings
const SCALE = 1.5; // Scale factor for the sprite
const WIDTH = 32; // Width of a single frame in the sprite sheet
const HEIGHT = 32; // Height of a single frame in the sprite sheet
const SCALED_WIDTH = SCALE * WIDTH; // Scaled width of the sprite
const SCALED_HEIGHT = SCALE * HEIGHT; // Scaled height of the sprite
const CYCLE_LOOP = [0, 1, 0, 2]; // Loop for animation frames
const FACING_DOWN = 0; // Index for facing down direction in sprite sheet
const FACING_UP = 3; // Index for facing up direction in sprite sheet
const FACING_LEFT = 1; // Index for facing left direction in sprite sheet
const FACING_RIGHT = 2; // Index for facing right direction in sprite sheet
const FRAME_LIMIT = 12; // Number of frames to wait before switching animation frame
const MOVEMENT_SPEED = 1; // Speed of character movement

// Get canvas and context
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// Object to keep track of key presses
let keyPresses = {};

// Variables to track current state of the game
let currentDirection = FACING_DOWN; // Current direction the character is facing
let currentLoopIndex = 0; // Current frame in the animation cycle
let frameCount = 0; // Counter to track frames for animation
let positionX = 0; // X position of the character
let positionY = 0; // Y position of the character
let img = new Image(); // Image object for the sprite sheet

// Event listeners for key presses
window.addEventListener("keydown", keyDownListener);
window.addEventListener("keyup", keyUpListener);

// Function to handle key down event
function keyDownListener(event) {
  keyPresses[event.key] = true;
}

// Function to handle key up event
function keyUpListener(event) {
  keyPresses[event.key] = false;
}

// Function to load the sprite image
function loadImage() {
  img.src = sprite; // Replace with your actual image source
  img.onload = function () {
    window.requestAnimationFrame(gameLoop); // Start the game loop once the image is loaded
  };
}

// Function to draw a frame from the sprite sheet
function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    img,
    frameX * WIDTH, // X coordinate of the frame in the sprite sheet
    frameY * HEIGHT, // Y coordinate of the frame in the sprite sheet
    WIDTH, // Width of the frame in the sprite sheet
    HEIGHT, // Height of the frame in the sprite sheet
    canvasX, // X coordinate on the canvas
    canvasY, // Y coordinate on the canvas
    SCALED_WIDTH, // Scaled width of the frame
    SCALED_HEIGHT // Scaled height of the frame
  );
}

// Load the sprite image
loadImage();

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  let hasMoved = false; // Flag to check if the character has moved

  // Check for movement in the up direction
  if (keyPresses.w || keyPresses.ArrowUp) {
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    hasMoved = true;
  }
  // Check for movement in the down direction
  else if (keyPresses.s || keyPresses.ArrowDown) {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    hasMoved = true;
  }

  // Check for movement in the left direction
  if (keyPresses.a || keyPresses.ArrowLeft) {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    hasMoved = true;
  }
  // Check for movement in the right direction
  else if (keyPresses.d || keyPresses.ArrowRight) {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    hasMoved = true;
  }

  // Update the animation frame if the character has moved
  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }

  // Reset the animation frame if the character has not moved
  if (!hasMoved) {
    currentLoopIndex = 0;
  }

  // Draw the current frame
  drawFrame(
    CYCLE_LOOP[currentLoopIndex],
    currentDirection,
    positionX,
    positionY
  );

  // Request the next animation frame
  window.requestAnimationFrame(gameLoop);
}

// Function to move the character and restrict movement within the canvas
function moveCharacter(deltaX, deltaY, direction) {
  if (
    positionX + deltaX > 0 &&
    positionX + SCALED_WIDTH + deltaX < canvas.width
  ) {
    positionX += deltaX;
  }
  if (
    positionY + deltaY > 0 &&
    positionY + SCALED_HEIGHT + deltaY < canvas.height
  ) {
    positionY += deltaY;
  }
  currentDirection = direction; // Update the current direction
}
