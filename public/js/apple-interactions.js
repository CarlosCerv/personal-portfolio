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

    // ==========================================
    // PROJECT SEARCH & RECENT HISTORY
    // ==========================================
    const projectSearch = document.getElementById('projectSearch');
    const projectCards = document.querySelectorAll('.project-card');
    const recentSearchesContainer = document.getElementById('recentSearches');
    const MAX_RECENT_SEARCHES = 5;

    if (projectSearch) {
        // Initial render of recent searches
        renderRecentSearches();

        // Handle search input
        projectSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterProjects(searchTerm);
        });

        // Save search on Enter key
        projectSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = projectSearch.value.trim();
                if (searchTerm) {
                    saveSearch(searchTerm);
                    renderRecentSearches();
                }
            }
        });

        // Also save on blur if not empty
        projectSearch.addEventListener('blur', () => {
            const searchTerm = projectSearch.value.trim();
            if (searchTerm && searchTerm.length > 2) {
                saveSearch(searchTerm);
                renderRecentSearches();
            }
        });

        function filterProjects(term) {
            projectCards.forEach(card => {
                const name = card.dataset.name || '';
                const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
                const language = card.dataset.language?.toLowerCase() || '';

                if (name.includes(term) || description.includes(term) || language.includes(term)) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
            showEmptyState(term);
        }

        function saveSearch(term) {
            let history = JSON.parse(localStorage.getItem('recentSearches') || '[]');
            // Remove if already exists (to move to front)
            history = history.filter(item => item.toLowerCase() !== term.toLowerCase());
            // Add to front
            history.unshift(term);
            // Limit size
            history = history.slice(0, MAX_RECENT_SEARCHES);
            localStorage.setItem('recentSearches', JSON.stringify(history));
        }

        function renderRecentSearches() {
            if (!recentSearchesContainer) return;

            const history = JSON.parse(localStorage.getItem('recentSearches') || '[]');

            if (history.length === 0) {
                recentSearchesContainer.innerHTML = '';
                return;
            }

            recentSearchesContainer.innerHTML = history.map(term => `
                <div class="search-pill" data-term="${term}">
                    <span class="pill-text">${term}</span>
                    <span class="pill-remove" onclick="event.stopPropagation(); window.removeRecentSearch('${term}')">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            `).join('');

            // Add click listeners to pills
            recentSearchesContainer.querySelectorAll('.search-pill').forEach(pill => {
                pill.addEventListener('click', () => {
                    const term = pill.dataset.term;
                    projectSearch.value = term;
                    filterProjects(term.toLowerCase());
                    // Update filters UI if needed
                    resetCategoryFilters();
                });
            });
        }

        // Expose remove function globally for the onclick handler
        window.removeRecentSearch = (term) => {
            let history = JSON.parse(localStorage.getItem('recentSearches') || '[]');
            history = history.filter(item => item !== term);
            localStorage.setItem('recentSearches', JSON.stringify(history));
            renderRecentSearches();
        };

        function showEmptyState(term) {
            const visibleCards = Array.from(projectCards).filter(card => !card.classList.contains('hidden'));
            const container = document.querySelector('.projects .container');
            let emptyState = document.querySelector('.no-results-projects');

            if (visibleCards.length === 0) {
                if (!emptyState) {
                    emptyState = document.createElement('div');
                    emptyState.className = 'no-results-projects';
                    emptyState.style.textAlign = 'center';
                    emptyState.style.padding = 'var(--space-12) 0';
                    container.appendChild(emptyState);
                }
                emptyState.innerHTML = `
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--border-medium); margin-bottom: var(--space-4); display: block;"></i>
                    <h3 style="margin-bottom: var(--space-2);">No projects found</h3>
                    <p style="color: var(--text-secondary);">No results matching "${term}". Try a different search term.</p>
                `;
            } else if (emptyState) {
                emptyState.remove();
            }
        }

        // Category Filters Integration
        const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;
                projectSearch.value = ''; // Clear search when switching categories

                projectCards.forEach(card => {
                    const lang = card.dataset.language || '';
                    if (filter === 'all' || lang === filter) {
                        card.classList.remove('hidden');
                        card.style.display = '';
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                });
                showEmptyState('');
            });
        });

        function resetCategoryFilters() {
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === 'all') btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }
    }

    // ==========================================
    // BLOG SEARCH & RECENT HISTORY
    // ==========================================
    const blogSearch = document.getElementById('blogSearch');
    const blogPosts = document.querySelectorAll('.post-card');
    const recentBlogSearchesContainer = document.getElementById('recentBlogSearches');
    const MAX_RECENT_BLOG_SEARCHES = 5;

    if (blogSearch) {
        // Initial render
        renderRecentBlogSearches();

        // Handle search input
        blogSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterBlogPosts(searchTerm);
        });

        // Save search on Enter
        blogSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = blogSearch.value.trim();
                if (searchTerm) {
                    saveBlogSearch(searchTerm);
                    renderRecentBlogSearches();
                }
            }
        });

        // Save on blur
        blogSearch.addEventListener('blur', () => {
            const searchTerm = blogSearch.value.trim();
            if (searchTerm && searchTerm.length > 2) {
                saveBlogSearch(searchTerm);
                renderRecentBlogSearches();
            }
        });

        function filterBlogPosts(term) {
            blogPosts.forEach(card => {
                const title = card.querySelector('.post-title')?.textContent.toLowerCase() || '';
                const excerpt = card.querySelector('.post-excerpt')?.textContent.toLowerCase() || '';
                const tags = card.dataset.tags?.toLowerCase() || '';

                if (title.includes(term) || excerpt.includes(term) || tags.includes(term)) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
            showBlogEmptyState(term);
        }

        function saveBlogSearch(term) {
            let history = JSON.parse(localStorage.getItem('recentBlogSearches') || '[]');
            history = history.filter(item => item.toLowerCase() !== term.toLowerCase());
            history.unshift(term);
            history = history.slice(0, MAX_RECENT_BLOG_SEARCHES);
            localStorage.setItem('recentBlogSearches', JSON.stringify(history));
        }

        function renderRecentBlogSearches() {
            if (!recentBlogSearchesContainer) return;

            const history = JSON.parse(localStorage.getItem('recentBlogSearches') || '[]');

            if (history.length === 0) {
                recentBlogSearchesContainer.innerHTML = '';
                return;
            }

            recentBlogSearchesContainer.innerHTML = history.map(term => `
                <div class="search-pill" data-term="${term}">
                    <span class="pill-text">${term}</span>
                    <span class="pill-remove" onclick="event.stopPropagation(); window.removeRecentBlogSearch('${term}')">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            `).join('');

            recentBlogSearchesContainer.querySelectorAll('.search-pill').forEach(pill => {
                pill.addEventListener('click', () => {
                    const term = pill.dataset.term;
                    blogSearch.value = term;
                    filterBlogPosts(term.toLowerCase());
                    resetBlogCategoryFilters();
                });
            });
        }

        window.removeRecentBlogSearch = (term) => {
            let history = JSON.parse(localStorage.getItem('recentBlogSearches') || '[]');
            history = history.filter(item => item !== term);
            localStorage.setItem('recentBlogSearches', JSON.stringify(history));
            renderRecentBlogSearches();
        };

        function showBlogEmptyState(term) {
            const visiblePosts = Array.from(blogPosts).filter(card => card.style.display !== 'none');
            const postsGrid = document.querySelector('.posts-grid');
            let emptyState = document.querySelector('.no-results-blog');

            if (visiblePosts.length === 0) {
                if (!emptyState) {
                    emptyState = document.createElement('div');
                    emptyState.className = 'no-results-blog';
                    emptyState.style.textAlign = 'center';
                    emptyState.style.padding = 'var(--space-12) 0';
                    emptyState.style.width = '100%';
                    postsGrid.parentNode.appendChild(emptyState);
                }
                emptyState.innerHTML = `
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--border-medium); margin-bottom: var(--space-4); display: block;"></i>
                    <h3 style="margin-bottom: var(--space-2);">No articles found</h3>
                    <p style="color: var(--text-secondary);">No results matching "${term}". Try a different search term.</p>
                `;
            } else if (emptyState) {
                emptyState.remove();
            }
        }

        // Blog Category Filters
        const blogFilterButtons = document.querySelectorAll('.blog-filters .filter-btn');
        blogFilterButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                blogFilterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;
                blogSearch.value = '';

                blogPosts.forEach(card => {
                    const tags = card.dataset.tags || '';
                    if (filter === 'all' || tags.includes(filter)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
                showBlogEmptyState('');
            });
        });

        function resetBlogCategoryFilters() {
            blogFilterButtons.forEach(btn => {
                if (btn.dataset.filter === 'all') btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }
    }

    // ==========================================
    // SINGLE BLOG POST VIEW - INTERACTIONS
    // ==========================================
    const blogPost = document.querySelector('.blog-post');
    const readingProgress = document.getElementById('readingProgress');
    const progressDot = document.getElementById('progressIndicator');
    const readingTimeEl = document.getElementById('readingTime');
    const postContent = document.querySelector('.post-content-refined');

    if (blogPost && postContent) {
        // Calculate reading time
        const text = postContent.innerText;
        const wpm = 225; // Average reading speed
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        if (readingTimeEl) readingTimeEl.innerText = `${time} min read`;

        // Update reading progress
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const fullHeight = blogPost.offsetHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / (fullHeight - windowHeight)) * 100;

            if (readingProgress) {
                readingProgress.style.width = `${Math.min(progress, 100)}%`;
            }

            if (progressDot) {
                // Subtle dot movement or scale for Apple vibe
                const scale = 1 + (progress / 100);
                progressDot.style.transform = `scale(${Math.min(scale, 1.5)})`;
                if (progress > 95) progressDot.style.background = 'var(--accent-blue)';
                else progressDot.style.background = 'var(--border-medium)';
            }
        });

        // Initialize scroll animations for post elements
        const postObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    postObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            postObserver.observe(el);
        });
    }

    // Social Sharing - Copy Link
    window.copyPostLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            // Simple toast notification replacement
            const btn = document.querySelector('.share-btn i.fa-link').parentElement;
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.borderColor = 'var(--accent-green)';
            btn.style.color = 'var(--accent-green)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);
        });
    };

});


