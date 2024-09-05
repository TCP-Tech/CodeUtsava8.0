import '../style.css';
import character from './gameAssets/character.png';
import backgroundMap from './gameAssets/cccfinal.png';
import { gameLoop } from './game/gameLoop.js';
import { keyDownListener, keyUpListener } from './game/keyListeners.js';
import { FACING_DOWN } from './game/constants.js';
import { maps } from './game/scene.js';

export class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.querySelector("#app").appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.keyPresses = {};
    this.currentDirection = FACING_DOWN; // current direction of player
    this.currentLoopIndex = 0; // current index to loop over player's sprite
    this.fadeOutProgress = 0; // fadout animation progress when transitioning
    this.frameCount = 0;  //current framecount
    this.positionX = 480; // position where image to be drawn
    this.positionY = 450;
    this.messageContainer = null; 
    this.currentMessageIndex = 0;
    this.isTyping = false; // for message container to halt the next message untill current one is written completely
    this.isMessageVisible = false;
    this.img = new Image();
    this.bgImg = new Image();
    this.currentMap = maps.map1;

    window.addEventListener("keydown", (event) => keyDownListener(event, this.keyPresses));
    window.addEventListener("keyup", (event) => keyUpListener(event, this.keyPresses));
    
    this.loadMap('map1');
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

   // loads different maps dynamically
  loadMap(map) {
    this.currentMap = maps[map];
    this.bgImg.src = this.currentMap.backgroundMap;
    this.img.src = character;

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
  }

  showMessage(message) {
    if (!this.messageContainer) {
      this.createMessageBox();
    }
    this.messageContainer.style.display = 'block';
    const messageTextElement = this.messageContainer.querySelector('.message-text');
    messageTextElement.textContent = ''; 
    this.isTyping = true;  
    this.typeWriterEffect(message, messageTextElement, 0); 
  }
 // giving a typewriter kind of egffect to  the messages
  typeWriterEffect(message, element, index) {
    if (index < message.length) {
      element.textContent += message.charAt(index);
      index++;

      setTimeout(() => {
        this.typeWriterEffect(message, element, index);
      }, 50); 

    } else {
      this.isTyping = false;
    }
  }


  createMessageBox() {
    this.messageContainer = document.createElement('div');
    this.messageContainer.classList.add('message-box');
    this.messageContainer.innerHTML = `
      <p class="message-text"></p>
      <button class="next-button">Next</button>
    `;
    document.querySelector("#app").appendChild(this.messageContainer);
    this.messageContainer.style.display = 'none'; 
    this.messageContainer.querySelector('.next-button').addEventListener('click', () => {
      if (!this.isTyping) { 
        this.nextMessage();
      }
    });
  }

  nextMessage() {
    const currentMessages = this.currentMap.textTrigger;
    if (this.currentMessageIndex < currentMessages.length - 1) {
      this.currentMessageIndex += 1;
      this.showMessage(currentMessages[this.currentMessageIndex].message);
    } else {
      this.hideMessage();
    }
  }
  
 
  hideMessage() {
    this.messageContainer.style.display = 'none';
    this.isMessageVisible = false;
    this.currentMessageIndex = 0; 
  }

  checkForMessage() { // checks if there are any messages To bE shown
    const currentMessages = this.currentMap.textTrigger;
    if (currentMessages.length > 0 && this.currentMessageIndex < currentMessages.length) {
      const message = currentMessages[this.currentMessageIndex];
      
      //message shown already
      if (!message.hasShown && !this.isMessageVisible && message.trigger) {
        this.showMessage(message.message);
        message.hasShown = true; 
        this.isMessageVisible = true;
        console.log("Showing message:", this.currentMessageIndex);
      }
    }
  }
  

  //main game loop
  startGameLoop() {
    const gameLoopWrapper = () => {
      // If a message is visible, halt the game until the player dismisses it
      if (!this.isMessageVisible) {
        ({
          positionX: this.positionX,
          positionY: this.positionY,
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
          this.positionX, 
          this.positionY, 
          this.currentDirection, 
          this.currentLoopIndex, 
          this.frameCount, 
          this.fadeOutProgress
        ));
      }

      // check for triggering messages
      this.checkForMessage();
      
      window.requestAnimationFrame(gameLoopWrapper);
    };

    window.requestAnimationFrame(gameLoopWrapper);
  }
}
