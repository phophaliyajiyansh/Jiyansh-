document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Remove Loader
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 1500); // Fake load time


    // 0. Background Music Control
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

bgMusic.volume = 0.3; // default volume
let musicPlaying = false;

musicToggle.addEventListener("click", () => {
    if (!musicPlaying) {
        bgMusic.play();
        fadeIn(bgMusic);
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        musicPlaying = true;
    } else {
        fadeOut(bgMusic);
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicPlaying = false;
    }
});

// Smooth fade in
function fadeIn(audio) {
    audio.volume = 0;
    let v = 0;
    const fade = setInterval(() => {
        if (v < 0.3) {
            v += 0.02;
            audio.volume = v;
        } else {
            clearInterval(fade);
        }
    }, 100);
}

// Smooth fade out
function fadeOut(audio) {
    let v = audio.volume;
    const fade = setInterval(() => {
        if (v > 0.02) {
            v -= 0.02;
            audio.volume = v;
        } else {
            audio.pause();
            clearInterval(fade);
        }
    }, 100);
}


    // 2. Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Reveal Animations on Scroll
    const reveals = document.querySelectorAll(".car-card, .mode-box, .section-title, .gallery-item");

    // Add 'reveal' class initially to elements intended for animation
    reveals.forEach(el => el.classList.add("reveal"));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
                
                // Specific Trigger for Car Stats Bar
                if (reveal.classList.contains("car-card")) {
                    animateStats(reveal);
                }
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);

    // 4. Car Stats Animation Logic
    function animateStats(card) {
        const bars = card.querySelectorAll(".bar-fill");
        bars.forEach(bar => {
            // Read width from inline style and re-apply it to trigger CSS transition
            // We temporarily set it to 0 in CSS class usually, 
            // but here we ensure the transition happens by resetting.
            const targetWidth = bar.style.width;
            bar.style.width = "0"; // Reset
            setTimeout(() => {
                bar.style.width = targetWidth; // Fill
            }, 100);
        });
    }

    // 5. Mobile Menu Toggle (Simple)
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "70px";
            navLinks.style.right = "0";
            navLinks.style.background = "#050505";
            navLinks.style.width = "100%";
            navLinks.style.padding = "20px";
            navLinks.style.borderBottom = "2px solid #00f3ff";
        }
    });
});
