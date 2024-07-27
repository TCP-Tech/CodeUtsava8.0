export function keyDownListener(event, keyPresses) {
    keyPresses[event.key] = true;
  }
  
  export function keyUpListener(event, keyPresses) {
    keyPresses[event.key] = false;
  }
  