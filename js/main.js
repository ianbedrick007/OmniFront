// OmniLabs Ghana - Main Logic
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const normalNav = document.getElementById('nav-container-normal');
    const scrolledNav = document.getElementById('nav-container-scrolled');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer to highlight active section in scrolled nav
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-target') === id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Fetch user location and update pricing to Cedis if in Ghana
    fetch('https://get.geojs.io/v1/ip/country.json')
        .then(response => response.json())
        .then(data => {
            if (data.country === 'GH' || data.name === 'Ghana') {
                const currencySymbols = document.querySelectorAll('.currency-symbol');
                const priceAmounts = document.querySelectorAll('.price-amount');

                currencySymbols.forEach(symbol => symbol.textContent = 'GH₵');
                priceAmounts.forEach(value => {
                    const ghsPrice = value.getAttribute('data-ghs');
                    if (ghsPrice) {
                        value.textContent = ghsPrice;
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching location:', error));
});
