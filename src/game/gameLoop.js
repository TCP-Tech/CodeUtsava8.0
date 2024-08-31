import { drawFrame } from './sprite.js';
import { moveCharacter } from './movement.js';
import { CYCLE_LOOP, FRAME_LIMIT, FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, MOVEMENT_SPEED, SCALED_WIDTH, SCALED_HEIGHT } from './constants.js';
import { cccBoundaries } from '../gameData/cccBoundaries.js';

let collisionMap = [];
const offset = {
  x: 480,
  y: 450
};

for (let i = 0; i < cccBoundaries.length; i += 70) {
  collisionMap.push(cccBoundaries.slice(i, 70 + i));
}

class Boundary {
  static width = 12 * 3;
  static height = 12 * 3;

  constructor({ position }) {
    this.position = {
      x: position.x,
      y: position.y
    };
    this.width = Boundary.width;
    this.height = Boundary.height;
  }

  draw(ctx, bgX, bgY) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(this.position.x - bgX, this.position.y - bgY, this.width, this.height);
  }
}

const boundaries = [];

collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2731) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width ,
            y: i * Boundary.height 
          }
        })
      );
    }
  });
});

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
    rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height > rectangle2.position.y &&
    rectangle1.position.y < rectangle2.position.y + rectangle2.height
  );
}

export function gameLoop(ctx, canvas, img, bgImg, keyPresses, positionX, positionY, currentDirection, currentLoopIndex, frameCount) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bgX = positionX;
  const bgY = positionY;

  ctx.drawImage(bgImg, -bgX, -bgY);

  let deltaX = 0;
  let deltaY = 0;
  let moving = false;

  if (keyPresses['ArrowUp']) {
    deltaY = -MOVEMENT_SPEED;
    currentDirection = FACING_UP;
    moving = true;
  }
  if (keyPresses['ArrowDown']) {
    deltaY = MOVEMENT_SPEED;
    currentDirection = FACING_DOWN;
    moving = true;
  }
  if (keyPresses['ArrowLeft']) {
    deltaX = -MOVEMENT_SPEED;
    currentDirection = FACING_LEFT;
    moving = true;
  }
  if (keyPresses['ArrowRight']) {
    deltaX = MOVEMENT_SPEED;
    currentDirection = FACING_RIGHT;
    moving = true;
  }
  const playerRect = {
    position: { x: canvas.width / 2 - SCALED_WIDTH / 2, y: canvas.height / 2 - SCALED_HEIGHT / 2 },
    width: SCALED_WIDTH,
    height: SCALED_HEIGHT
  };

 
  const collision = boundaries.some(boundary => 
    rectangularCollision({
      rectangle1: playerRect,
      rectangle2: {
        position: {
          x: boundary.position.x - bgX - deltaX,
          y: boundary.position.y - bgY - deltaY
        },
        width: boundary.width,
        height: boundary.height
      }
    })
  );

  if (!collision) {
    positionX += deltaX;
    positionY += deltaY;
  }

  if (moving) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex = (currentLoopIndex + 1) % CYCLE_LOOP.length;
    }
  } else {
    currentLoopIndex = 0; 
  }

  // boundaries.forEach(boundary => {
  //   boundary.draw(ctx, bgX, bgY);
  // });

  drawFrame(ctx, img, CYCLE_LOOP[currentLoopIndex], currentDirection, canvas.width / 2 - SCALED_WIDTH / 2, canvas.height / 2 - SCALED_HEIGHT / 2);

  return { positionX, positionY, currentDirection, currentLoopIndex, frameCount };
}
