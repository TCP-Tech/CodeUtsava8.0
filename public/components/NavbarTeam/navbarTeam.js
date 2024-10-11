document.addEventListener("contentsLoaded" , ()=>{
    const hamburg = document.querySelectorAll(".codeutsava_dynamci-route-hamburger")[1];
    console.log("ham",hamburg)
    function toggleMenu() {
      console.log("Clicked")
      const hamburger = document.querySelectorAll(".ham1")[1];
      const menu = document.querySelectorAll("#hamburgerMenu1")[1];
      console.log(menu);
      hamburger.classList.toggle("active");
      menu.classList.toggle("activeMenu");
    }
    
    hamburg.addEventListener("click", toggleMenu);
  })
  