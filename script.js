document.addEventListener('DOMContentLoaded', () => {
    // Cinematic Preloader Logic
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        }, 1500); // Luxury delay
    });

    // Interactive Elements
    const glow = document.getElementById('cursor-glow');
    const mesh = document.querySelector('.bg-mesh');
    const tagline = document.querySelector('.tagline');
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    // Cipher Text Scramble Effect
    const scrambleText = (el, finalContent) => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%";
        let iteration = 0;
        const interval = setInterval(() => {
            el.innerText = finalContent.split("")
                .map((letter, index) => {
                    if(index < iteration) return finalContent[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                }).join("");
            
            if(iteration >= finalContent.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    };

    if(tagline) {
        setTimeout(() => scrambleText(tagline, tagline.innerText), 2000);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Parallax Mesh Grid
        const moveX = (window.innerWidth / 2 - mouseX) * 0.02;
        const moveY = (window.innerHeight / 2 - mouseY) * 0.02;
        mesh.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Magnetic Dynamic Feedback
    const magnets = document.querySelectorAll('.btn, .feature-card, .logo-container img');
    magnets.forEach(m => {
        m.addEventListener('mousemove', (e) => {
            const rect = m.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const force = m.classList.contains('btn') ? 0.3 : 0.1;
            m.style.transform = `translate(${x * force}px, ${y * force}px) scale(1.03)`;
        });
        m.addEventListener('mouseleave', () => {
            m.style.transform = `translate(0px, 0px) scale(1)`;
        });
    });

    // Smooth lerping for the glow follow
    function updateGlow() {
        glowX += (mouseX - glowX) * 0.04;
        glowY += (mouseY - glowY) * 0.04;
        
        glow.style.left = `${glowX - 450}px`;
        glow.style.top = `${glowY - 450}px`;
        requestAnimationFrame(updateGlow);
    }
    updateGlow();

    // Staggered Reveal Animations
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Navbar luxury behavior
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            nav.style.padding = '2rem 0';
            nav.style.background = 'rgba(2, 2, 2, 0.98)';
        } else {
            nav.style.padding = '3rem 0';
            nav.style.background = 'transparent';
        }
    });
});
