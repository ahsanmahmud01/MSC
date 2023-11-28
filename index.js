var navbar = document.querySelector('.navbar');
    var content = document.querySelector('.main-content');
    var isMobile = window.innerWidth <= 600;

    // Hover toggle effect for PC
    if (!isMobile) {
        navbar.addEventListener('mouseenter', function() {
            navbar.style.width = '200px';
        });

        navbar.addEventListener('mouseleave', function() {
            if (!navbar.classList.contains('expanded')) {
                navbar.style.width = '50px';
            }
        });
    }

    // On-click expansion for mobile
    navbar.addEventListener('click', function() {
        if (isMobile) {
            navbar.classList.toggle('expanded');
            content.style.marginLeft = navbar.classList.contains('expanded') ? '200px' : '0';
        }
    });

    // Close sidebar on link click for mobile
    var links = document.querySelectorAll('.navbar a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            if (isMobile) {
                navbar.classList.remove('expanded');
                content.style.marginLeft = '0';
            }
        });
    });

    // Parallax effect on body
    document.addEventListener('scroll', function() {
        var scrolled = window.scrollY;
        document.body.style.backgroundPositionY = -(scrolled * 0.3) + 'px'; /* Adjust the multiplier for the parallax effect */
    });