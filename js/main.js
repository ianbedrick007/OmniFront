// Scroll Spy & Navbar Active State
export function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        // Handle Header Background/Visibility
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Handle Scroll Spy (Section Highlighting)
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const target = item.getAttribute('data-target');
            if (target === current) {
                item.classList.add('active');
            }
        });
    });
}

// Intersection Observer for fade-in effects
export function initAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, section h2, section p, .hero-logo').forEach(el => {
        el.style.opacity = "0";
        observer.observe(el);
    });
}

// Micro-interactions for depth layering (iOS style)
export function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        document.querySelectorAll('.floating-card').forEach(card => {
            card.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-5px)`;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollSpy();
    initAnimations();
    initParallax();
});
