document.addEventListener("contentsLoaded", () => {
  const pikachu = document.getElementById("pikachu-graph");
  pikachu.src = "/assets/images/531-5319654_pikachu-pixel-art-maker-pikachu-pixel-art-png.png";
  const homepage = document.getElementById("main-content");
  let dblClickFlag = false;
  const pikaSoundEffect = new Audio("/assets/sounds/pika.mp3");
  var audio = document.getElementById("backgroundMusic");
  let isPlaying = false;

  function changeAudioSource() {
    audio.src = "/assets/sounds/Nostalgic-Soundtrack-Relax_-Study_-Work_-_Cry_-Best-of-Pokemon-Emerald_1.ogg";
    audio.load();
    audio.play();
    isPlaying = true;
  }

  pikachu.addEventListener("dblclick", () => {
    if (!dblClickFlag) {
      dblClickFlag = true;
      pikaSoundEffect.play();
      if(isPlaying){
        pikachu.src = "/assets/images/pikaDance.gif";
      }
      changeAudioSource();
      homepage.style.backgroundImage = `url("/assets/images/bgm3.webp")`;
    } else {
      console.log("already clicked");
    }
  });

  audio.addEventListener('pause', ()=>{
    isPlaying = false;
    pikachu.src = "/assets/images/531-5319654_pikachu-pixel-art-maker-pikachu-pixel-art-png.png";
  })

  audio.addEventListener('play', ()=>{
    isPlaying = true;
    pikachu.src = "/assets/images/pikaDance.gif";
  })
});
