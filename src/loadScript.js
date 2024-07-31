function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar-container', 'components/navbar.html');
    loadComponent('main-container', 'components/main.html');
    loadComponent('footer-container', 'components/footer.html');
});