// FILE: public/js/main.js
// Frontend JavaScript for interactivity

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open on mobile
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
      
      if (!isClickInside && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
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
    themeToggle.addEventListener('click', function() {
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
    anchor.addEventListener('click', function(e) {
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
  
  const observer = new IntersectionObserver(function(entries) {
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
  // NAVBAR SHADOW ON SCROLL
  // ==========================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 2px 10px var(--shadow-strong)';
    } else {
      navbar.style.boxShadow = '0 2px 10px var(--shadow)';
    }
    
    lastScroll = currentScroll;
  });
  
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
  // BLOG SEARCH FUNCTIONALITY
  // ==========================================
  const blogSearch = document.getElementById('blogSearch');
  const postCards = document.querySelectorAll('.post-card');
  
  if (blogSearch && postCards.length > 0) {
    blogSearch.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      
      postCards.forEach(card => {
        const title = card.querySelector('.post-title')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('.post-excerpt')?.textContent.toLowerCase() || '';
        const tags = card.dataset.tags?.toLowerCase() || '';
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.includes(searchTerm)) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show empty state if no results
      const visibleCards = Array.from(postCards).filter(card => card.style.display !== 'none');
      const emptyState = document.querySelector('.blog-list .empty-state');
      
      if (visibleCards.length === 0 && !emptyState) {
        const postsGrid = document.querySelector('.posts-grid');
        const noResults = document.createElement('div');
        noResults.className = 'empty-state no-results';
        noResults.innerHTML = `
          <i class="fas fa-search"></i>
          <p>No articles found matching "${searchTerm}"</p>
        `;
        postsGrid.parentNode.appendChild(noResults);
      } else if (visibleCards.length > 0) {
        const noResults = document.querySelector('.no-results');
        if (noResults) noResults.remove();
      }
    });
  }
  
  // ==========================================
  // BLOG FILTER FUNCTIONALITY
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (filterButtons.length > 0 && postCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.dataset.filter;
        
        // Reset search
        if (blogSearch) blogSearch.value = '';
        
        // Filter posts
        postCards.forEach(card => {
          const tags = card.dataset.tags || '';
          
          if (filterValue === 'all' || tags.includes(filterValue)) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        });
        
        // Remove any no-results message
        const noResults = document.querySelector('.no-results');
        if (noResults) noResults.remove();
      });
    });
  }
  
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
  // PROJECT SEARCH FUNCTIONALITY
  // ==========================================
  const projectSearch = document.getElementById('projectSearch');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (projectSearch && projectCards.length > 0) {
    projectSearch.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      
      projectCards.forEach(card => {
        const name = card.dataset.name || '';
        const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        const language = card.dataset.language?.toLowerCase() || '';
        
        if (name.includes(searchTerm) || description.includes(searchTerm) || language.includes(searchTerm)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.classList.add('hidden');
        }
      });
      
      // Show empty state if no results
      showProjectEmptyState(projectCards, searchTerm);
    });
  }
  
  // ==========================================
  // PROJECT FILTER FUNCTIONALITY
  // ==========================================
  const projectFilterButtons = document.querySelectorAll('.project-filters .filter-btn');
  
  if (projectFilterButtons.length > 0 && projectCards.length > 0) {
    projectFilterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        projectFilterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.dataset.filter;
        
        // Reset search
        if (projectSearch) projectSearch.value = '';
        
        // Filter projects
        projectCards.forEach(card => {
          const language = card.dataset.language || '';
          
          if (filterValue === 'all' || language === filterValue) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.classList.add('hidden');
          }
        });
        
        // Remove any no-results message
        const noResults = document.querySelector('.projects .no-results');
        if (noResults) noResults.remove();
      });
    });
  }
  
  // Helper function to show empty state for projects
  function showProjectEmptyState(cards, searchTerm = '') {
    const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
    const existingNoResults = document.querySelector('.projects .no-results');
    const projectsContainer = document.querySelector('.projects .container');
    
    if (visibleCards.length === 0 && !existingNoResults && projectsContainer) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.innerHTML = `
        <i class="fas fa-folder-open"></i>
        <h3>No projects found</h3>
        <p>${searchTerm ? `No projects match "${searchTerm}"` : 'Try adjusting your filters'}</p>
      `;
      projectsContainer.appendChild(noResults);
    } else if (visibleCards.length > 0 && existingNoResults) {
      existingNoResults.remove();
    }
  }
  
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
  
  console.log('🎉 Website loaded successfully!');
});
