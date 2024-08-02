const openList = `
    <svg class="ham hamRotate ham8" viewBox="0 0 100 100" width="80">
      <path class="line top" d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"/>
      <path class="line middle" d="m 30,50 h 40"/>
      <path class="line bottom" d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"/>
    </svg>
`;

const closeList = `
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="crossSvg">
      <line x1="0" y1="100" x2="100" y2="0" stroke-width="10" stroke="white"/>
      <line x1="0" y1="0" x2="100" y2="100" stroke-width="10" stroke="white"/>
    </svg>
`;

document.addEventListener('DOMContentLoaded', () => {
  const toggleSection = document.getElementById('toggleCrossOpen');
  toggleSection.classList.add('transition-svg');
  toggleSection.innerHTML = openList;
  toggleSection.classList.add('show-svg');
});

function toggleMenu() {
  const menu = document.getElementById('hamburgerMenu');
  const toggleSection = document.getElementById('toggleCrossOpen');
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'block';
    toggleSection.classList.remove('show-svg');
    toggleSection.classList.add('remove-svg'); 
    setTimeout(() => {
      toggleSection.innerHTML = closeList;
      toggleSection.classList.remove('remove-svg');
      toggleSection.classList.add('show-svg');
    }, 350);
  } else {
    toggleSection.classList.remove('show-svg');
    toggleSection.classList.add('remove-svg'); 
    setTimeout(() => {
      toggleSection.innerHTML = openList; 
      toggleSection.classList.remove('remove-svg');
      toggleSection.classList.add('show-svg');
    }, 350);
    
    menu.style.display = 'none';
  }
}
