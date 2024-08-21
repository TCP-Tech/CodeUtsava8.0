import { drawFrame } from './sprite.js';
import { moveCharacter } from './movement.js';
import { CYCLE_LOOP, FRAME_LIMIT, FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, MOVEMENT_SPEED } from './constants.js';
import { cccCollisions } from '../gameData/cccCollisions.js';

let collisionMap = [];
const yOffset = -20;
const xOffset = -15;
for (let i = 0; i < cccCollisions.length; i += 100) {
  collisionMap.push(cccCollisions.slice(i, 100 + i));
}

class Boundary {
  static width = 12;
  static height = 12;

  constructor({ position }) {
    this.position = position;
    this.width = Boundary.width;
    this.height = Boundary.height;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  collidesWith(x, y) {
    return (
      x < this.position.x + this.width &&
      x + Boundary.width > this.position.x &&
      y < this.position.y + this.height &&
      y + Boundary.height > this.position.y
    );
  }
}

const boundaries = [];

collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 14689) { 
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + xOffset,
            y: i * Boundary.height + yOffset,
          }
        })
      );
    }
  });
});

function isColliding(positionX, positionY) {
  return boundaries.some(boundary => boundary.collidesWith(positionX, positionY));
}

export function gameLoop(ctx, canvas, img, bgImg, keyPresses, positionX, positionY, currentDirection, currentLoopIndex, frameCount) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (bgImg.complete) {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  } else {
    console.log('Background image not loaded yet');
  }

  let newPositionX = positionX;
  let newPositionY = positionY;
  let hasMoved = false;

  if (keyPresses.w || keyPresses.ArrowUp) {
    const potentialNewY = newPositionY - MOVEMENT_SPEED;
    if (!isColliding(newPositionX, potentialNewY)) {
      newPositionY = potentialNewY;
      currentDirection = FACING_UP;
      hasMoved = true;
    }
  } else if (keyPresses.s || keyPresses.ArrowDown) {
    const potentialNewY = newPositionY + MOVEMENT_SPEED;
    if (!isColliding(newPositionX, potentialNewY)) {
      newPositionY = potentialNewY;
      currentDirection = FACING_DOWN;
      hasMoved = true;
    }
  }

  if (keyPresses.a || keyPresses.ArrowLeft) {
    const potentialNewX = newPositionX - MOVEMENT_SPEED;
    if (!isColliding(potentialNewX, newPositionY)) {
      newPositionX = potentialNewX;
      currentDirection = FACING_LEFT;
      hasMoved = true;
    }
  } else if (keyPresses.d || keyPresses.ArrowRight) {
    const potentialNewX = newPositionX + MOVEMENT_SPEED;
    if (!isColliding(potentialNewX, newPositionY)) {
      newPositionX = potentialNewX;
      currentDirection = FACING_RIGHT;
      hasMoved = true;
    }
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  } else {
    currentLoopIndex = 0;
  }

  // boundaries.forEach(boundary => boundary.draw(ctx));
  drawFrame(ctx, img, CYCLE_LOOP[currentLoopIndex], currentDirection, newPositionX, newPositionY);

  return { positionX: newPositionX, positionY: newPositionY, currentDirection, currentLoopIndex, frameCount };
}
