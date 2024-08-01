function toggleMenu() {
  const hamburger = document.querySelector(".ham");
  const menu = document.getElementById("hamburgerMenu");
  hamburger.classList.toggle("active");
  menu.classList.toggle("activeMenu");
}
document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = async (targetId, url) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = text;
      }
    } catch (error) {
      console.error(`Error loading component from ${url}:`, error);
    }
  };
  loadComponent("intro-cointainer", "./components/Intro/Intro.html");
  loadComponent("navbar-container", "/components/Navbar/navbar.html");
  loadComponent("main-container", "/components/Hero Section/main.html");
  loadComponent("footer-container", "/components/Footer/footer.html");

  // Intro Logic Start
  const homepage = document.querySelector(".homepage");
  const intro = document.querySelector(".intro");
  homepage.classList.toggle("hide");

  document.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("text")) {
      intro.classList.add("remove");
      homepage.classList.remove("hide");
    }
  });

  // Intro Logic Ends
});
