import { drawFrame } from './sprite.js';
import { moveCharacter } from './movement.js';
import { CYCLE_LOOP, FRAME_LIMIT, FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, MOVEMENT_SPEED } from './constants.js';

export function gameLoop(ctx, canvas, img, keyPresses, positionX, positionY, currentDirection, currentLoopIndex, frameCount) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let hasMoved = false;

  if (keyPresses.w || keyPresses.ArrowUp) {
    ({ positionX, positionY, currentDirection } = moveCharacter(0, -MOVEMENT_SPEED, FACING_UP, positionX, positionY, canvas));
    hasMoved = true;
  } else if (keyPresses.s || keyPresses.ArrowDown) {
    ({ positionX, positionY, currentDirection } = moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN, positionX, positionY, canvas));
    hasMoved = true;
  }

  if (keyPresses.a || keyPresses.ArrowLeft) {
    ({ positionX, positionY, currentDirection } = moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT, positionX, positionY, canvas));
    hasMoved = true;
  } else if (keyPresses.d || keyPresses.ArrowRight) {
    ({ positionX, positionY, currentDirection } = moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT, positionX, positionY, canvas));
    hasMoved = true;
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

  drawFrame(ctx, img, CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);

  return { positionX, positionY, currentDirection, currentLoopIndex, frameCount };
}
