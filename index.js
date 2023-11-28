function toggleNav() {
    var sidebar = document.querySelector('.navbar');
    var content = document.querySelector('.main-content');
    if (sidebar.style.width === '200px') {
        sidebar.style.width = '50px';
        content.style.marginLeft = '50px';
    } else {
        sidebar.style.width = '200px';
        content.style.marginLeft = '200px';
    }
}