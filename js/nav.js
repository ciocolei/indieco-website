/* ═══════════════════════════════════════════
   INDIECO — SHARED NAV + FOOTER RENDERER
   Brand Guide 2025
═══════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'About',     href: '/pages/about.html' },
   { label: 'Get Started',  href: '/pages/get-started.html'},
    { label: 'Standard',  href: '/pages/standard-services.html'},
  { label: 'Premier',  href: '/pages/premier-services.html' },
  { label: 'Store',     href: '/pages/store.html' },
   { label : 'Apply', href: '/pages/work-with-us.html'},

const CTA_LINK = { label: 'Apply', href: '/pages/work-with-us.html' };

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

  // Books for the Products column — update hrefs when store page is live
  const BOOKS = [
    { title: 'Silakbo',      href: 'https://www.amazon.com/gp/product/B0G5QWPJ77?ref_=dbs_m_mng_rwt_calw_tkin_0&storeType=ebooks' },
    { title: 'In the Shadows Where They Lie',                   href: 'https://www.amazon.com/gp/product/B0GT7D7HSZ?ref_=dbs_mng_crcw_0&storeType=ebooks' },
    { title: 'Lucky In Love',      href: 'https://www.amazon.com/gp/product/B0GQW2SSHT?ref_=dbs_mng_crcw_1&storeType=ebooks' },
    { title: 'Forgive & Forget',      href: 'https://www.amazon.com/gp/product/B0GRC4BBYK?ref_=dbs_m_mng_rwt_calw_tkin_1&storeType=ebooks' },
    { title: 'Silent Nights',                   href: 'https://www.amazon.com/gp/product/B0GT2D6CCD?ref_=dbs_m_mng_rwt_calw_tkin_2&storeType=ebooks' },
    { title: 'To Love and Be Loved',      href: 'https://www.amazon.com/gp/product/B0GQW2SSHT?ref_=dbs_mng_crcw_1&storeType=ebooks' },
    { title: 'Untold Truths',      href: 'https://www.amazon.com/gp/product/B0GL4FBW3S?ref_=dbs_mng_crcw_3&storeType=ebooks' },
    { title: 'The Meaning of Me',                   href: 'https://www.amazon.com/gp/product/B0GHXB16KP?ref_=dbs_mng_crcw_4&storeType=ebooks' },
    { title: 'Whats Next',      href: 'https://www.amazon.com/gp/product/B0GR82QD9L?ref_=dbs_mng_crcw_2&storeType=ebooks' },
    { title: 'What Do You Live For',      href: 'https://www.amazon.com/gp/product/B0GWV8DVM9?ref_=dbs_m_mng_rwt_calw_tkin_3&storeType=ebooks' },
    { title: 'Reflections',                   href: 'https://www.amazon.com/gp/product/B0GWVFNG73?ref_=dbs_mng_crcw_5&storeType=ebooks' },
    { title: 'From Stage to Screen',      href: 'https://www.amazon.com/Stage-Screen-Collection-Heartfelt-Reflection/dp/B0G5JRRWKB' },
  ];

  const footer = document.createElement('footer');
  footer.id = 'site-footer';
  footer.innerHTML = `
    <div class="footer-bg-word" aria-hidden="true">IndieCo</div>

    <div class="footer-inner">
      <div class="footer-top">

        <!-- Brand -->
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-mark">IC</div>
            <span class="footer-logo-name">IndieCo</span>
          </div>
          <p class="footer-tagline">Authority Architecture<br>Media Positioning · Executive Publishing</p>
          <div class="footer-socials">
            <a href="https://www.facebook.com/the.indie.co/" target="_blank" rel="noopener" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/the.indie.co" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/indieco/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://open.spotify.com/user/IndieCo" target="_blank" rel="noopener" aria-label="Spotify">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 11.5c2.5-1 5.5-1 8 0"/><path d="M7 15c3-1.2 6-1.2 9 0"/><path d="M9.5 8.5c2-.8 4-.8 6 0"/></svg>
            </a>
          </div>
        </div>

        <!-- Platform Access -->
        <div class="footer-col">
          <span class="footer-col-label">Platform Access</span>
          <ul class="footer-links">
            <li><a href="/pages/get-started.html">App Waitlist</a></li>
          </ul>
        </div>

        <!-- Products -->
        <div class="footer-col">
          <span class="footer-col-label">Products</span>
          <ul class="footer-links footer-books">
            ${BOOKS.map(b => `<li><a href="${b.href}">${b.title}</a></li>`).join('')}
          </ul>
        </div>

        <!-- Company -->
        <div class="footer-col">
          <span class="footer-col-label">Company</span>
          <ul class="footer-links">
            <li><a href="https://www.linkedin.com/company/indieco/" target="_blank" rel="noopener">Careers</a></li>
            <li><a href="https://www.facebook.com/the.indie.co/" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="https://www.instagram.com/the.indie.co" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://open.spotify.com/user/IndieCo" target="_blank" rel="noopener">Spotify</a></li>
            <li><a href="https://lu.ma/user/indieco" target="_blank" rel="noopener">Events</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="footer-col">
          <span class="footer-col-label">Resources</span>
          <ul class="footer-links">
            <li><a href="https://www.linkedin.com/company/indieco/" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="https://www.facebook.com/the.indie.co/" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="https://www.instagram.com/the.indie.co" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://open.spotify.com/user/IndieCo" target="_blank" rel="noopener">Spotify</a></li>
            <li><a href="https://lu.ma/user/indieco" target="_blank" rel="noopener">Events</a></li>
          </ul>
        </div>

      </div><!-- /footer-top -->

      <!-- Disclaimer -->
      <div class="footer-disclaimer">
        <p>© 2026 IndieCo Technology Solutions, Inc. All rights reserved.</p>
        <p>IndieCo Technology Solutions, Inc. is an independent entity and is not affiliated with, endorsed by, or officially connected to TED, TEDx, The Wall Street Journal, or any other media organizations or publications in which our clients may be featured.</p>
        <p>IndieCo provides software and professional services that support client visibility, strategic positioning, and media placement opportunities. All trademarks, logos, and publication names are the property of their respective owners.</p>
      </div>

      <div class="footer-bottom">
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
