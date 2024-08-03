function toggleMenu() {
  const hamburger = document.querySelector('.ham');
  const menu = document.getElementById('hamburgerMenu');
  hamburger.classList.toggle('active');
  menu.classList.toggle('activeMenu');
}

const loadComponent = (url, targetId) => {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = data;
      }
    })
    .catch(error => console.error('Error loading component:', error));
};

const introButton = document.querySelector('.intro-button');
const introBG = document.querySelector('.image-cont');
const introScreen = document.querySelector('.intro-screen');
const cloudsContainer = document.querySelector('.clouds-container');
const leftCloud = document.getElementById('leftCloud');
const rightCloud = document.getElementById('rightCloud');
const mainContent = document.getElementById('main-content');

function loadContents(){
  cloudsContainer.classList.add('show');
  setTimeout(() => {
    mainContent.style.display = 'block';
    loadComponent('/components/Navbar/navbar.html', 'navbar-container');
    loadComponent('/components/Footer/footer.html', 'footer-container');
    loadComponent('/components/Hero Section/main.html', 'main-container');
  }, 0); 
  setTimeout( () => {
    cloudsContainer.classList.remove('show');
    cloudsContainer.classList.add('hide');

    setTimeout(() => {
      introButton.style.display = 'none'; 
      introBG.style.display = 'none'; 
    }, 0); 
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 3000);
  }, 3000); 
  // setTimeout(() => {
  //   introScreen.style.display = 'none'; 
  // }, 0); 
}

introButton.addEventListener('click' || 'keydown', function() {
  loadContents();
 
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    loadContents();
  }
});