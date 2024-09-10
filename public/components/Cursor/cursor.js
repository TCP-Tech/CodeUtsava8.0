// Check whetehr the device is mobile or not
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    console.log("You are using a mobile device.");
    document.styleSheets[4].disabled = true;
} else {
    console.log("You are using a desktop or non-mobile device.");
    document.styleSheets[4].disabled = false;
    document.addEventListener("contentsLoaded", () => {
    
        const cursorDot = document.getElementById("cursor-dot");
        const cursorOutline = document.getElementById("cursor");
        let elements = document.querySelectorAll('.button');
        let isHoveringButton = false;
    
        console.log(elements);
    
        // Utility to update cursor position
        function updateCursorPosition(cursor, posX, posY) {
            cursor.style.left = `${posX - (cursor.clientWidth / 2)}px`;
            cursor.style.top = `${posY - (cursor.clientHeight / 2)}px`;
            animateCursor(posX,posY,duration = 500);
        }
    
        // Start animation
        function animateCursor(posX, posY, duration = 500) {
            cursorOutline.animate({
                left: `${posX - (cursorOutline.clientWidth / 2)}px`,
                top: `${posY - (cursorOutline.clientHeight / 2)}px`,
            }, { duration, fill: "forwards" });
        }
    
        // Event listener for mouse movement
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
    
            if (!isHoveringButton) {
                updateCursorPosition(cursorDot, posX, posY);
                updateCursorPosition(cursorOutline, posX, posY);
            }
        });
    
        // Hover effects on buttons and anchor tags
    
            elements.forEach(element => {
                element.addEventListener('mouseover', () => {
                    isHoveringButton = true;
                    const rect = element.getBoundingClientRect();
    
                    cursorDot.style.display = 'none';
                    cursorOutline.style.width = `${rect.width}px`;
                    cursorOutline.style.height = `${rect.height}px`;
                    updateCursorPosition(cursorOutline, rect.left + rect.width / 2, rect.top + rect.height / 2);
                    cursorOutline.classList.add('animate-pulse');
                });
    
                element.addEventListener('mouseout', () => {
                    isHoveringButton = false;
                    cursorDot.style.display = 'block';
                    cursorOutline.style.width = '40px';
                    cursorOutline.style.height = '40px';
                    cursorOutline.classList.remove('animate-pulse');
                });
            });
    });
}




