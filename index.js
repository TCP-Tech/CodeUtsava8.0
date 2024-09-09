import { Game } from "./src/main";
import loadanimation from "./public/components/Participation/participation";
document.addEventListener("DOMContentLoaded", () => {


  console.log('DOMContentLoaded event triggered');
  loadContents();

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
          if (targetId === "participation") {
            const participationBoxes = document.querySelectorAll(".participation-container_box1");
            console.log(participationBoxes);
            if (participationBoxes.length > 0) {
              loadanimation();
            }
            participationBoxes.forEach((box) => {
              console.log(box.innerText);
            });
          }
  
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
    window.history.pushState({}, '', '/game');
    showGameCanvas();
    if (!window.gameInstance) {
      window.gameInstance = new Game();
    }
  }

  function showGameCanvas() {
    setTimeout(() => {
      mainContent.style.display = "none";
      introScreen.style.display = "none"
      backgroundMusic.pause();
      const canvasContainer = document.querySelector("#app");
      console.log(canvasContainer)
      if (canvasContainer) {
        canvasContainer.style.display = 'block';
      }
    }, 0);
  }

  function hideGameCanvas() {
    const canvasContainer = document.querySelector("#app");
    
    // introScreen.style.display = "block"; 
    // introButton.style.display = "block"
    if (canvasContainer) {
      canvasContainer.style.display = 'none';
    }
    mainContent.style.display = "block"; 
    // loadContents()
    // console.log(introScreen.style.display)
  }

  var merchan = document.querySelector("#cu-merchandise");
  merchan.style.display = 'none';

  function handleMerchRoute(event) {
    event.preventDefault();
    const participants = document.querySelector("#participation");
    const carousel = document.querySelector("#codeutsava__sponsers-carousel-container");
    const main = document.querySelector("#main-container");
    
    merchan.style.display = 'block';
    if(participants){
      participants.style.display = 'none';
    }
    if(carousel){
      carousel.style.display = 'none';
    }
    if(main){
      main.style.display = 'none';
    }
    
  }
  function changeImage(event){
    var mainImage = document.getElementById("4");
    var t=event.target.id;
    mainImage.src = "/public/assets/images/merch" + t + ".png";
  }

  function handleBackRoute(event) {
    event.preventDefault();
    merchan.style.display = 'none';
    const participants = document.querySelector("#participation");
    const carousel = document.querySelector("#codeutsava__sponsers-carousel-container");
    const main = document.querySelector("#main-container");
    if(participants){
      participants.style.display = 'block';
    }
    if(carousel){
      carousel.style.display = 'block';
    }
    if(main){
      main.style.display = 'block';
    }
    
  }

  function handleRouteChange() {
  const currentPath = window.location.pathname; 
  console.log(currentPath)

  if (currentPath === '/game') {
    showGameCanvas();
    if (!window.gameInstance) {
      window.gameInstance = new Game();
    }
  } else if(currentPath === '/') {
    hideGameCanvas();  
  }
}

  function handleRouteChange() {
  const currentPath = window.location.pathname; 
  console.log(currentPath)

  if (currentPath === '/game') {
    showGameCanvas();
    if (!window.gameInstance) {
      window.gameInstance = new Game();
    }
  } else if(currentPath === '/') {
    hideGameCanvas();  
  }
}

  function loadContents() {

    setTimeout(() => {
      mainContent.style.display = "block";
      loadComponent('/components/Participation/participation.html','participation');
      loadComponent("/components/Navbar/navbar.html", "navbar-container");
      loadComponent("/components/Footer/footer.html", "footer-container");
      loadComponent("/components/InfiniteCarousel/infiniteCarousel.html", "codeutsava__sponsers-carousel-container");
      loadComponent("/public/components/Merchandise/merchandise.html","cu-merchandise");
      loadComponent("/components/Hero Section/main.html", "main-container");

      const contentLoadedEvent = new Event("contentsLoaded");
      document.dispatchEvent(contentLoadedEvent);
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
        merch.addEventListener("click", handleMerchRoute);
    
      }
      
    }, 3500);
    setTimeout(() => {
      const back = document.querySelector(".back-cu");
      if(back){
        back.addEventListener("click", handleBackRoute);
    
      }
      
    }, 3500);

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
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      loadContents();
      window.history.pushState({}, '', '/');
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

  // initial checking for route
  handleRouteChange();

  window.addEventListener('popstate', handleRouteChange);
});
