/* ============================================
   CompuYá — App Logic
   ============================================ */

(function () {
  'use strict';

  // ─── Header scroll effect ───
  function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    function onScroll() {
      const currentScroll = window.scrollY;
      header.classList.toggle('scrolled', currentScroll > scrollThreshold);
      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Mobile navigation ───
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open');
      toggle.classList.toggle('active');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Smooth scroll for anchor links ───
  function initSmoothScroll() {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        try {
          const url = new URL(anchor.href, window.location.href);
          // Only smooth scroll if it's the same page
          if (url.pathname === window.location.pathname && url.hash) {
            const targetId = url.hash.substring(1);
            const target = document.getElementById(targetId);
            if (!target) return;
            
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - headerOffset,
              behavior: 'smooth'
            });
          }
        } catch(err) {}
      });
    });
  }

  // ─── Intersection Observer for reveal animations ───
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!reveals.length) return;

    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ─── Counter animation ───
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = el.dataset.count;
    const isNumber = /^\d+$/.test(target.replace(/[,.+]/g, ''));
    if (!isNumber) {
      el.textContent = target;
      return;
    }

    const num = parseInt(target.replace(/[,.+]/g, ''), 10);
    const suffix = target.replace(/[\d,.]/g, '');
    const duration = 2000;
    const step = num / (duration / 16);
    let current = 0;

    function update() {
      current += step;
      if (current >= num) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(current).toLocaleString('es-EC') + suffix;
      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ─── Brands carousel (infinite scroll) ───
  function initBrandsCarousel() {
    const track = document.querySelector('.brands-track');
    if (!track) return;

    // Duplicate items for seamless loop
    const items = track.innerHTML;
    track.innerHTML = items + items;
  }

  // ─── Scroll to top ───
  function initScrollTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Active nav link highlighting ───
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const navLinks = document.querySelectorAll('.nav__link[href*="#"]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            try {
              const url = new URL(link.href, window.location.href);
              if (url.pathname === window.location.pathname) {
                link.classList.toggle('active', url.hash === `#${id}`);
              }
            } catch(err) {}
          });
        }
      });
    }, {
      rootMargin: '-40% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // ─── Form handling ───
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Anti-spam Honeypot Check
      const honeypot = form.querySelector('input[name="_honeypot"]');
      if (honeypot && honeypot.value) {
        console.warn("Spam detected. Aborting form submission.");
        form.reset();
        return;
      }

      // Fetch values by ID since they might lack 'name' attributes
      const name = document.getElementById('name') ? document.getElementById('name').value : '';
      const email = document.getElementById('email') ? document.getElementById('email').value : '';
      const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
      const subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
      const message = document.getElementById('message') ? document.getElementById('message').value : '';

      // Build WhatsApp message securely
      const msg = `Hola CompuYá, soy ${name}.\n\n` +
        `📧 Correo: ${email}\n` +
        `📱 Teléfono: ${phone}\n` +
        `🏷️ Tema: ${subject}\n\n` +
        `💬 Mensaje: ${message}`;

      const whatsappUrl = `https://wa.me/593992292199?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');

      // Show success state
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Mensaje enviado';
        btn.style.background = 'var(--success)';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          form.reset();
        }, 3000);
      } else {
        form.reset();
      }
    });
  }

  // ─── Year in footer ───
  function initYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ─── Init all ───
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initSmoothScroll();
    initRevealAnimations();
    initCounters();
    initBrandsCarousel();
    initScrollTop();
    initActiveNav();
    initContactForm();
    initYear();
  });
})();
