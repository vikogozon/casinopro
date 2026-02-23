// CasinoPro — Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky header ── */
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── Mobile nav ── */
  const hamburger = document.getElementById('hamburger');
  const navList   = document.getElementById('nav-list');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navList.classList.toggle('mobile-open');
  });
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navList.classList.remove('mobile-open');
    });
  });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('nav ul li a[href^="#"]');
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));

  /* ── Counter animation ── */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.animated) return;
      e.target.dataset.animated = true;
      const target  = parseFloat(e.target.dataset.count);
      const isFloat = String(target).includes('.');
      const suffix  = e.target.dataset.suffix || '';
      const prefix  = e.target.dataset.prefix || '';
      const duration = 1800;
      const step = 16;
      const steps = duration / step;
      let current = 0;
      const inc = target / steps;
      const timer = setInterval(() => {
        current = Math.min(current + inc, target);
        e.target.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
        if (current >= target) clearInterval(timer);
      }, step);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  /* ── Jackpot live counter (always ticking up) ── */
  const jackpotEls = document.querySelectorAll('.jackpot-amount');
  const jackpotValues = Array.from(jackpotEls).map(el => ({
    el,
    val: parseFloat(el.dataset.value),
    speed: parseFloat(el.dataset.speed) || 0.07,
  }));
  const jackpotInterval = setInterval(() => {
    jackpotValues.forEach(item => {
      item.val += item.speed * (0.5 + Math.random());
      item.el.textContent = '€' + item.val.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
  }, 150);
  window.addEventListener('beforeunload', () => clearInterval(jackpotInterval));

  /* ── Game filter tabs ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards  = document.querySelectorAll('.game-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      gameCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
