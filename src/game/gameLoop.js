import { drawFrame } from './sprite.js';
import { CYCLE_LOOP, FRAME_LIMIT, FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, MOVEMENT_SPEED, SCALED_WIDTH, SCALED_HEIGHT, FADE_OUT_SPEED } from './constants.js';
import { maps } from '../game/scene.js';
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
    rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height > rectangle2.position.y &&
    rectangle1.position.y < rectangle2.position.y + rectangle2.height
  );
}

export function gameLoop(gameInstance, ctx, canvas, currentMap, img, bgImg, keyPresses, positionX, positionY, mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, -mapPositionX, -mapPositionY); // Draw background based on map position

  let deltaX = 0;
  let deltaY = 0;
  let moving = false;

  if (!fadeOutProgress) { // Prevent movement if transitioning
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
  }

  const playerRect = {
    position: { x: canvas.width / 2 - SCALED_WIDTH / 2, y: canvas.height / 2 - SCALED_HEIGHT / 2 },
    width: SCALED_WIDTH,
    height: SCALED_HEIGHT
  };

  const collision = currentMap.boundaries.some(boundary => 
    rectangularCollision({
      rectangle1: playerRect,
      rectangle2: {
        position: {
          x: boundary.position.x - mapPositionX - deltaX,
          y: boundary.position.y - mapPositionY - deltaY
        },
        width: boundary.width,
        height: boundary.height
      }
    })
  );

  const obstacleCollision = currentMap.obstacleBoundary.some(door => 
    rectangularCollision({
      rectangle1: playerRect,
      rectangle2: {
        position: {
          x: door.position.x - mapPositionX - deltaX,
          y: door.position.y - mapPositionY - deltaY + 8
        },
        width: door.width,
        height: door.height
      }
    })
  );
  const doorCollisionDetected = currentMap.doorCollisions.some(door => 
    rectangularCollision({
      rectangle1: playerRect,
      rectangle2: {
        position: {
          x: door.position.x - mapPositionX - deltaX,
          y: door.position.y - mapPositionY - deltaY + 8
        },
        width: door.width,
        height: door.height
      }
    })
  );

  if (doorCollisionDetected && fadeOutProgress === 0) {
    // Prevent further movement
    deltaX = 0;
    deltaY = 0;

    // Trigger fade-out and load new map
    gsap.to(canvas, {
      duration: 0.8, 
      opacity: 0,
      onComplete: () => {
        const nextMap = currentMap.transitioningTo;
        gameInstance.loadMap(nextMap, maps[nextMap].mapPosition.x, maps[nextMap].mapPosition.y);

        // Set the player's position to the new map's spawn point
        positionX = maps[nextMap].spawnPoint.x;
        positionY = maps[nextMap].spawnPoint.y;

        gsap.to(canvas, {
          duration: 0.8, 
          opacity: 1
        });
      }
    });

    return { positionX, positionY, mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress: 1 };
  }

  // If no collision, update position
  if (!collision && !doorCollisionDetected && !obstacleCollision) {
    positionX += deltaX;
    positionY += deltaY;
    mapPositionX += deltaX;
    mapPositionY += deltaY;
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

  drawFrame(ctx, img, CYCLE_LOOP[currentLoopIndex], currentDirection, canvas.width / 2 - SCALED_WIDTH / 2, canvas.height / 2 - SCALED_HEIGHT / 2);

  return { positionX, positionY, mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress };
}
