/**
 * Apple-Inspired Portfolio - JavaScript Enhancements
 * Smooth scroll animations, navbar behavior, and micro-interactions
 */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // NAVBAR SCROLL BEHAVIOR
    // ==========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.classList.add('animate-on-scroll');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.bento-card, .timeline-item, .cert-card, .project-card, .about-card, .highlight-item'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu'); // Changed from nav-list to nav-menu to match HTML structure usually?

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // ==========================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ==========================================
    // PARALLAX EFFECT ON HERO IMAGE
    // ==========================================
    const heroImage = document.querySelector('.profile-pic');

    if (heroImage) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {
                heroImage.style.transform = 'none';
                return;
            }
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
        });
    }

    // ==========================================
    // BUTTON RIPPLE EFFECT
    // ==========================================
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ==========================================
    // LAZY LOADING IMAGES
    // ==========================================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ==========================================
    // PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT
    // ==========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
    }

});

// ==========================================
// CSS FOR ANIMATIONS (Add to style-apple.css)
// ==========================================
const animationStyles = `
  .animate-on-scroll {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  /* Mobile Navigation */
  @media (max-width: 768px) {
    .nav-list {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: saturate(180%) blur(20px);
      flex-direction: column;
      padding: var(--space-8);
      gap: var(--space-4);
      transform: translateY(-100%);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    .nav-list.active {
      transform: translateY(0);
      opacity: 1;
    }
    
    .nav-toggle.active .hamburger:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    
    .nav-toggle.active .hamburger:nth-child(2) {
      opacity: 0;
    }
    
    .nav-toggle.active .hamburger:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
    
    body.nav-open {
      overflow: hidden;
    }
  }
`;
