import { FACING_DOWN, FACING_UP, FACING_LEFT, FACING_RIGHT, MOVEMENT_SPEED, SCALED_WIDTH, SCALED_HEIGHT } from './constants.js';

export function moveCharacter(deltaX, deltaY, direction, positionX, positionY, canvas) {
  if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
    positionX += deltaX;
  }
  if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    positionY += deltaY;
  }
  return { positionX, positionY, currentDirection: direction };
}
