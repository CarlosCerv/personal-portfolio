// FILE: public/js/main.js
// Frontend JavaScript for interactivity

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // MOBILE MENU TOGGLE (Handled by apple-interactions.js)
  // ==========================================
  // Logic removed to prevent double-toggling conflict


  // ==========================================
  // DARK MODE TOGGLE
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply saved theme on page load
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');

      // Update icon
      if (body.classList.contains('dark-mode')) {
        if (themeIcon) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        }
        localStorage.setItem('theme', 'dark');
      } else {
        if (themeIcon) {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Only prevent default if it's not just '#'
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ==========================================
  // ADD SCROLL ANIMATION TO ELEMENTS
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll('.project-card, .post-card, .hobby-card, .episode-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ==========================================
  // NAVBAR SCROLL EFFECTS
  // ==========================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when scrolling down
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ==========================================
  // ANIMATED COUNTER FOR STATS
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target + '+';
        }
      };

      updateCounter();
    });

    statsAnimated = true;
  }

  // Trigger animation when stats section comes into view
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  // ==========================================
  // COPY CODE BLOCKS TO CLIPBOARD (for blog posts)
  // ==========================================
  const codeBlocks = document.querySelectorAll('.post-content pre');

  codeBlocks.forEach((block) => {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    // Wrap pre in a relative container
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);
    wrapper.appendChild(copyButton);

    // Show button on hover
    wrapper.addEventListener('mouseenter', () => {
      copyButton.style.opacity = '1';
    });

    wrapper.addEventListener('mouseleave', () => {
      copyButton.style.opacity = '0';
    });

    // Copy functionality
    copyButton.addEventListener('click', async () => {
      const code = block.querySelector('code');
      const text = code ? code.textContent : block.textContent;

      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        copyButton.textContent = 'Error';
      }
    });
  });

  // ==========================================
  // EXTERNAL LINK INDICATOR
  // ==========================================
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach(link => {
    if (!link.querySelector('i')) {
      link.style.display = 'inline-flex';
      link.style.alignItems = 'center';
      link.style.gap = '4px';
    }
  });

  // ==========================================
  // BLOG SEARCH & FILTERS (Handled by apple-interactions.js)
  // ==========================================
  // Logic moved to apple-interactions.js for enhanced Recent Searches support

  // ==========================================
  // READING PROGRESS BAR (for blog posts)
  // ==========================================
  const postContent = document.querySelector('.post-content');

  if (postContent) {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--primary-hover));
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / documentHeight) * 100;

      progressBar.style.width = progress + '%';
    });
  }

  // ==========================================
  // PROJECT SEARCH & FILTERS (Handled by apple-interactions.js)
  // ==========================================
  // Logic moved to apple-interactions.js for enhanced Recent Searches support

  // ==========================================
  // ADD FADE IN ANIMATION CSS
  // ==========================================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  console.log('Website loaded successfully!');
});
