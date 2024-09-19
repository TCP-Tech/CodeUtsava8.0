import { Game } from "./src/main";

const introScreen = document.querySelector(".intro-screen");
const mainContent = document.getElementById("main-content");
const dynamicContentContainer = document.getElementById(
  "codeutsava_dynamic_content"
);
const backgroundMusic = document.getElementById("backgroundMusic");
const merch = document.getElementById("cu-merchandise");
const faq = document.getElementById("cu-faq");
const contact = document.getElementById("cu-contact");
const errorPage = document.getElementById("codeutsava-404_page");
const gameCanvas = document.querySelector("#app");

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
    const canvasContainer = document.querySelector("#app");
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
    // const dynamicContent = document.querySelector(
    //   ".codeutsava__routing_container"
    // );
    // if (dynamicContent) {
    //   dynamicContent.style.display = "none";
    // }
  }, 0);
}

function showFaq() {
  // hideMerch();
  hideContact();
  hide404Page();
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
  setTimeout(() => {
    mainContent.style.display = "none";
    introScreen.style.display = "none";
    backgroundMusic.pause();
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
  } else if (currentPath === "/faq") {
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

export {
  handleRouteChange,
  handleStartButtonClick,
  handleMerchButtonClick,
  handleFaqButtonClick,
  handleContactUsButtonClicked,
  handleLogoClick,
  handleGoBackToHomePageButtonClicked,
};
