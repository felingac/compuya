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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth'
        });
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

    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
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

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Build WhatsApp message
      const msg = `Hola CompuYá, soy ${data.name}.\n` +
        `📧 Correo: ${data.email}\n` +
        `📱 Teléfono: ${data.phone}\n` +
        `💻 Necesito: ${data.message}\n` +
        `💰 Presupuesto: ${data.budget}\n` +
        `📦 Cantidad: ${data.quantity}`;

      const whatsappUrl = `https://wa.me/593992292199?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');

      // Show success state
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '✓ Mensaje enviado';
      btn.style.background = 'var(--success)';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
      }, 3000);
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
