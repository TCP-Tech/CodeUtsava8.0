function toggleMenu() {
  
  const hamburger = document.querySelector('.ham');
  const menu = document.getElementById('hamburgerMenu');
  hamburger.classList.toggle('active');
  menu.classList.toggle('activeMenu');
}
function loadComponent(id, url) {
  fetch(url)
      .then(response => response.text())
      .then(data => {
          document.getElementById(id).innerHTML = data;
      })
      .catch(error => console.error('Error loading component:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-container', '/src/components/Navbar/navbar.html');
  loadComponent('main-container', '/src/components/Hero Section/main.html');
  loadComponent('footer-container', '/src/components/Footer/footer.html');
});