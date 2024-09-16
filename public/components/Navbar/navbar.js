document.addEventListener("contentsLoaded" , ()=>{
  const hamburg = document.querySelector(".hamburger");
  console.log("ham",hamburg)
  function toggleMenu() {
    console.log("Clicked")
    const hamburger = document.querySelector(".ham");
    const menu = document.getElementById("hamburgerMenu");
    hamburger.classList.toggle("active");
    menu.classList.toggle("activeMenu");
  }
  
  hamburg.addEventListener("click", toggleMenu);
})

