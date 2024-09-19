document.addEventListener("contentsLoaded" , ()=>{
    const hamburg = document.querySelector(".codeutsava_dynamci-route-hamburger");
    console.log("ham",hamburg)
    function toggleMenu() {
      console.log("Clicked")
      const hamburger = document.querySelector(".ham1");
      const menu = document.getElementById("hamburgerMenu1");
      hamburger.classList.toggle("active");
      menu.classList.toggle("activeMenu");
    }
    
    hamburg.addEventListener("click", toggleMenu);
  })
  