import { Game } from "./src/main";

const introScreen = document.querySelector(".intro-screen");
const mainContent = document.getElementById("main-content");
const dynamicContentContainer = document.getElementById(
  "codeutsava_dynamic_content"
);
const routingContainer = document.querySelector(".codeutsava__routing_container")
const backgroundMusic = document.getElementById("backgroundMusic");
var audio = document.getElementById("backgroundMusic");
const merch = document.getElementById("cu-merchandise");
const faq = document.getElementById("cu-faq");
const contact = document.getElementById("cu-contact");
const errorPage = document.getElementById("codeutsava-404_page");
const gameCanvas = document.querySelector("#app");
const team = document.getElementById("cu-team");
// const manager = document.getElementById("cu-manager");
// const exe_text = document.getElementById("cu-executive");
// const hc_text = document.getElementById("cu-hc");
// const exe = document.getElementById("exe-team")
// const hc = document.getElementById("hc-team")
// const oc = document.getElementById("oc-team");
// const oc_text = document.getElementById("cu-oc")
const nav = document.getElementById("navbar-team");
const foot = document.getElementById("footer-routing-container");

function changeAudioSource() {
    audio.src = "/assets/sounds/gameSounds/gameMusic.mp3";
    audio.load();
    audio.play().catch((error) => {
       console.error("Error playing audio:", error);
    });
 }
function loadContentIntoContainer(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const dynamicContent = document.querySelector(
        ".codeutsava__routing_container"
      );
      dynamicContent.style.display = "block";
      dynamicContentContainer.innerHTML = html;
    })
    .catch((error) => console.error("Error loading content:", error));
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

function handleTeamButtonClick() {
  window.history.pushState({}, '', '/team');
  showTeam();
  
}
function TeamtoHomeButtonClick(){
  window.history.pushState({}, '', '/');
  console.log("hi");
  hideTeam();
  showMainContent();

}

function showTeam() {
  hideFaq();
  hideContact();
  hide404Page();
  hideTeam();
  setTimeout(() => {
    mainContent.style.display = "none";
    introScreen.style.display = "none";
    const dynamicContent = document.querySelector(
      ".codeutsava__routing_container"
    );
    if (dynamicContent) {
      dynamicContent.style.display = "block";
    }
    team.style.display = "flex";
  }, 0);
 
}

function hideTeam() {
  setTimeout(() => {
    team.style.display = "none";
    const dynamicContent = document.querySelector(
      ".codeutsava__routing_container"
    );
    if (dynamicContent) {
      dynamicContent.style.display = "none";
    }
  }, 0);
}

function showMainContent() {
  hide404Page();
  if (mainContent) {
    mainContent.style.display = "block";
  }
  if (dynamicContentContainer) {
    dynamicContentContainer.style.display = "none";
  }
}

function handleStartButtonClick(event) {
  event.preventDefault();
  window.history.pushState({}, "", "/game");
  showGameCanvas();
  if (!window.gameInstance) {
    window.gameInstance = new Game();
  }
}

function handleGoBackToHomePageButtonClicked(event) {
  event.preventDefault();
  window.history.back();
  showMainContent();
  hideGameCanvas();
  // hideMerch();
  hideFaq();
  // backgroundMusic.play();
}

function handleMerchButtonClick(event) {
  event.preventDefault();
  window.history.pushState({}, "", "/merch");
  showMerch();
}

function handleFaqButtonClick(event) {
  event.preventDefault();
  window.history.pushState({}, "", "/faq");
  showFaq();
}
function handleContactUsButtonClicked(event) {
  event.preventDefault();
  window.history.pushState({}, "", "/contact");
  showContact();
}

function handleLogoClick(event) {
  // event.preventDefault();
  window.history.pushState({}, "", "/");
  // showMainContent();
}

function showGameCanvas() {
  hide404Page();
  setTimeout(() => {
    mainContent.style.display = "none";
    introScreen.style.display = "none";
    // backgroundMusic.pause();
    // gameMusic.play();
    changeAudioSource();
    const canvasContainer = document.querySelector("#app");
    if(routingContainer){
      routingContainer.style.display = "none";
    }
    if (canvasContainer) {
      canvasContainer.style.display = "block";
    }
  }, 0);
}

function hideGameCanvas() {
  const canvasContainer = document.querySelector("#app");
  if (canvasContainer) {
    canvasContainer.style.display = "none";
  }
}

function showMerch() {
  hideFaq();
  hideContact();
  hide404Page();
  hideTeam();
  setTimeout(() => {
    mainContent.style.display = "none";
    introScreen.style.display = "none";
    const dynamicContent = document.querySelector(
      ".codeutsava__routing_container"
    );
    if (dynamicContent) {
      dynamicContent.style.display = "block";
    }
    merch.style.display = "block";
  }, 0);
}

// function hideMerch() {
//   setTimeout(() => {
//     merch.style.display = "none";
//     const dynamicContent = document.querySelector(
//       ".codeutsava__routing_container"
//     );
//     if (dynamicContent) {
//       dynamicContent.style.display = "none";
//     }
//   }, 0);
// }
function show404Page() {
  // hideFaq();
  // hideContact();
  // hideMerch();
  
  setTimeout(() => {
    mainContent.style.display = "none";
    introScreen.style.display = "none";
    // backgroundMusic.pause();
    const dynamicContent = document.querySelector(
      ".codeutsava__routing_container"
    );
    if (dynamicContent) {
      dynamicContent.style.display = "none";
    }
    errorPage.style.display = "flex";
  }, 0);
}

function hide404Page() {
  setTimeout(() => {
    errorPage.style.display = "none";
  }, 0);
}

function showFaq() {
  hideGameCanvas();
  hideContact();
  hide404Page();
  hideTeam();
  setTimeout(() => {
    mainContent.style.display = "none";
    introScreen.style.display = "none";
    // backgroundMusic.pause();
    const dynamicContent = document.querySelector(
      ".codeutsava__routing_container"
    );
    if (dynamicContent) {
      dynamicContent.style.display = "block";
    }
    faq.style.display = "block";
  }, 0);
}
function hideFaq() {
  setTimeout(() => {
    faq.style.display = "none";
    const dynamicContent = document.querySelector(
      ".codeutsava__routing_container"
    );
    if (dynamicContent) {
      dynamicContent.style.display = "none";
    }
  }, 0);
}

function showContact() {
  // hideMerch();
  hideFaq();
  hide404Page();
  hideTeam();
  setTimeout(() => {
    mainContent.style.display = "none";
    introScreen.style.display = "none";
    // backgroundMusic.pause();
    const dynamicContent = document.querySelector(
      ".codeutsava__routing_container"
    );
    if (dynamicContent) {
      dynamicContent.style.display = "block";
    }
    contact.style.display = "block";
  }, 0);
}
function hideContact() {
  setTimeout(() => {
    contact.style.display = "none";
    const dynamicContent = document.querySelector(
      ".codeutsava__routing_container"
    );
    if (dynamicContent) {
      dynamicContent.style.display = "none";
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
    showMainContent();
    // hideMerch();
    hideFaq();
    hideGameCanvas();
    hideContact();
    hideTeam();
  } else if (currentPath === "/test") {
    setTimeout(() => {
      mainContent.style.display = "none";
      introScreen.style.display = "none";
      const canvasContainer = document.querySelector("#app");
      if (canvasContainer) {
        canvasContainer.style.display = "none";
      }
    }, 0);
    loadContentIntoContainer("/src/gameComponents/test.html");
  } else if (currentPath === "/merch") {
    showMerch();
    console.log("done");
  } else if(currentPath === "/team"){
    showTeam();
    console.log("done");
  }  else if (currentPath === "/faq") {
    showFaq();
    console.log("faq done");
  } else if (currentPath === "/contact") {
    showContact();
    console.log("contact done");
  }
  else{
    show404Page();
    console.log("404 page")
  }
}
document.addEventListener("DOMContentLoaded", () => {
  handleRouteChange();
  window.addEventListener("popstate", handleRouteChange);
});

//Game Collision Routes

document.addEventListener("modalDisplayed",()=>{
  console.log("Faq" , document.getElementById('navigateToFaq'));
  document.getElementById('navigateToFaq').addEventListener('click', handleFaqButtonClick);
})


export {
  handleRouteChange,
  handleStartButtonClick,
  handleMerchButtonClick,
  handleFaqButtonClick,
  handleContactUsButtonClicked,
  handleLogoClick,
  handleGoBackToHomePageButtonClicked,
  handleTeamButtonClick,
  TeamtoHomeButtonClick
};
