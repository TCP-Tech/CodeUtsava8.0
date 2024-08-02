document.addEventListener("DOMContentLoaded", function () {
  const gifContainer = document.querySelector(".image-container");

  // Delay of 0.3 seconds (300 milliseconds)
  setTimeout(() => {
    // Create an img element for the GIF
    const gif = document.createElement("img");
    gif.src = "./src/assets/images/ground-breaking.gif";
    gif.alt = "Intro GIF";
    gif.classList.add("intro-gif");

    // Append the GIF to the container
    gifContainer.appendChild(gif);

    // Delay before starting the fade-out effect
    setTimeout(() => {
      gif.classList.add("fade-out");

      // Remove the GIF from the DOM after the fade-out effect
      setTimeout(() => {
        gifContainer.removeChild(gif);
      }, 1500); // Match this to the CSS transition duration
    }, 100); // Adjust the delay as needed
  }, 100); // Initial delay before adding the GIF to the DOM
});
