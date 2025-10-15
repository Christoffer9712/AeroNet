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
  
  // Call the function to activate it
  navSlide();