
/* ═══════════════════════════════════════════
   INDIECO — NAV + FOOTER SYSTEM (APPLE CLEAN)
   Production-safe DOM Renderer
═══════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'About',       href: '/pages/about.html' },
  { label: 'Get Started', href: '/pages/get-started.html' },
  { label: 'Standard',    href: '/pages/standard-services.html' },
  { label: 'Premier',     href: '/pages/premier-services.html' },
  { label: 'Store',       href: '/pages/store.html' },
  { label: 'Apply',       href: '/pages/work-with-us.html' },
];

const CTA_LINK = { label: 'Apply', href: '/pages/work-with-us.html' };

/* ───────────────── NAV BUILDER ───────────────── */

(function buildNav() {
  if (document.getElementById('site-nav')) return;

  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.setAttribute('aria-label', 'Primary navigation');

  nav.innerHTML = `
    <div class="nav-inner">

      <a href="/" class="nav-logo" aria-label="IndieCo home">
        <img src="/images/logo.png" alt="IndieCo" class="nav-logo-img" />
      </a>

      <ul class="nav-links">
        ${NAV_LINKS.map(l =>
          `<li><a href="${l.href}">${l.label}</a></li>`
        ).join('')}
      </ul>

      <a href="${CTA_LINK.href}" class="nav-cta">
        ${CTA_LINK.label}
      </a>

      <button class="nav-hamburger"
              aria-label="Toggle menu"
              aria-expanded="false"
              id="nav-toggle">
        <span></span><span></span><span></span>
      </button>

    </div>

    <div class="nav-mobile" id="nav-mobile" aria-hidden="true">
      ${NAV_LINKS.map(l =>
        `<a href="${l.href}">${l.label}</a>`
      ).join('')}

      <a href="${CTA_LINK.href}" class="btn-primary">
        <span>${CTA_LINK.label}</span>
      </a>
    </div>
  `;

  document.body.prepend(nav);

  /* ── Scroll (Apple smooth + rAF throttle) ── */
  let lastY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', lastY > 24);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── Mobile Toggle (safe state handling) ── */

  const toggle = nav.querySelector('#nav-toggle');
  const mobile = nav.querySelector('#nav-mobile');

  let isOpen = false;

  const setState = (state) => {
    isOpen = state;

    mobile.classList.toggle('open', state);
    toggle.classList.toggle('open', state);

    toggle.setAttribute('aria-expanded', state);
    mobile.setAttribute('aria-hidden', !state);

    document.body.style.overflow = state ? 'hidden' : '';
  };

  toggle?.addEventListener('click', () => setState(!isOpen));

  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setState(false));
  });
})();


/* ───────────────── FOOTER BUILDER ───────────────── */

(function buildFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  const BOOKS = [
    'Silakbo',
    'In the Shadows Where They Lie',
    'Lucky In Love',
    'Forgive & Forget',
    'Silent Nights',
    'To Love and Be Loved',
    'Untold Truths',
    'The Meaning of Me',
    'Whats Next',
    'What Do You Live For',
    'Reflections',
    'From Stage to Screen',
  ];

  const footer = document.createElement('footer');
  footer.id = 'site-footer';

  footer.innerHTML = `
    <div class="footer-inner">

      <div class="footer-top">

        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-mark"></div>
            <span>IndieCo</span>
          </div>

          <p>
            Authority Architecture<br>
            Media Positioning · Executive Publishing
          </p>
        </div>

        <div class="footer-col">
          <span class="footer-col-label">Platform</span>
          <ul class="footer-links">
            <li><a href="/pages/get-started.html">App Waitlist</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <span class="footer-col-label">Products</span>
          <ul class="footer-links">
            ${BOOKS.map(b => `
              <li><a href="#">${b}</a></li>
            `).join('')}
          </ul>
        </div>

        <div class="footer-col">
          <span class="footer-col-label">Company</span>
          <ul class="footer-links">
            <li><a href="#">Careers</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Events</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <span class="footer-col-label">Resources</span>
          <ul class="footer-links">
            <li><a href="#">Support</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <span>© 2026 IndieCo</span>
        <span>Manila · New York</span>
      </div>

    </div>
  `;

  placeholder.replaceWith(footer);
})();


/* ───────────────── SCROLL OBSERVER ───────────────── */

(function initScrollObserver() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
})();
