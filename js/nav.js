/* ═══════════════════════════════════════════════
   INDIECO — SHARED NAVIGATION & FOOTER JS
   ═══════════════════════════════════════════════ */

(function () {
  // ── CONFIG ──────────────────────────────────────
  const NAV_LINKS = [
    { label: 'Home',             href: '/index.html' },
    { label: 'About',            href: '/pages/about.html' },
    { label: 'Premier',         href: '/pages/premier-services.html' },
    { label: 'Standard',         href: '/pages/standard-services.html' },
    { label: 'Store',            href: '/pages/store.html' },
    { label: 'Work With Us',     href: '/pages/work-with-us.html', cta: true },
  ];

  const FOOTER_LINKS = [
    { label: 'Web',       href: 'https://www.indieco.com.co',          text: 'www.indieco.com.co' },
    { label: 'Email',     href: 'mailto:contact@indieco.com.co',       text: 'contact@indieco.com.co' },
    { label: 'Instagram', href: 'https://instagram.com/the.indie.co',  text: '@the.indie.co' },
  ];

  const FOOTER_COPY = '© 2026 IndieCo Information Technology Solutions, Inc. All rights reserved. IndieCo Information Technology Solutions, Inc. is not affiliated with TED/TEDx, Forbes and/or any media companies we advertise placing clients on. IndieCo Information Technology Solutions, Inc. provides software and services as a third-party platform fostering media profile placement and publication.';

  // ── HELPERS ─────────────────────────────────────
  function currentPage() {
    const path = window.location.pathname.replace(/\/$/, '');
    return path || '/index.html';
  }

  function resolvePath(href) {
    // If we're in /pages/, adjust root-relative links
    const inSubdir = window.location.pathname.includes('/pages/');
    if (!inSubdir) return href;
    if (href === '/index.html') return '../index.html';
    return href.replace('/pages/', '');
  }

  // ── BUILD NAV ───────────────────────────────────
  function buildNav() {
    const placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    const isDark = placeholder.dataset.dark === 'true';
    const path = currentPage();

    const linksHTML = NAV_LINKS.map(l => {
      const href = resolvePath(l.href);
      const isActive = path.endsWith(l.href.replace('/pages/', '').replace('/', '')) ||
                       (l.href === '/index.html' && (path === '' || path === '/' || path.endsWith('index.html')));
      const cls = [isActive ? 'active' : '', l.cta ? 'nav-cta' : ''].filter(Boolean).join(' ');
      return `<li><a href="${href}" class="${cls}">${l.label}</a></li>`;
    }).join('');

    const mobileLinksHTML = NAV_LINKS.map(l => {
      const href = resolvePath(l.href);
      return `<a href="${href}">${l.label}</a>`;
    }).join('');

    placeholder.outerHTML = `
      <nav class="nav${isDark ? ' dark' : ''}" id="main-nav">
        <a href="${resolvePath('/index.html')}" class="nav-logo">IndieCo</a>
        <ul class="nav-links">${linksHTML}</ul>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div class="nav-mobile" id="nav-mobile">
        ${mobileLinksHTML}
      </div>
    `;

    // Hamburger toggle
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('nav-mobile');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      });
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Scroll class
    const nav = document.getElementById('main-nav');
    if (nav) {
      function onScroll() {
        if (window.scrollY > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  // ── BUILD FOOTER ─────────────────────────────────
  function buildFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    const isDark = placeholder.dataset.dark === 'true';

    const linksHTML = FOOTER_LINKS.map(l => `
      <a class="footer-link" href="${l.href}" target="${l.href.startsWith('http') ? '_blank' : '_self'}">
        <span class="footer-link-label">${l.label}</span>
        <span class="footer-link-dot"></span>
        ${l.text}
      </a>
    `).join('');

    placeholder.outerHTML = `
      <div class="footer-wrap${isDark ? ' dark' : ''}">
        <footer class="footer">
          <div class="footer-top">
            <div>
              <p class="footer-logo">IndieCo</p>
              <p class="footer-tagline">Authority &bull; Influence &bull; Revenue</p>
            </div>
            <div class="footer-links">${linksHTML}</div>
          </div>
          <div class="footer-bottom">
            <span class="footer-copy">${FOOTER_COPY}</span>
            <span class="footer-locations">Manila &mdash; New York</span>
          </div>
        </footer>
      </div>
    `;
  }

  // ── INTERSECTION OBSERVER FOR FADE-UP ─────────────
  function initFadeUp() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  // ── INIT ────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildFooter();
    initFadeUp();
  });
})();
