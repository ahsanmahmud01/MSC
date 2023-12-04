var navbar = document.querySelector('.navbar');
var content = document.querySelector('.main-content');
var isMobile = window.innerWidth <= 600;

if (!isMobile) {
    navbar.addEventListener('mouseenter', function () {
        if (!navbar.classList.contains('expanded')) {
            navbar.style.transform = 'translateX(0)';
        }
    });

    navbar.addEventListener('mouseleave', function () {
        if (!navbar.classList.contains('expanded')) {
            navbar.style.transform = 'translateX(-130px)'; // Adjust this value based on your design
        }
    });
}

navbar.addEventListener('click', function () {
    if (isMobile) {
        navbar.classList.toggle('expanded');
        content.style.marginLeft = navbar.classList.contains('expanded') ? '200px' : '70px';
    }
});

var links = document.querySelectorAll('.navbar a');
links.forEach(function (link) {
    link.addEventListener('click', function () {
        if (isMobile) {
            navbar.classList.remove('expanded');
            content.style.marginLeft = '70px';
        }
    });
});

document.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    document.body.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
});

// Adjust content margin if navbar is still expanded when the window is resized
window.addEventListener('resize', function () {
    if (isMobile && navbar.classList.contains('expanded')) {
        content.style.marginLeft = '200px';
    }
});
