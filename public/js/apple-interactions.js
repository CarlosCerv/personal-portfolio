/**
 * Apple-Inspired Portfolio - JavaScript Enhancements
 * Smooth scroll animations, navbar behavior, and micro-interactions
 */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // NAVBAR SCROLL BEHAVIOR + NAV HIGHLIGHT
    // (throttled via requestAnimationFrame)
    // ==========================================
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let ticking = false;

    function onScroll() {
        const currentScroll = window.pageYOffset;

        // Navbar compact state
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            document.body.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            document.body.classList.remove('scrolled');
        }

        // Active nav link highlighting
        const scrollPosition = currentScroll + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
                });
            }
        });
        // ==========================================
        // TESTING PYRAMID SCROLL SEQUENCES
        // ==========================================

        // 1. Matrix Scroll (Foundation)
        const scrollMatrix = document.getElementById('matrix-scroll');
        const viewMatrix = document.getElementById('sticky-view-matrix');
        if (scrollMatrix && viewMatrix) {
            const rect = scrollMatrix.getBoundingClientRect();
            let p = -rect.top / (rect.height - window.innerHeight);
            p = Math.max(0, Math.min(1, p));
            viewMatrix.style.setProperty('--matrix-scroll-p', p);
            
            // Annotation (0.1 - 0.3)
            const ann = document.getElementById('matrix-ann-1');
            if (ann) ann.classList.toggle('active', p > 0.1 && p < 0.3);

            // Pyramid levels highlighting
            for(let i=1; i<=4; i++) {
                const el = document.getElementById(`py-level-${i}`);
                if(el) el.classList.toggle('active', p > 0.75 && i === 1);
            }
        }

        // 2. API Scroll (Integration)
        const scrollApi = document.getElementById('api-scroll');
        const viewApi = document.getElementById('sticky-view-api');
        if (scrollApi && viewApi) {
            const rect = scrollApi.getBoundingClientRect();
            let p = -rect.top / (rect.height - window.innerHeight);
            p = Math.max(0, Math.min(1, p));
            viewApi.style.setProperty('--api-scroll-p', p);

            // Annotation (0 - 0.25)
            const reqAnn = document.getElementById('api-ann-req');
            if (reqAnn) reqAnn.classList.toggle('active', p > 0.1 && p < 0.25);

            // Network Annotation (0.3 - 0.5)
            const netAnn = document.getElementById('api-ann-1');
            if (netAnn) netAnn.classList.toggle('active', p > 0.3 && p < 0.5);

            // Annotation (0.5 - 0.75)
            const resAnn = document.getElementById('api-ann-res');
            if (resAnn) resAnn.classList.toggle('active', p > 0.55 && p < 0.75);
        }

        // 3. UI Automation Scroll (E2E)
        const scrollUi = document.getElementById('automation-scroll');
        const viewUi = document.getElementById('sticky-view-ui');
        if (scrollUi && viewUi) {
            const rect = scrollUi.getBoundingClientRect();
            let p = -rect.top / (rect.height - window.innerHeight);
            p = Math.max(0, Math.min(1, p));
            viewUi.style.setProperty('--ui-scroll-p', p);
            viewUi.style.setProperty('--scroll-p', p);

            const lines = document.querySelectorAll('#automation-code .code-line');
            if (lines.length) {
                const lp = Math.min(p / 0.28, 1);
                const idx = Math.floor(lp * (lines.length - 1));
                lines.forEach((l, i) => l.classList.toggle('active', i === idx && p < 0.28));
            }

            const cursor = document.getElementById('ui-cursor');
            const ripple = document.getElementById('ui-ripple');
            const ann1 = document.getElementById('ui-ann-1');
            const ai = document.getElementById('ui-ai-status');

            if (cursor && p >= 0.3) {
                let tx = 70, ty = 70;
                if (p > 0.35 && p < 0.5) { tx = 30; ty = 30; }
                else if (p >= 0.5 && p < 0.7) { tx = 50; ty = 60; }
                cursor.style.left = `${tx}%`;
                cursor.style.top = `${ty}%`;
                if (ripple) ripple.style.opacity = (p > 0.68 && p < 0.72) ? '1' : '0';
            }
            if (ann1) ann1.classList.toggle('active', p > 0.35 && p < 0.65);
            if (ai) ai.classList.toggle('active', p > 0.3 && p < 0.75);
        }

        // 4. Performance Scroll (Scalability)
        const scrollPerf = document.getElementById('perf-scroll');
        const viewPerf = document.getElementById('sticky-view-perf');
        if (scrollPerf && viewPerf) {
            const rect = scrollPerf.getBoundingClientRect();
            let p = -rect.top / (rect.height - window.innerHeight);
            p = Math.max(0, Math.min(1, p));
            viewPerf.style.setProperty('--perf-scroll-p', p);

            // Annotation (0.05 - 0.2)
            const pAnn = document.getElementById('perf-ann-1');
            if (pAnn) pAnn.classList.toggle('active', p > 0.05 && p < 0.2);

            const vu = document.getElementById('perf-vu-number');
            const dialValue = document.querySelector('.dial-value');
            if (p > 0.2 && p < 0.7) {
                const val = Math.floor(Math.min(Math.max((p - 0.2) * 2, 0), 1) * 48000) + 1200;
                if (vu) vu.textContent = val.toLocaleString();
                if (dialValue) dialValue.textContent = Math.floor(val/1000) + 'K';
            }

            const diag = document.getElementById('perf-diag-1');
            if (diag) diag.classList.toggle('active', p > 0.45 && p < 0.65);

            const cpu = document.getElementById('perf-gauge-cpu');
            const err = document.getElementById('perf-gauge-err');
            if (cpu) cpu.style.width = `${40 + Math.min(Math.max((p-0.5)*4, 0), 1)*55}%`;
            if (err) err.style.width = `${95 - Math.min(Math.max((p-0.6)*4, 0), 1)*80}%`;
        }

        // 5. Final Product Scroll
        const scrollProd = document.getElementById('product-scroll');
        const viewProd = document.getElementById('sticky-view-product');
        if (scrollProd && viewProd) {
            const rect = scrollProd.getBoundingClientRect();
            let p = -rect.top / (rect.height - window.innerHeight);
            p = Math.max(0, Math.min(1, p));
            viewProd.style.setProperty('--product-scroll-p', p);
        }
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { onScroll(); ticking = false; });
            ticking = true;
        }
    }, { passive: true });

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
                    entry.target.classList.add('is-visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.reveal-on-scroll, .bento-card, .timeline-item, .cert-card, .project-card, .about-card, .highlight-item'
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


    // Parallax removed — replaced with CSS transform on hover only.
    // (JS parallax caused layout thrashing; CSS-only solution has zero scroll cost)

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
    const refinedContent = document.querySelector('.post-content-refined');

    if (blogPost && refinedContent) {
        // Calculate reading time
        const text = refinedContent.innerText;
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

    // ==========================================
    // STATS COUNTER ANIMATION
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    function animateStats(el) {
        const targetAttr = el.getAttribute('data-target');
        if (!targetAttr) return;
        
        const target = parseInt(targetAttr);
        const duration = 2000;
        const startTime = performance.now();
        const originalText = el.textContent;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            el.textContent = Math.floor(easeProgress * target) + (originalText.includes('%') ? '%' : '+');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + (originalText.includes('%') ? '%' : '+');
            }
        }
        requestAnimationFrame(update);
    }

    // ==========================================
    // READING PROGRESS BAR (For Blog)
    // ==========================================
    const postContent = document.querySelector('.post-content-body') || document.querySelector('.post-body');
    if (postContent) {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: var(--accent-blue);
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
        }, { passive: true });
    }

    // ==========================================
    // CODE BLOCK COPY BUTTONS
    // ==========================================
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        if (block.closest('.post-content')) {
            block.style.position = 'relative';
            const copyBtn = document.createElement('button');
            copyBtn.innerHTML = '<i class="far fa-copy"></i>';
            copyBtn.style.cssText = `
                position: absolute;
                top: 12px;
                right: 12px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 6px 10px;
                border-radius: 6px;
                cursor: pointer;
                backdrop-filter: blur(4px);
                transition: all 0.2s ease;
                z-index: 10;
            `;
            block.appendChild(copyBtn);

            copyBtn.addEventListener('click', async () => {
                const code = block.innerText;
                try {
                    await navigator.clipboard.writeText(code);
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    copyBtn.style.background = 'var(--status-success)';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="far fa-copy"></i>';
                        copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                }
            });
        }
    });

});


