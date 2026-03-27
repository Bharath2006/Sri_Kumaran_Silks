// GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// Hero Entrance Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.from(".gsap-reveal-sub", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" })
      .from(".gsap-reveal-title", { opacity: 0, y: 30, duration: 1, ease: "back.out(1.7)" }, "-=0.4")
      .from(".gsap-reveal-btn", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" }, "-=0.6");
});

// Magnetic 3D Service Cards Effect (Vanila refinement)
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        
        // Update spotlight effect
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
    });
});

// Scroll Reveal with GSAP for all sections
gsap.utils.toArray('section').forEach(section => {
    const reveals = section.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        gsap.from(reveals, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
                // markers: true, // For debugging and verification
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
    }
});

// Parallax for imagery
gsap.to(".about-image img", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".about-image",
        scrub: true
    }
});

// Header scroll color change
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});
// Stats Counter Animation
gsap.utils.toArray('#stats h4').forEach(stat => {
    const targetValue = parseFloat(stat.innerText.replace(/[^0-9.]/g, ''));
    const suffix = stat.innerText.replace(/[0-9.]/g, '');
    const obj = { val: 0 };
    
    gsap.to(obj, {
        val: targetValue,
        scrollTrigger: {
            trigger: stat,
            start: "top 95%",
            toggleActions: "play none none none"
        },
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function() {
            stat.innerText = Math.ceil(obj.val) + suffix;
        }
    });
});
