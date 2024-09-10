import { Game } from "./src/main";
import loadanimation from "./public/components/Participation/participation";
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event triggered");
  loadContents();

  function toggleMenu() {
    const hamburger = document.querySelector(".ham");
    const menu = document.getElementById("hamburgerMenu");
    hamburger.classList.toggle("active");
    menu.classList.toggle("activeMenu");
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
              const participationBoxes = document.querySelectorAll(
                ".participation-container_box1"
              );
              console.log(participationBoxes);
              if (participationBoxes.length > 0) {
                loadanimation();
              }
            }

            if (targetId === "main-container") {
              const gameStartButton = document.querySelector(
                ".codeutsava_main-start-btn"
              );
              console.log("Game start button:", gameStartButton);
              if (gameStartButton) {
                gameStartButton.addEventListener(
                  "click",
                  handleStartButtonClick
                );
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

  function handleStartButtonClick() {
    window.history.pushState({}, "", "/game");
    showGameCanvas();
    if (!window.gameInstance) {
      window.gameInstance = new Game();
    }
  }

  function showGameCanvas() {
    setTimeout(() => {
      mainContent.style.display = "none";
      introScreen.style.display = "none";
      backgroundMusic.pause();
      const canvasContainer = document.querySelector("#app");
      console.log(canvasContainer);
      if (canvasContainer) {
        canvasContainer.style.display = "block";
      }
    }, 0);
  }

  function hideGameCanvas() {
    const canvasContainer = document.querySelector("#app");

    // introScreen.style.display = "block";
    // introButton.style.display = "block"
    if (canvasContainer) {
      canvasContainer.style.display = "none";
    }
    mainContent.style.display = "block";
    // loadContents()
    // console.log(introScreen.style.display)
  }

  function handleRouteChange() {
    const currentPath = window.location.pathname;
    console.log(currentPath);

    if (currentPath === "/game") {
      showGameCanvas();
      if (!window.gameInstance) {
        window.gameInstance = new Game();
      }
    } else if (currentPath === "/") {
      hideGameCanvas();
    }
  }

  function loadContents() {
    const mainContent = document.getElementById("main-content");
    setTimeout(() => {
      mainContent.style.display = "block";
      Promise.all([
        loadComponent(
          "/components/Participation/participation.html",
          "participation"
        ),
        loadComponent("/components/Navbar/navbar.html", "navbar-container"),
        loadComponent("/components/Footer/footer.html", "footer-container"),
        loadComponent(
          "/components/InfiniteCarousel/infiniteCarousel.html",
          "codeutsava__sponsers-carousel-container"
        ),
        loadComponent("/components/Hero Section/main.html", "main-container"),
        loadComponent(
          "/components/About Us/aboutUs.html",
          "about-us-container"
        ),
      ])
        .then(() => {
          const contentLoadedEvent = new Event("contentsLoaded");
          document.dispatchEvent(contentLoadedEvent);
        })
        .catch((error) => console.error("Error loading components:", error));
    }, 0);

    setTimeout(() => {
      const hamburg = document.querySelector(".hamburger");
      if (hamburg) {
        hamburg.addEventListener("click", toggleMenu);
      }
    }, 3500);

    setTimeout(() => {
      const descriptions = document.querySelectorAll(".description-text");

      function typeWriterEffect(text, element, duration) {
        let i = 0;
        element.innerHTML = ""; // Clear the content before typing starts
        const totalCharacters = text.length;
        const timePerChar = duration / totalCharacters; // Calculate time per character to complete in duration

        const interval = setInterval(() => {
          if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
          } else {
            clearInterval(interval);
          }
        }, timePerChar);
      }

      document.querySelectorAll(".icon-heading").forEach((item) => {
        item.addEventListener("mouseenter", function () {
          const descText = this.querySelector(".description-text");
          const text = descText.dataset.fulltext;
          const duration = 500; // Duration is set to 0.5 seconds (500ms)
          typeWriterEffect(text, descText, duration);
          descText.style.display = "block"; // Show the description on hover
        });

        item.addEventListener("mouseleave", function () {
          const descText = this.querySelector(".description-text");
          descText.innerHTML = ""; // Clear the text
          descText.style.display = "none"; // Hide the description when not hovering
        });
      });
    }, 3500);
  }

  introButton.addEventListener("click", () => {
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
    window.history.pushState({}, "", "/");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      loadContents();
      window.history.pushState({}, "", "/");
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

  window.addEventListener("popstate", handleRouteChange);
});
