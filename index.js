import { handleRouteChange, handleStartButtonClick, handleMerchButtonClick } from './router';
import loadanimation from "./public/components/Participation/participation";

document.addEventListener("DOMContentLoaded", () => {

  loadContents();

  function toggleMenu() {
    const hamburger = document.querySelector(".ham");
    const menu = document.getElementById("hamburgerMenu");
    hamburger.classList.toggle("active");
    menu.classList.toggle("activeMenu");
  }

  

  function changeImage(event){
    var mainImage = document.getElementById("4");
    var t=event.target.id;
    mainImage.src = "/public/assets/images/merch" + t + ".png";
  }


  function loadComponent(url, targetId) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          const target = document.getElementById(targetId);
          if (target) {
            target.innerHTML = data;
            console.log(`Loaded component into ${targetId}`);

            if (targetId === "participation") {
              const participationBoxes = document.querySelectorAll(".participation-container_box1");
              console.log(participationBoxes);
              if (participationBoxes.length > 0) {
                loadanimation();
              }
            }

            if (targetId === "main-container") {
              const gameStartButton = document.querySelector(".codeutsava_main-start-btn");
              console.log('Game start button:', gameStartButton);
              if (gameStartButton) {
                gameStartButton.addEventListener("click", handleStartButtonClick);
              }
            }

            resolve(); 
          } else {
            reject(new Error(`Target element with ID ${targetId} not found`));
          }
        })
        .catch((error) => {
          console.error("Error loading component:", error);
          reject(error); 
        });
    });
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


  function loadContents() {
    setTimeout(() => {
      // mainContent.style.display = "block";
      Promise.all([
        loadComponent('/components/Participation/participation.html', 'participation'),
        loadComponent('/components/Navbar/navbar.html', 'navbar-container'),
        loadComponent('/components/Footer/footer.html', 'footer-container'),
        loadComponent('/components/Footer/footer.html', 'footer-routing-container'),
        loadComponent('/components/InfiniteCarousel/infiniteCarousel.html', 'codeutsava__sponsers-carousel-container'),
        loadComponent('/components/Hero Section/main.html', 'main-container'),
        loadComponent("/public/components/Merchandise/merchandise.html","cu-merchandise"),
        loadComponent("/public/components/team/team.html","team"),
        loadComponent("/public/components/team HC/teamhc.html","team-hc")
      ]).then(() => {
        const contentLoadedEvent = new Event("contentsLoaded");
        document.dispatchEvent(contentLoadedEvent);
      }).catch(error => console.error('Error loading components:', error));
    }, 0);

    setTimeout(() => {
      const hamburg = document.querySelector(".hamburger");
      if (hamburg) {
        hamburg.addEventListener("click", toggleMenu);
      }
    }, 3500);

    setTimeout(() => {
      const merch = document.querySelector(".merch-cu");
      if(merch){
        merch.addEventListener("click", handleMerchButtonClick);
    
      }
      
    }, 1000);

    setTimeout(() => {
      const merchImage1 = document.getElementById("1");
      const merchImage2 = document.getElementById("2");
      const merchImage3 = document.getElementById("3");
      if(merchImage1){
        merchImage1.addEventListener("click", changeImage);
    
      }
      if(merchImage2){
        merchImage2.addEventListener("click", changeImage);
    
      }
      if(merchImage3){
        merchImage3.addEventListener("click", changeImage);
    
      }
      
    }, 3500);
  }

  introButton.addEventListener("click", () => {
    // loadContents();
    cloudsContainer.classList.add("show");
    setTimeout(() => {
      cloudsContainer.classList.remove("show");
      cloudsContainer.classList.add("hide");
      setTimeout(() => {
        introButton.style.display = "none";
        introBG.style.display = "none";
        introtitle.style.display = "none";
      }, 0);
      setTimeout(() => {
        introScreen.style.display = "none";
      }, 900);
    }, 3000);
    window.history.pushState({}, '', '/');
    mainContent.style.display = "block";
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      loadContents();
      window.history.pushState({}, '', '/');
    }
    if (event.key === "M" || event.key === "m") {
      handlePlayPause();
    }
  });

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

  function playCloudSound() {
    cloudSound
      .play()
      .catch((error) => console.error("Error playing cloud sound:", error));
  }

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

  // Initial route check
  handleRouteChange();

  window.addEventListener('popstate', handleRouteChange);
});
