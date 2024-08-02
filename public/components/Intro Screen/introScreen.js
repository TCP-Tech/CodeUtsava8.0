const introButton = document.getElementById('intro-button');
const leftCloud = document.getElementById('leftCloud');
const rightCloud = document.getElementById('rightCloud');

introButton.addEventListener('click', function() {
    leftCloud.classList.add('animation-left-cloud');
    rightCloud.classList.add('animation-right-cloud');
});