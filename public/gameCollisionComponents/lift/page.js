import { setChosenMap } from "../../../src/game/gameLoop";
function handleButtonClick(event) {
    const floor = event.target.getAttribute('data-floor');
    let map;
    switch (floor) {
      case 'ground':
        map = 'map2'; 
        break;
      case 'first':
        map = 'map3';
        break;
      case 'second':
        map = 'map4';
        break;
      default:
        map = null;
    }
    setChosenMap(map)
    document.querySelector('.lift-modal').remove();
    // return map;
  }
document.querySelectorAll('.lift-btn').forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });

// export {handleButtonClick};