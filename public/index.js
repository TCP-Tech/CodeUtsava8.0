document.addEventListener('DOMContentLoaded', () => {
  const loadComponent = async (targetId, url) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = text;
      }
    } catch (error) {
      console.error(`Error loading component from ${url}:`, error);
    }
  };

  loadComponent('navbar-container', '/components/Navbar/navbar.html');
  loadComponent('main-container', '/components/Hero Section/main.html');
  loadComponent('footer-container', '/components/Footer/footer.html');
});
