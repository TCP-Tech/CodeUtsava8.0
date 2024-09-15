document.addEventListener('contentsLoaded', () => {
    const elements = document.querySelectorAll('.faq-question');

    elements.forEach(item => {
        const content = item.querySelector('p');
        content.style.maxHeight = "0px";

        item.addEventListener('click', () => {
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0px";
            }
        });
    });
});
