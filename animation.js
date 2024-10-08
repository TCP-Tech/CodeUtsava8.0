ScrollTrigger.defaults({
    start: "top 80%",
    scroller: "body",
    once:false
});

document.addEventListener("introAnimationCompleted", () => {
    // Initial animations when the intro completes
    gsap.from(".codeutsava__navbar-container, .codeutsava__navbar-logo, .codeutsava__navbar-brochure-button, .codeutsava__navbar-navitem, .codeutsava__section1-side-links, .scroll-down-section", {
        y: -30,
        opacity: 0,
        delay: 0.8,
        stagger: 0.2
    });

    gsap.from(".codeutsava_main-welcome-to, .codeutsava__section1-image, .codeutsava_main-start-btn-section, .mobile-message, .codeutsava__section1-subheading, .codeutsava__section1-para, .codeutsava__section1-button-container", {
        y: -20,
        opacity: 0,
        delay: 4,
        duration: 0.7,
        stagger:0.2
    });

    // Participation 
    gsap.timeline({
        scrollTrigger: {
            trigger: ".participation-heading-container",
        }
    })
    .from(".participation-heading-container h1", { y: -20, opacity: 0, duration: 0.5 })
    .from(".participation-heading-container img", { y: -20, opacity: 0, duration: 0.5 });

    // About Us 
    gsap.timeline({
        scrollTrigger: {
            trigger: ".about-us-heading-container"
        }
    })
    .from(".about-us-heading-container h1", { y: -20, opacity: 0, duration: 0.5 })
    .from(".about-us-heading-container img", { y: -20, opacity: 0, duration: 0.5 });

    // Sponsors heading animation
    gsap.from(".codeutsava_sponsers_heading", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".codeutsava_sponsers_heading",
        }
    });

    // Timeline heading animation
    gsap.from(".codeutsava__timeline_heading", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".codeutsava__timeline_heading",
        }
    });

    // Guidelines section animation
    gsap.from(".cu-guidelines-header", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".cu-guidelines-header",
        }
    });
    //Prizes header
    gsap.from(".prizes-header", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".prizes-header",
        }
    });

    // Heading container animation
    gsap.from(".heading-container", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".heading-container",
        }
    });

    // Sponsors carousel 
    gsap.from(".participation_codeutsava__sponsers-carousel-container1", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".participation_codeutsava__sponsers-carousel-container1",
        }
    });

    // About Us section 
    gsap.from(".about-us-section", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".about-us-section",
        }
    });

    //Prizes Container
    gsap.from(".prizes-container", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".prizes-container",
        }
    });

    // Sponsors subheading and carousel container
    gsap.from(".codeutsava_sponsors_subheading, .codeutsava__sponsers-carousel-container", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".codeutsava_sponsors_subheading",
        }
    });

    // GuideLines Section
    gsap.from(".cu-container", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".cu-container",
        }
    });

    // Chart container 
    gsap.from(".chart-container", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".chart-container",
        }
    });
});
