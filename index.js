document.addEventListener("DOMContentLoaded", () => {
  console.log('DOMContentLoaded event triggered');

  function toggleMenu() {
    const hamburger = document.querySelector(".ham");
    const menu = document.getElementById("hamburgerMenu");
    hamburger.classList.toggle("active");
    menu.classList.toggle("activeMenu");
  }

  function loadComponent(url, targetId) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const target = document.getElementById(targetId);
        if (target) {
          target.innerHTML = data;
          console.log(`Loaded component into ${targetId}`);
          if (targetId === "main-container") {
            const gameStartButton = document.querySelector(".codeutsava_main-start-btn");
            console.log('Game start button:', gameStartButton);
            if (gameStartButton) {
              gameStartButton.addEventListener("click", handleStartButtonClick);
            }
          }
        }
      })
      .catch((error) => console.error("Error loading component:", error));
  }

  const introButton = document.querySelector(".intro-button");
  const introtitle = document.querySelector(".intro-title");
  const introBG = document.querySelector(".image-cont");
  const introScreen = document.querySelector(".intro-screen");
  const cloudsContainer = document.querySelector(".clouds-container");
  const mainContent = document.getElementById("main-content");

  const cloudSound = document.getElementById("cloudSound");
  const backgroundMusic = document.getElementById("backgroundMusic");
  const buttonHoverSound = document.getElementById("buttonHoverSound");
  const playPauseButton = document.getElementById("playPauseButton");
  const playButtonImage = document.getElementById("play-button-image");
  const enterButton = document.getElementById("intro-btn");
  
  function handleStartButtonClick() {
    console.log('Start button clicked');
    cloudsContainer.classList.remove("hidden");
    cloudsContainer.classList.add("show");
    setTimeout(() => {
      mainContent.style.display = "none";
      backgroundMusic.pause();
      const canvasContainer = document.querySelector("#app");
      if (canvasContainer) {
        canvasContainer.style.display = 'block';
      }
      setTimeout(() => {
        cloudsContainer.classList.remove("show");
        cloudsContainer.classList.add("hide");
      }, 1000); 
    }, 0);
  }


  function loadContents() {
    cloudsContainer.classList.add("show");
    setTimeout(() => {
      mainContent.style.display = "block";
      loadComponent("/components/Navbar/navbar.html", "navbar-container");
      loadComponent("/components/Footer/footer.html", "footer-container");
      loadComponent("/components/InfiniteCarousel/infiniteCarousel.html", "codeutsava__sponsers-carousel-container");
      loadComponent("/components/Hero Section/main.html", "main-container");
    }, 0);
    setTimeout(() => {
      cloudsContainer.classList.remove("show");
      cloudsContainer.classList.add("hide");
      setTimeout(() => {
        introButton.style.display = "none";
        introBG.style.display = "none";
        introtitle.style.display="none";
      }, 0);
      setTimeout(() => {
        introScreen.style.display = "none";
      }, 900);
    }, 3000);

    setTimeout(() => {
      const hamburg = document.querySelector(".hamburger");
      if (hamburg) {
        hamburg.addEventListener("click", toggleMenu);
      }
    }, 3500);
  }

  introButton.addEventListener("click", loadContents);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      loadContents();
    }
    if (event.key === "M" || event.key == "m") {
      handlePlayPause();
    }
  });

  function playCloudSound() {
    cloudSound
      .play()
      .catch((error) => console.error("Error playing cloud sound:", error));
  }

  function handleEnterButtonClick() {
    if (buttonHoverSound.paused) {
      buttonHoverSound.currentTime = 0;
      buttonHoverSound
        .play()
        .catch((error) => console.error("Error playing button sound:", error));
      setTimeout(() => {
        backgroundMusic
          .play()
          .catch((error) =>
            console.error("Error playing background music:", error)
          );
      }, 3000);
    }
    setTimeout(playCloudSound, 1500);
  }

  enterButton.addEventListener("click", handleEnterButtonClick);

  function handlePlayPause() {
    if (backgroundMusic.paused) {
      backgroundMusic
        .play()
        .catch((error) =>
          console.error("Error starting background music:", error)
        );
      playButtonImage.setAttribute("src", "/assets/images/playing.svg");
    } else {
      backgroundMusic.pause();
      playButtonImage.setAttribute("src", "/assets/images/mute.svg");
    }
  }
  playPauseButton.addEventListener("click", handlePlayPause);
});
