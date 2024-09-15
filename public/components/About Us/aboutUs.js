document.addEventListener("contentsLoaded", function () {
    const iconContainer = document.getElementById("iconContainer");
    const icons = ['fa-js', 'fa-git-alt', 'fa-react', 'fa-java', 'fa-html5', 'fa-css3', 'fa-node'];
    const numIcons = icons.length;
    const radius = window.innerWidth < 768 ? 100 : 150;
    
    icons.forEach((icon, index) => {
        const angle = (index * 360) / numIcons;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        
        const iconElement = document.createElement('i');
        iconElement.className = `fab ${icon} language-icon`;
        iconElement.style.top = `calc(50% - ${y}px)`;
        iconElement.style.left = `calc(50% + ${x}px)`;

        iconContainer.appendChild(iconElement);
    });
});
