/* ═══════════════════════════════════════════
   INDIECO — SHARED NAV + FOOTER RENDERER
   Brand Guide 2025
═══════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'About',     href: '/pages/about.html' },
  { label: 'Services',  href: '/pages/premier-services.html' },
  { label: 'Store',     href: '/pages/store.html' },
];

const CTA_LINK = { label: 'Work With Us', href: '/pages/work-with-us.html' };

/* ── Build Nav ───────────────────────────────── */
(function buildNav() {
  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.setAttribute('aria-label', 'Primary navigation');

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="nav-logo" aria-label="IndieCo Home">
        <div class="nav-logo-mark"><span>IC</span></div>
        IndieCo
      </a>
      <ul class="nav-links">
        ${NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
      </ul>
      <a href="${CTA_LINK.href}" class="nav-cta">${CTA_LINK.label}</a>
      <button class="nav-hamburger" aria-label="Toggle menu" id="nav-toggle">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" id="nav-mobile">
      ${NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
      <a href="${CTA_LINK.href}" class="btn-primary"><span>${CTA_LINK.label}</span></a>
    </div>
  `;

  document.body.prepend(nav);

  /* Scroll state */
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  /* Hamburger toggle */
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  toggle.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    toggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* Close on link click */
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobile.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Build Footer ────────────────────────────── */
(function buildFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  const footer = document.createElement('footer');
  footer.id = 'site-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-mark">IC</div>
            IndieCo
          </div>
          <p>Authority Architecture · Media Positioning · Executive Publishing</p>
        </div>
        <div class="footer-col">
          <span class="footer-col-label">Pages</span>
          <ul class="footer-links">
            ${NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
            <li><a href="/pages/work-with-us.html">Work With Us</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <span class="footer-col-label">Connect</span>
          <ul class="footer-links">
            <li><a href="mailto:contact@indieco.com.co">contact@indieco.com.co</a></li>
            <li><a href="https://linkedin.com/company/indieco" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="/pages/get-started.html">Get Started</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2026 IndieCo. All rights reserved.</span>
        <span class="footer-locations">Manila · New York</span>
      </div>
    </div>
  `;

  placeholder.replaceWith(footer);
})();

/* ── Scroll Fade-up Observer ─────────────────── */
(function initScrollObserver() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
})();
