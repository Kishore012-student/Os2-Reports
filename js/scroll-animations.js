/**
 * Scroll motion layer
 * - Lenis smooth scrolling (when the CDN library is available)
 * - IntersectionObserver + CSS transitions: the reliable reveal layer for
 *   every section, works even when GSAP/CDN scripts are blocked
 * - GSAP ScrollTrigger: additional staggered motion on hero + inner cards
 * - prefers-reduced-motion: all motion disabled, content stays visible
 */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var Lenis = window.Lenis;

  function initLenis() {
    if (!Lenis) return;

    var lenis = new Lenis({
      duration: 1.05,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.35,
    });
    window.__os2Lenis = lenis;

    if (gsap && ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        window.requestAnimationFrame(raf);
      }
      window.requestAnimationFrame(raf);
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.1 });
        if (id !== 'top') {
          try { window.history.replaceState(null, '', '#' + id); } catch (e) { /* file:// */ }
        }
      });
    });
  }

  // Reliable reveal layer: every section's top-level blocks fade + rise in
  // as the section enters the viewport. No dependency on GSAP's ticker.
  function initSectionReveals() {
    var sections = Array.prototype.slice.call(
      document.querySelectorAll('main > section, footer.site-footer')
    );
    if (!sections.length) return;

    document.documentElement.classList.add('js-motion');

    sections.forEach(function (section) {
      var container = section.querySelector('.container') || section;
      var blocks = Array.prototype.slice.call(container.children).filter(function (el) {
        return el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE';
      });
      if (!blocks.length) blocks = [section];

      blocks.forEach(function (block, index) {
        block.classList.add('section-reveal');
        block.style.transitionDelay = Math.min(index, 6) * 0.09 + 's';
      });

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            blocks.forEach(function (block) { block.classList.add('is-revealed'); });
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
        observer.observe(section);
      } else {
        blocks.forEach(function (block) { block.classList.add('is-revealed'); });
      }
    });
  }

  // Enhancement layer: ScrollTrigger decides WHEN a card animates; CSS
  // performs the motion. This keeps content visible even if GSAP's ticker
  // is throttled (background tab, headless capture, low-power device).
  function initGsapMotion() {
    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.why-card, .rw-card, .wg-chapter, .nh-metric').forEach(function (el) {
      el.classList.add('gsap-card');
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: function () { el.classList.add('gsap-inview'); },
      });
    });

    ScrollTrigger.refresh();
  }

  function init() {
    initSectionReveals();

    // Hero entrance: class toggle + CSS transition (no ticker dependency).
    document.querySelectorAll('.hc-title, .hc-cta, #workspace, .hv-value-strip').forEach(function (el, index) {
      window.setTimeout(function () { el.classList.add('is-entered'); }, 40 + index * 110);
    });

    initLenis();
    initGsapMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
