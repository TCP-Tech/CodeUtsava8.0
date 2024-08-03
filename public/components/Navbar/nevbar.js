function toggleMenu() {
    const hamburger = document.querySelector('.ham');
    const menu = document.getElementById('hamburgerMenu');
    hamburger.classList.toggle('active');
    menu.classList.toggle('activeMenu');
  }