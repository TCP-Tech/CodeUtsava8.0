import { Game } from "./src/main"; 

const introScreen = document.querySelector(".intro-screen");
const mainContent = document.getElementById("main-content");
const dynamicContentContainer = document.getElementById("codeutsava_dynamic_content");
const backgroundMusic = document.getElementById("backgroundMusic");
const merch = document.getElementById("cu-merchandise");
const gameCanvas = document.querySelector("#app");
function loadContentIntoContainer(url) {
    return fetch(url)
    .then(response => response.text())
    .then(html => {
        const dynamicContent = document.querySelector(".codeutsava__routing_container");
        dynamicContent.style.display = 'block';
        dynamicContentContainer.innerHTML = html;
        //   dynamicContentContainer.style.display = 'block'; 
    })
    .catch(error => console.error("Error loading content:", error));
}

function hideOtherContent() {
    if (mainContent) {
        mainContent.style.display = "none"; 
    } else {
        console.error("Main content element not found");
    }
    if (introScreen) {
        introScreen.style.display = "none";
    }
    if (dynamicContentContainer) {
        dynamicContentContainer.style.display = "none";
    }
}

function showMainContent() {
    if (mainContent) {
        mainContent.style.display = "block";
    }
    if (dynamicContentContainer) {
        dynamicContentContainer.style.display = "none";
    }
}

function handleStartButtonClick() {
    window.history.pushState({}, '', '/game');
    showGameCanvas();
    if (!window.gameInstance) {
        window.gameInstance = new Game();
    }
}

function handleMerchButtonClick() {
  window.history.pushState({}, '', '/merch');
  showMerch();
  
}

function showMerch() {
  setTimeout(() => {
    mainContent.style.display = "none";
    introScreen.style.display = "none"
      backgroundMusic.pause();
    const dynamicContent = document.querySelector(".codeutsava__routing_container");
    if(dynamicContent){
      dynamicContent.style.display = 'block';

    }
    merch.style.display = "block";
    
  }, 0);
  
}

function hideMerch() {

  setTimeout(() => {
    merch.style.display = "none";
    const dynamicContent = document.querySelector(".codeutsava__routing_container");
    if(dynamicContent){
      dynamicContent.style.display = 'none';

    }
    
  }, 0);
  
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
    if (canvasContainer) {
        canvasContainer.style.display = 'none';
    }
}

function handleRouteChange() {
    const currentPath = window.location.pathname;
  if (currentPath === "/game") {
    showGameCanvas();
    console.log("Trigg")
    if (!window.gameInstance) {
      window.gameInstance = new Game();
    }
  } else if (currentPath === "/") {
    hideMerch();
    hideGameCanvas();
    showMainContent();
    
  } else if (currentPath === "/test") {
    setTimeout(() => {
        mainContent.style.display = "none";
        introScreen.style.display = "none"
        const canvasContainer = document.querySelector("#app");
        // console.log(canvasContainer)
        if (canvasContainer) {
          canvasContainer.style.display = 'none';
        }
      }, 0);
      loadContentIntoContainer("/src/gameComponents/test.html");
    //   hideOtherContent(); 
  } else if(currentPath === "/merch"){
    showMerch();
    console.log("done");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  handleRouteChange();
  window.addEventListener('popstate', handleRouteChange); 
});

export { handleRouteChange, handleStartButtonClick, handleMerchButtonClick };
