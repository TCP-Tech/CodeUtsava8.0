document.addEventListener('contentsLoaded', function() {
    console.log("DOM fully loaded and parsed");
    var timeline_blocks = document.querySelectorAll('.cd-timeline-block');
    

    if (!timeline_blocks || timeline_blocks.length === 0) {
        return; // Exit the function early
    }

    // Use Array.from to ensure we have an array-like object we can forEach over
    Array.from(timeline_blocks).forEach(function(block) {
        if (block.getBoundingClientRect().top > window.innerHeight * 0.75) {
            Array.from(block.querySelectorAll('.cd-timeline-img, .cd-timeline-content')).forEach(function(element) {
                element.classList.add('is-hidden');
            });
        }
    });

    window.addEventListener('scroll', function() {
        Array.from(timeline_blocks).forEach(function(block) {
            if (block.getBoundingClientRect().top <= window.innerHeight * 0.75 && 
                block.querySelector('.cd-timeline-img').classList.contains('is-hidden')) {
                Array.from(block.querySelectorAll('.cd-timeline-img, .cd-timeline-content')).forEach(function(element) {
                    element.classList.remove('is-hidden');
                    element.classList.add('bounce-in');
                });
            }
        });
    });
});