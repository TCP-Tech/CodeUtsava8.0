import { WIDTH, HEIGHT, SCALED_WIDTH, SCALED_HEIGHT } from './constants.js';

export function drawFrame(ctx, img, frameX, frameY, canvasX, canvasY) {

  console.log(".." , frameY)
  ctx.drawImage(
    img,
    frameX * WIDTH,
    frameY * HEIGHT,
    WIDTH,
    HEIGHT,
    canvasX,
    canvasY,
    SCALED_WIDTH,
    SCALED_HEIGHT
  );
}
