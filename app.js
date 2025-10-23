// A function that waits for the DOM to be fully loaded before running the script
const navSlide = () => {
    // Select the hamburger menu and the navigation links container from the DOM
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
  
    // Add a click event listener to the hamburger menu
    hamburger.addEventListener('click', () => {
      // When clicked, toggle the 'nav-active' class on the nav-links container.
      // This will trigger the slide-in/slide-out animation from your CSS.
      nav.classList.toggle('nav-active');
  
      // Also, toggle the 'toggle' class on the hamburger icon itself.
      // This will trigger the animation that turns the bars into an 'X'.
      hamburger.classList.toggle('toggle');
    });
  }

// Pin hover management to prevent blocking
const managePinHover = () => {
    const pins = document.querySelectorAll('.pin');
    let currentZIndex = 100;
    
    pins.forEach(pin => {
        pin.addEventListener('mouseenter', () => {
            // Reset all pins to base z-index
            pins.forEach(p => p.style.zIndex = '1');
            // Set current pin to highest z-index
            pin.style.zIndex = currentZIndex.toString();
            
            // Special handling for edge pins like SIGINT (Cyprus)
            if (pin.classList.contains('pin-Cyprus')) {
                pin.style.zIndex = '200'; // Even higher z-index for edge pins
            }
            
            currentZIndex++;
        });
    });
}

// Call the functions to activate them
navSlide();
managePinHover();