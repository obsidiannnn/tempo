// script.js for Reflow.ai

// This script is ready for future enhancements.
// For example, making the navbar sticky on scroll or handling a mobile menu.

document.addEventListener('DOMContentLoaded', () => {
    console.log("Reflow.ai page loaded and ready.");

    const launchButton = document.querySelector('.launch-btn');

    if (launchButton) {
        launchButton.addEventListener('click', (event) => {
            // Prevent the default link behavior for demonstration
            event.preventDefault();
            
            // You can add any action here, for example:
            // alert('Redirecting to the app...');
            // window.location.href = 'https://app.reflow.ai';
            console.log('Launch App button was clicked.');
        });
    }
});