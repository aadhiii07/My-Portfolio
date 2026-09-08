// ========================================
// PREMIUM PORTFOLIO JAVASCRIPT
// Athithya B - Production Support Engineer
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------
    // MOBILE NAVIGATION
    // ----------------------------------------

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            });

        });

    }


    // ----------------------------------------
    // NAVBAR SCROLL EFFECT
    // ----------------------------------------

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        });

    }


    // ----------------------------------------
    // ACTIVE NAVIGATION LINK
    // ----------------------------------------

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener("scroll", updateActiveNavigation);


    // ----------------------------------------
    // SCROLL REVEAL ANIMATION
    // ----------------------------------------

    const revealElements = document.querySelectorAll(
        ".reveal, .section-heading, .skill-card, .experience-card, .highlight-card, .award-card, .education-card"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ----------------------------------------
    // ANIMATED NUMBER COUNTERS
    // ----------------------------------------

    const counters = document.querySelectorAll("[data-counter]");

    const animateCounter = (element) => {

        const target = parseFloat(element.dataset.counter);
        const suffix = element.dataset.suffix || "";

        let current = 0;

        const duration = 1600;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            current = target * easedProgress;

            if (Number.isInteger(target)) {
                element.textContent =
                    Math.floor(current) + suffix;
            } else {
                element.textContent =
                    current.toFixed(1) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }

        };

        requestAnimationFrame(updateCounter);

    };


    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    counterObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.7
        }
    );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    // ----------------------------------------
    // CARD MOUSE TILT EFFECT
    // ----------------------------------------

    const tiltCards = document.querySelectorAll(
        ".skill-card, .highlight-card, .award-card, .snapshot-card"
    );

    tiltCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2.5;

            const rotateY =
                ((x - centerX) / centerX) * 2.5;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    // ----------------------------------------
    // SMOOTH SCROLL
    // ----------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ----------------------------------------
    // HERO PARALLAX EFFECT
    // ----------------------------------------

    const heroGlowOne =
        document.querySelector(".hero-glow-one");

    const heroGlowTwo =
        document.querySelector(".hero-glow-two");

    window.addEventListener("mousemove", event => {

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);

        if (heroGlowOne) {

            heroGlowOne.style.transform =
                `translate(${x * 25}px, ${y * 25}px)`;

        }

        if (heroGlowTwo) {

            heroGlowTwo.style.transform =
                `translate(${x * -20}px, ${y * -20}px)`;

        }

    });


    // ----------------------------------------
    // TYPING EFFECT
    // ----------------------------------------

    const typingElement =
        document.querySelector(".typing-text");

    if (typingElement) {

        const words = [
            "Production Support",
            "Application Monitoring",
            "Incident Management",
            "Root Cause Analysis",
            "Production Stability"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typingSpeed = 80;
        const deletingSpeed = 45;
        const pauseTime = 1600;

        const typeEffect = () => {

            const currentWord =
                words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;

                if (characterIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        pauseTime
                    );

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;

                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) % words.length;

                }

            }

            setTimeout(
                typeEffect,
                deleting
                    ? deletingSpeed
                    : typingSpeed
            );

        };

        typeEffect();

    }


    // ----------------------------------------
    // SCROLL PROGRESS BAR
    // ----------------------------------------

    const progressBar =
        document.querySelector(".scroll-progress");

    if (progressBar) {

        window.addEventListener("scroll", () => {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress =
                (scrollTop / documentHeight) * 100;

            progressBar.style.width =
                `${progress}%`;

        });

    }


    // ----------------------------------------
    // BACK TO TOP BUTTON
    // ----------------------------------------

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 600) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // ----------------------------------------
    // CURRENT YEAR
    // ----------------------------------------

    const yearElement =
        document.querySelector(".current-year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    // ----------------------------------------
    // PAGE LOADED
    // ----------------------------------------

    document.body.classList.add("page-loaded");

});
