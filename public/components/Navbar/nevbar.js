function toggleMenu() {
    const menu = document.getElementById('hamburgerMenu');
    if (menu.style.display === 'none' || menu.style.display === '') {
      menu.style.display = 'flex';
    } else {
      menu.style.display = 'none';
    }
  }