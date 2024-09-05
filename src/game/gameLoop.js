import { drawFrame } from './sprite.js';
import { CYCLE_LOOP, FRAME_LIMIT, FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, MOVEMENT_SPEED, SCALED_WIDTH, SCALED_HEIGHT, FADE_OUT_SPEED } from './constants.js';

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
    rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height > rectangle2.position.y &&
    rectangle1.position.y < rectangle2.position.y + rectangle2.height
  );
}

export function gameLoop(gameInstance, ctx, canvas, currentMap, img, bgImg, keyPresses, positionX, positionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, -positionX, -positionY);

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
    position: { x: canvas.width / 2 - SCALED_WIDTH / 2 + 50, y: canvas.height / 2 - SCALED_HEIGHT / 2 + 150 },
    width: SCALED_WIDTH,
    height: SCALED_HEIGHT
  };

  const collision = currentMap.boundaries.some(boundary => 
    rectangularCollision({
      rectangle1: playerRect,
      rectangle2: {
        position: {
          x: boundary.position.x - positionX - deltaX,
          y: boundary.position.y - positionY - deltaY
        },
        width: boundary.width,
        height: boundary.height
      }
    })
  );

  const doorCollisionDetected = currentMap.doorCollisions.some(door => 
    rectangularCollision({
      rectangle1: playerRect,
      rectangle2: {
        position: {
          x: door.position.x - positionX - deltaX,
          y: door.position.y - positionY - deltaY
        },
        width: door.width,
        height: door.height
      }
    })
  );

  if (doorCollisionDetected && fadeOutProgress === 0) {
    gsap.to(canvas, {
      duration: 0.8, 
      opacity: 0,
      onComplete: () => {
        gameInstance.loadMap("map2");
        gsap.to(canvas, {
          duration: 0.8, 
          opacity: 1
        });
      }
    });
    return { positionX, positionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress: 1 };
  }

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


  drawFrame(ctx, img, CYCLE_LOOP[currentLoopIndex], currentDirection, canvas.width / 2 - SCALED_WIDTH / 2 + 50, canvas.height / 2 - SCALED_HEIGHT / 2 + 150);

  return { positionX, positionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress };
}
