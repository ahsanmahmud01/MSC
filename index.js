// JavaScript for animating waves
document.addEventListener('DOMContentLoaded', function () {
    const waves = document.querySelector('.waves');

    // Function to animate waves
    function animateWaves() {
        let scrollPos = 0;
        window.addEventListener('scroll', function () {
            scrollPos = window.scrollY;
            waves.style.transform = 'translate3d(0, ' + scrollPos / 10 + 'px, 0)';
        });
    }

    animateWaves(); // Call the function to start animation
});
