import '../style.css';
import character from './gameAssets/character-sprite.png';
import { gameLoop } from './game/gameLoop.js';
import { keyDownListener, keyUpListener } from './game/keyListeners.js';
import { FACING_DOWN } from './game/constants.js';
import { maps } from './game/scene.js';

export class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = screen.width;
    this.canvas.height = screen.height;
    document.querySelector("#app").appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.keyPresses = {};
    this.currentDirection = FACING_DOWN;
    this.currentLoopIndex = 0;
    this.fadeOutProgress = 0;
    this.frameCount = 0;
    this.currentMap = maps.map1;
    this.mapPositionX = 820;
    this.mapPositionY = 992;
    this.messageContainer = document.getElementById("messageContainer");
    this.messageTextElement = document.getElementById("messageText");
    this.nextButton = document.getElementById("nextButton");
    this.modal = document.getElementById("modal");
    this.modalText = document.getElementById("modal-text");
    this.currentMessageIndex = 0;
    this.isTyping = false;
    this.isMessageVisible = false;
    this.hasShownMessagge = this.currentMap.mapLoadTextTriggers.hasShown;
    this.img = new Image();
    this.bgImg = new Image();
    this.img.src = character;
    this.messageText = "";
    this.currentCharacterIndex = 0;
    this.obstacle = new Audio('https://us-tuna-sounds-files.voicemod.net/29d44834-15b0-4e05-8ee5-c97f1affe05e.mp3');
    this.obstacle.load();

    window.addEventListener("keydown", (event) => keyDownListener(event, this.keyPresses));
    window.addEventListener("keyup", (event) => keyUpListener(event, this.keyPresses));

    this.loadMap('map1', this.mapPositionX, this.mapPositionY, this.currentDirection);

    if (this.modal) {
      const closeButton = this.modal.querySelector(".close");
      closeButton.onclick = () => {
        this.hideModal(); 
      };
      this.hideMessage(); 
    }
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  loadMap(map, mapPositionX, mapPositionY,directionChange) {
    this.currentMap = maps[map];
    this.mapPositionX = mapPositionX;
    this.mapPositionY = mapPositionY;
    this.bgImg.src = this.currentMap.backgroundMap;
    this.currentDirection = directionChange;

    const imagesLoaded = new Promise((resolve, reject) => {
      let imagesToLoad = 2;
      const onLoad = () => {
        imagesToLoad -= 1;
        if (imagesToLoad === 0) {
          resolve();
        }
      };

      this.bgImg.onload = onLoad;
      this.bgImg.onerror = () => reject('Failed to load background image');
      
      this.img.onload = onLoad;
      this.img.onerror = () => reject('Failed to load character image');
    });

    imagesLoaded
      .then(() => {
        console.log('All images loaded');
        this.startGameLoop();
      })
      .catch(error => {
        console.error(error);
      });
      // if(this.currentMap.mapLoadTextTriggers[0].hasShown) this.currentMap.mapLoadTextTriggers[0].hasShown = false; 
  }

  showMessage(messages, isCollisionMessage = false) {
    this.isMessageVisible = true;
    this.messageText = messages[this.currentMessageIndex]; 
    this.messageContainer.style.display = "block";
    this.messageTextElement.innerHTML = ""; 
    this.nextButton.style.display = "block"; 
    this.nextButton.disabled = true; 
    this.typeText(this.messageText);
    this.nextButton.onclick = () => {
      if (!this.isTyping) { 
        this.currentMessageIndex++;
        if (this.currentMessageIndex < messages.length) {
          this.showMessage(messages);
        } else {
          this.hideMessage(); 
        }
      }
    };
  }

  typeText(message) {
    this.isTyping = true;
    this.currentCharacterIndex = 0;
    this.messageTextElement.innerHTML = ""; 

    const interval = setInterval(() => {
      if (this.currentCharacterIndex < message.length) {
        this.messageTextElement.innerHTML += message.charAt(this.currentCharacterIndex);
        this.currentCharacterIndex++;
      } else {
        clearInterval(interval);
        this.isTyping = false;
        this.nextButton.disabled = false; 
      }
    }, 50); 
  }

  hideMessage() {
    if (this.messageContainer) {
      this.messageContainer.style.display = "none";
    }
    this.isMessageVisible = false;
    this.currentMessageIndex = 0;
    this.nextButton.style.display = "none";
    this.hideModal();
  }

  showModal(htmlContent) {
    if (this.modal) {
      this.obstacle.play();
      this.modalText.innerHTML = htmlContent; 
      this.modal.style.display = "block"; 
    }
  }

  hideModal() {
    if (this.modal) {
      this.modal.style.display = "none";
      if (this.isMessageVisible) {
        this.hideMessage();
      }
    }
  }

  checkForMessage() {
    if(this.currentMap.mapLoadTextTriggers.length > 0){
      const loadTextTriggers = this.currentMap.mapLoadTextTriggers;
      loadTextTriggers.forEach(trigger => {
        if (!trigger.hasShown) {
          this.showMessage(trigger.message);
          trigger.hasShown = true;
        }
      });
    }
  }

  startGameLoop() {
    const gameLoopWrapper = () => {
      ({
        mapPositionX: this.mapPositionX,
        mapPositionY: this.mapPositionY,
        currentDirection: this.currentDirection,
        currentLoopIndex: this.currentLoopIndex,
        frameCount: this.frameCount,
        fadeOutProgress: this.fadeOutProgress
      } = gameLoop(
        this,
        this.ctx,
        this.canvas,
        this.currentMap,
        this.img,
        this.bgImg,
        this.keyPresses,
        this.mapPositionX,
        this.mapPositionY,
        this.currentDirection,
        this.currentLoopIndex,
        this.frameCount,
        this.fadeOutProgress,
        this.isTyping,
        this.isMessageVisible
      ));

      this.checkForMessage();
      window.requestAnimationFrame(gameLoopWrapper);
    };

    window.requestAnimationFrame(gameLoopWrapper);
  }
}
