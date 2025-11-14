// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Close mobile navigation when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// Service Card Selection
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
    item.setAttribute('tabindex', '0'); // Make service items focusable
    item.addEventListener('click', () => {
        serviceItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
    });
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            serviceItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        }
    });
});

// Our Advantage Section - Animate on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
});

// Parallax effect on scroll for our advantage cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.stat-card');
    
    cards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.02);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, { passive: true });

// Topbar scroll effect 
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Initialize header state on page load
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Update copyright year
document.getElementById('copyright-year').textContent = new Date().getFullYear();