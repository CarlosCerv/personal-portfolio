document.addEventListener('DOMContentLoaded', () => {
  const progressFill = document.getElementById('progressFill');
  const navToggle = document.getElementById('navToggle');
  const body = document.body;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    body.classList.add('page-ready');
  } else {
    requestAnimationFrame(() => body.classList.add('page-ready'));
  }

  const updateProgress = () => {
    if (!progressFill) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progressFill.style.width = `${Math.min(progress, 100)}%`;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.nav-links a, .nav-actions a').forEach((link) => {
    link.addEventListener('click', () => body.classList.remove('nav-open'));
  });

  if (prefersReducedMotion.matches) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    document.querySelectorAll('.reveal-stage').forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const stageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          stageObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.reveal-stage').forEach((el) => stageObserver.observe(el));
  }

  const searchInput = document.getElementById('blogSearch');
  const tagButtons = document.querySelectorAll('[data-blog-filter]');
  const postCards = document.querySelectorAll('[data-post-card]');
  const resultsLabel = document.querySelector('[data-blog-results]');
  const emptyState = document.querySelector('[data-blog-empty]');
  const clearButton = document.querySelector('[data-blog-clear]');

  const normalizeValue = (value) => (value || '').trim().toLowerCase();

  const applyBlogFilters = () => {
    if (!postCards.length) return;
    const query = normalizeValue(searchInput?.value || '');
    const activeTag = normalizeValue(document.querySelector('[data-blog-filter].active')?.dataset.blogFilter || 'all');
    let visibleCount = 0;

    postCards.forEach((card) => {
      const haystack = normalizeValue(`${card.dataset.title} ${card.dataset.excerpt} ${card.dataset.tags}`);
      const tags = (card.dataset.tags || '').split(',').map((tag) => normalizeValue(tag)).filter(Boolean);
      const matchesQuery = !query || haystack.includes(query);
      const matchesTag = activeTag === 'all' || tags.includes(activeTag);
      const isVisible = matchesQuery && matchesTag;
      card.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (resultsLabel) {
      const hasQuery = query.length > 0;
      const hasTag = activeTag !== 'all';
      let suffix = 'artículos';

      if (hasTag && hasQuery) {
        suffix = `artículos para "${searchInput.value.trim()}" en ${document.querySelector('[data-blog-filter].active')?.textContent?.trim() || 'la categoría seleccionada'}`;
      } else if (hasTag) {
        suffix = `artículos en ${document.querySelector('[data-blog-filter].active')?.textContent?.trim() || 'la categoría seleccionada'}`;
      } else if (hasQuery) {
        suffix = `artículos para "${searchInput.value.trim()}"`;
      }

      resultsLabel.innerHTML = `Mostrando <strong>${visibleCount}</strong> ${suffix}`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }

    if (clearButton) {
      clearButton.hidden = !(query || activeTag !== 'all');
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', applyBlogFilters);
  }

  tagButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tagButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      applyBlogFilters();
    });
  });

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
      }
      tagButtons.forEach((item) => item.classList.remove('active'));
      const allButton = document.querySelector('[data-blog-filter="all"]');
      allButton?.classList.add('active');
      applyBlogFilters();
      searchInput?.focus();
    });
  }

  applyBlogFilters();
});
