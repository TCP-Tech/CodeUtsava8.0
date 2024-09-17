function loadanimation() {
  const counters = document.querySelectorAll(".participation-container_box1");

  function startCounter(counterElement) {
    const targetValue = parseInt(counterElement.getAttribute("data-target"));
    let currentValue = 0;
    const increment = Math.ceil(targetValue / 200); // Adjust speed by changing this value

    const updateCounter = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(updateCounter);
      }
      counterElement.textContent = currentValue + "+";
    }, 10); // Adjust interval duration for speed
  }

  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const countersInView = entry.target.querySelectorAll(".participation-container_box1");
        countersInView.forEach(counter => {
          // Reset the counter before starting it again
          counter.textContent = "0";
          startCounter(counter);
        });
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });

  // Add a check to see if the elements are already in the viewport on load
  document.querySelectorAll('.participation_codeutsava__sponsers-carousel-container').forEach(section => {
    observer.observe(section);
  });
}

// Ensure loadanimation is called after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadanimation();
});

export default loadanimation;
