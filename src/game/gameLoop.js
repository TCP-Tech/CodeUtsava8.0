import { drawFrame } from './sprite.js';
import {
  CYCLE_LOOP,
  FRAME_LIMIT,
  FACING_UP,
  FACING_DOWN,
  FACING_LEFT,
  FACING_RIGHT,
  MOVEMENT_SPEED,
  SCALED_WIDTH,
  SCALED_HEIGHT
} from './constants.js';
import { maps } from './scene.js';
let liftOption = '';
const characterFootSteps = document.getElementById("characterFootSteps");
let path = '/assets/sounds/gameSounds/elevator.mp3';
let path2 = '/assets/sounds/gameSounds/door.wav';
const transition = new Audio(path);
transition.load();
const transition2 = new Audio(path2);
transition2.load();
const modal = new Audio('/assets/sounds/gameSounds/modals.mp3');
modal.load();

async function initializeLiftOptions() {
  for (const trigger of maps.liftCollision) {
    const collision = await trigger.getElement();
    if(!collision) break;
    liftOption = collision;
  }
}

initializeLiftOptions();

function handleButtonClick(event, callback) {
  const floor = event.target.getAttribute('data-floor');
  const map = getMapForFloor(floor);

  if (callback) {
    callback(map);
  }
}

function getMapForFloor(floor) {
  const mapsByFloor = {
    '0': 'map2',
    '1': 'map3',
    '2': 'map6'
  };
  return mapsByFloor[floor] || null;
}

export function showLiftModal(gameInstance, callback) {
  gameInstance.showModal(liftOption);
  modal.play();

  function handleClick(event) {
    handleButtonClick(event, callback);
  }

  document.querySelectorAll('.lift-btn').forEach(button => {
    button.addEventListener('click', handleClick);
  });

  document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        const floor = event.key;
        const button = document.querySelector(`.lift-btn[data-floor="${floor}"]`);
        if (button) {
            button.click();
        }
    }
  });
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
    rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height > rectangle2.position.y &&
    rectangle1.position.y < rectangle2.position.y + rectangle2.height
  );
}

function handleMapTransition(canvas, nextMap, currentMap, gameInstance, directionChange, mapPosition, onComplete,src) {
  if (maps[nextMap] === currentMap) return;
  if(!maps[nextMap]) return;

  if(src === path2) transition2.play();
  else transition.play();

  gsap.to(canvas, {
    duration: 0.8,
    opacity: 0,
    onComplete: () => {
      gameInstance.loadMap(nextMap, mapPosition.x, mapPosition.y, directionChange);
      if(currentMap.mapLoadTextTriggers.length > 0) currentMap.mapLoadTextTriggers[0].hasShown = false;
      gsap.to(canvas, {
        duration: 0.8,
        opacity: 1,
        onComplete: () => {
          onComplete();
        }
      });
    }
  });
}

export function gameLoop(
  gameInstance, 
  ctx, 
  canvas, 
  currentMap, 
  img, 
  bgImg, 
  keyPresses, 
  mapPositionX, 
  mapPositionY, 
  currentDirection, 
  currentLoopIndex, 
  frameCount, 
  fadeOutProgress, 
  isTyping, 
  isMessageVisible
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, -mapPositionX, -mapPositionY);

  let deltaX = 0;
  let deltaY = 0;
  let moving = false;

  if (fadeOutProgress === 0 && !isMessageVisible) {
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
    position: { x: canvas.width / 2 - SCALED_WIDTH / 2, y: canvas.height / 2 + 100 - SCALED_HEIGHT / 2 },
    width: SCALED_WIDTH,
    height: SCALED_HEIGHT
  };

  const boundaryCollision = currentMap.boundaries.some(boundary => 
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

  const obstacleCollisionDetected = currentMap.obstacleBoundary.some(obstacle => 
    rectangularCollision({
      rectangle1: playerRect,
      rectangle2: {
        position: {
          x: obstacle.position.x - mapPositionX - deltaX,
          y: obstacle.position.y - mapPositionY - deltaY + 8
        },
        width: obstacle.width,
        height: obstacle.height
      }
    })
  );

  
  if(currentMap.hasTwoDoors){
    const doorLeadingToNextMapThroughRightDoorCollisionDetected = currentMap.doorCollisions.leadsToNextFromRight.boundary.some(door => 
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
    const doorLeadingToNextMapThroughLeftDoorCollisionDetected = currentMap.doorCollisions.leadsToNextFromLeft.boundary.some(door => 
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
  
    const doorLeadingToPrevMapThroughRightDoorCollisionDetected = currentMap.doorCollisions.leadsToPrevFromRight.boundary.some(door => 
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
    const doorLeadingToPrevMapThroughLeftDoorCollisionDetected = currentMap.doorCollisions.leadsToPrevFromLeft.boundary.some(door => 
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

    if (doorLeadingToNextMapThroughRightDoorCollisionDetected && fadeOutProgress === 0) {
        handleMapTransition(
          canvas,
          currentMap.transitioningTo,
          currentMap,
          gameInstance,
          currentMap.doorCollisions.directionOnNextMap, 
          maps[currentMap?.transitioningTo]?.mapPosition?.enterFromFrontRightPosition,
          () => {
            fadeOutProgress = 0;
          },
          path2
        );
      
      return { mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress };
    }
    if (doorLeadingToNextMapThroughLeftDoorCollisionDetected && fadeOutProgress === 0) {
        handleMapTransition(
          canvas,
          currentMap.transitioningTo,
          currentMap,
          gameInstance,
          currentMap.doorCollisions.directionOnNextMap, 
          maps[currentMap?.transitioningTo]?.mapPosition?.enterFromFrontLeftPosition,
          () => {
            fadeOutProgress = 0;
          },
          path2
        );
      
      return { mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress };
    }
  
    if (doorLeadingToPrevMapThroughRightDoorCollisionDetected && fadeOutProgress === 0) {
        handleMapTransition(
          canvas,
          currentMap.transitioningFrom,
          currentMap,
          gameInstance,
          currentMap.doorCollisions.directionOnPrevMap, 
          maps[currentMap.transitioningFrom].mapPosition.enterFromFrontRightPosition,
          () => {
            fadeOutProgress = 0;
          },
          path2
        );
      return { mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress };
    }
    if (doorLeadingToPrevMapThroughLeftDoorCollisionDetected && fadeOutProgress === 0) {
        handleMapTransition(
          canvas,
          currentMap.transitioningFrom,
          currentMap,
          gameInstance,
          currentMap.doorCollisions.directionOnPrevMap, 
          maps[currentMap.transitioningFrom].mapPosition.enterFromFrontLeftPosition,
          () => {
            fadeOutProgress = 0;
          },
          path2
        );
      return { mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress };
    }

  
  }

  const doorLeadingToNextMapCollisionDetected = currentMap.doorCollisions.leadsToNext.boundary.some(door => 
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

  const doorLeadingToPrevMapCollisionDetected = currentMap.doorCollisions.leadsToPrev.boundary.some(door => 
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


  if (obstacleCollisionDetected) {
    const collisionTriggers = currentMap.collisionTextTriggers;
    collisionTriggers.forEach(async(trigger) => {
      const elem = await trigger.getElement();
      if(elem.length > 0) gameInstance.showModal(elem);
      const event = new CustomEvent('modalDisplayed');
      document.dispatchEvent(event);
      if (!isTyping) { 
        gameInstance.showMessage(trigger.message);
        trigger.hasShown = true; 
      }
    });
  }

  if (doorLeadingToNextMapCollisionDetected && fadeOutProgress === 0) {
    if (currentMap.doorCollisions.leadsToNext.hasLift) {
      showLiftModal(gameInstance, (chosenMap) => {
        if (chosenMap) gameInstance.hideModal();
        handleMapTransition(
          canvas,
          chosenMap,
          currentMap,
          gameInstance,
          currentMap.doorCollisions.directionOnNextMap, 
          maps[chosenMap].mapPosition.enterFromLiftPosition,
          () => {
            fadeOutProgress = 0;
          },
          path
        );
      });
    } else {
      handleMapTransition(
        canvas,
        currentMap.transitioningTo,
        currentMap,
        gameInstance,
        currentMap.doorCollisions.directionOnNextMap, 
        maps[currentMap?.transitioningTo]?.mapPosition?.enterFromFrontPosition,
        () => {
          fadeOutProgress = 0;
        },
        path2
      );
    }
    return { mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress };
  }

  if (doorLeadingToPrevMapCollisionDetected && fadeOutProgress === 0) {
    if (currentMap.doorCollisions.leadsToPrev.hasLift) {
      showLiftModal(gameInstance, (chosenMap) => {
        if (chosenMap) gameInstance.hideModal();
        handleMapTransition(
          canvas,
          chosenMap,
          currentMap,
          gameInstance,
          currentMap.doorCollisions.directionOnPrevMap, 
          maps[chosenMap].mapPosition.enterFromLiftPosition,
          () => {
            fadeOutProgress = 0;
          },
          path
        );
      });
    } else if(currentMap.entryExitSame){
      handleMapTransition(
        canvas,
        currentMap.transitioningFrom,
        currentMap,
        gameInstance,
        currentMap.doorCollisions.directionOnPrevMap, 
        maps[currentMap.transitioningFrom].mapPosition.enterFromLiftPosition,
        () => {
          fadeOutProgress = 0;
        },
        path2
      );
    }
    else {
      handleMapTransition(
        canvas,
        currentMap.transitioningFrom,
        currentMap,
        gameInstance,
        currentMap.doorCollisions.directionOnPrevMap, 
        maps[currentMap.transitioningFrom].mapPosition.enterFromFrontPosition,
        () => {
          fadeOutProgress = 0;
        },
        path2
      );
    }
    return { mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress };
  }

  if (!boundaryCollision && !doorLeadingToNextMapCollisionDetected && !obstacleCollisionDetected && !doorLeadingToPrevMapCollisionDetected) {
    mapPositionX += deltaX;
    mapPositionY += deltaY;
  }

  if (moving) {
    characterFootSteps.play();
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex = (currentLoopIndex + 1) % CYCLE_LOOP.length;
    }
  } else {
    currentLoopIndex = 0;
    // collision.play();
  }

  drawFrame(ctx, img, CYCLE_LOOP[currentLoopIndex], currentDirection, canvas.width / 2 - SCALED_WIDTH / 2, canvas.height / 2 - SCALED_HEIGHT / 2 + 100);

  return { mapPositionX, mapPositionY, currentDirection, currentLoopIndex, frameCount, fadeOutProgress };
}
