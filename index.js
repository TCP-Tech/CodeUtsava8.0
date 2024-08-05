document.addEventListener('DOMContentLoaded', () => {
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
  const mainContent = document.getElementById('main-content');
  
  // Accessing audio elements by their ID
  const cloudSound = document.getElementById('cloudSound');
  const backgroundMusic = document.getElementById('backgroundMusic');
  const buttonHoverSound = document.getElementById('buttonHoverSound');
  const playPauseButton = document.getElementById('playPauseButton');
  const playButtonImage = document.getElementById('play-button-image');
  const enterButton = document.getElementById('intro-btn');

  function loadContents() {
    cloudsContainer.classList.add('show');
    setTimeout(() => {
      mainContent.style.display = 'block';
      loadComponent('/components/Navbar/navbar.html', 'navbar-container');
      loadComponent('/components/Footer/footer.html', 'footer-container');
      loadComponent('/components/Hero Section/main.html', 'main-container');
    }, 0); 
    setTimeout(() => {
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
  }

  introButton.addEventListener('click', loadContents);
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      loadContents();
    }
    if (event.key === 'M' || event.key == 'm') {
      handlePlayPause();
    }
  });

  function playCloudSound() {
    cloudSound.play().catch(error => console.error('Error playing cloud sound:', error));
  }

  function handleEnterButtonClick() {
    console.log(buttonHoverSound);
    console.log(cloudSound);
    console.log(backgroundMusic);
    if (buttonHoverSound.paused) {
      buttonHoverSound.currentTime = 0;
      buttonHoverSound.play().catch(error => console.error('Error playing button sound:', error));
      setTimeout(() => {
        backgroundMusic.play().catch(error => console.error('Error playing background music:', error));
      }, 3000);
    }
    setTimeout(playCloudSound, 1500);
  }

  enterButton.addEventListener('click', handleEnterButtonClick);

  function handlePlayPause() {
    if (backgroundMusic.paused) {
      backgroundMusic.play().catch(error => console.error('Error starting background music:', error));
      playButtonImage.setAttribute('src', 'public/assets/images/playing.svg');
    } else {
      backgroundMusic.pause();
      playButtonImage.setAttribute('src', 'public/assets/images/mute.svg');
    }
  }
  playPauseButton.addEventListener('click', handlePlayPause);
});
