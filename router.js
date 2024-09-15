import { Game } from "./src/main";

const introScreen = document.querySelector(".intro-screen");
const mainContent = document.getElementById("main-content");
const dynamicContentContainer = document.getElementById("codeutsava_dynamic_content");
const backgroundMusic = document.getElementById("backgroundMusic");
const merch = document.getElementById("cu-merchandise");
const faq = document.getElementById("cu-faq");
const gameCanvas = document.querySelector("#app");

function loadContentIntoContainer(url) {
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const dynamicContent = document.querySelector(".codeutsava__routing_container");
            dynamicContent.style.display = 'block';
            dynamicContentContainer.innerHTML = html;
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

function handleStartButtonClick(event) {
    event.preventDefault(); 
    window.history.pushState({}, '', '/game');
    showGameCanvas();
    if (!window.gameInstance) {
        window.gameInstance = new Game();
    }
}

function handleMerchButtonClick(event) {
    event.preventDefault();
    window.history.pushState({}, '', '/merch');
    showMerch();
    
}

function handleFaqButtonClick(event) {
    event.preventDefault();
    window.history.pushState({}, '', '/faq');
    showFaq();
    
}

function showGameCanvas() {
    setTimeout(() => {
        mainContent.style.display = "none";
        introScreen.style.display = "none";
        backgroundMusic.pause();
        const canvasContainer = document.querySelector("#app");
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

function showMerch() {
    hideFaq();
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

  function showFaq() {
    hideMerch();
    setTimeout(() => {
      mainContent.style.display = "none";
      introScreen.style.display = "none"
        backgroundMusic.pause();
      const dynamicContent = document.querySelector(".codeutsava__routing_container");
      if(dynamicContent){
        dynamicContent.style.display = 'block';
  
      }
      faq.style.display = "block";
      
    }, 0);
    
  }
  function hideFaq() {
  
    setTimeout(() => {
      faq.style.display = "none";
      const dynamicContent = document.querySelector(".codeutsava__routing_container");
      if(dynamicContent){
        dynamicContent.style.display = 'none';
  
      }
      
    }, 0);
    
  }

function handleRouteChange() {
    const currentPath = window.location.pathname;
    if (currentPath === "/game") {
        showGameCanvas();
        if (!window.gameInstance) {
            window.gameInstance = new Game();
        }
    } else if (currentPath === "/") {
        hideMerch();
        hideFaq();
        showMainContent();
        hideGameCanvas();
    } else if (currentPath === "/test") {
        setTimeout(() => {
            mainContent.style.display = "none";
            introScreen.style.display = "none";
            const canvasContainer = document.querySelector("#app");
            if (canvasContainer) {
                canvasContainer.style.display = 'none';
            }
        }, 0);
        loadContentIntoContainer("/src/gameComponents/test.html");
    } else if(currentPath === "/merch"){
        showMerch();
        console.log("done");
      } else if(currentPath === "/faq"){
        showFaq();
        console.log("faq done");
      }
}

document.addEventListener("DOMContentLoaded", () => {
    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
});

export { handleRouteChange, handleStartButtonClick, handleMerchButtonClick, handleFaqButtonClick };
