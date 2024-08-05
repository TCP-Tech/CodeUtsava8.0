
function toggleMenu() {
  const hamburger = document.querySelector('.ham');
  const menu = document.getElementById('hamburgerMenu');
  hamburger.classList.toggle('active');
  menu.classList.toggle('activeMenu');
}

const loadComponent = (url, targetId) => {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = data;
      }
    })
    .catch(error => console.error('Error loading component:', error));
};

const introButton = document.querySelector('.intro-button');
const introBG = document.querySelector('.image-cont');
const introScreen = document.querySelector('.intro-screen');
const cloudsContainer = document.querySelector('.clouds-container');
const leftCloud = document.getElementById('leftCloud');
const rightCloud = document.getElementById('rightCloud');
const mainContent = document.getElementById('main-content');
const cloudSound = new Audio('public/assets/sounds/swoosh-6428.mp3');

function loadContents(){
  cloudsContainer.classList.add('show');
  setTimeout(() => {
    mainContent.style.display = 'block';
    loadComponent('/components/Navbar/navbar.html', 'navbar-container');
    loadComponent('/components/Footer/footer.html', 'footer-container');
    loadComponent('/components/Hero Section/main.html', 'main-container');
  }, 0); 
  setTimeout( () => {
    cloudsContainer.classList.remove('show');
    cloudsContainer.classList.add('hide');
    setTimeout(() => {
      introButton.style.display = 'none'; 
      introBG.style.display = 'none'; 
    }, 0); 
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 3000);

  }, 3000); 
  // setTimeout(() => {
  //   introScreen.style.display = 'none'; 
  // }, 0); 
}

introButton.addEventListener('click' || 'keydown', function() {
  loadContents();
 
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    loadContents();
  }
});

// Code for audio starts here

const muteButton = document.getElementById('mute');
const playPauseButton = document.getElementById('playPauseButton');
const backgroundMusic = new Audio('public/assets/sounds/bgm.wav');
const playButtonImage = document.getElementById('play-button-image');
const muteButtonImage = document.getElementById('mute-button-image');
const buttonHoverSound = new Audio('public/assets/sounds/mousehover.mp3');
const enterButton = document.getElementById('intro-btn');

enterButton.addEventListener('click',function(){
  if(buttonHoverSound.paused){
    console.log('played the buttonSound');
    buttonHoverSound.currentTime = 0;
    buttonHoverSound.play();
    setTimeout(()=>{
      backgroundMusic.play();
    },3000)
  }
})

function playCloudSound(){
  cloudSound.play()
}
enterButton.addEventListener('click',()=>{
  setTimeout(playCloudSound,1500)
  
})

function playBgm() {
  // const backgroundMusic = new Audio('public/assets/sounds/bgm.wav');
  backgroundMusic.autoplay = true;
  backgroundMusic.loop = true;
  backgroundMusic.play();
}

window.addEventListener('DOMContentLoaded' || 'load', playBgm());

playPauseButton.addEventListener('click', function(){
  if(backgroundMusic.paused){
    console.log('started playing');
    backgroundMusic.play();
    playButtonImage.setAttribute('src','public/assets/images/playing.svg');
  }else{
    console.log('stopped playing');
    backgroundMusic.pause();
    playButtonImage.setAttribute('src','public/assets/images/mute.svg');
  }
})

// muteButton.addEventListener('click', function(){
//   if(backgroundMusic.muted){
//     console.log('unmuted the song');
//     backgroundMusic.muted = false;
//     muteButtonImage.setAttribute('src','public/assets/images/playing.svg');
//   }else{
//     console.log('muted the song');
//     backgroundMusic.muted = true;
//     muteButtonImage.setAttribute('src','public/assets/images/mute.svg');
//   }
// })

document.addEventListener('keydown', function(event){
  if (event.key === 'M'){
    console.log('Spacebar is pressed');
    if(backgroundMusic.paused){
      console.log('started playing');
      backgroundMusic.play();
      playButtonImage.setAttribute('src','public/assets/images/playing.svg');
    }else{
      console.log('stopped playing');
      backgroundMusic.pause();
      playButtonImage.setAttribute('src','public/assets/images/mute.svg');
    }
  }
  // if (event.key === 'M'){
  //   console.log('M is pressed');
  //   if(backgroundMusic.muted){
  //     console.log('unmuted the song');
  //     backgroundMusic.muted = false;
  //     muteButtonImage.setAttribute('src','public/assets/images/playing.svg');
  //   }else{
  //     console.log('muted the song');
  //     backgroundMusic.muted = true;
  //     muteButtonImage.setAttribute('src','public/assets/images/mute.svg');
  //   }
  // }
})

