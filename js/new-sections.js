/**
 * OS2 Reports — new sections controller
 * Vanilla JS for the forensic hero pipeline schematic and the 6-chapter
 * sticky end-to-end workflow guide.
 */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // Shared state + lightweight toast notifications
  // --------------------------------------------------------------------------
  var state = {
    verdict: 'Genuine',
    exportFormat: 'pdf',
  };

  function toast(title, message, reference, variant) {
    var stack = document.querySelector('.ac-toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'ac-toast-stack';
      stack.setAttribute('role', 'status');
      stack.setAttribute('aria-live', 'polite');
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'ac-toast' + (variant === 'success' ? ' is-success' : '');
    el.innerHTML =
      '<div class="ac-toast-head"><span class="ac-toast-mark">' +
      (variant === 'success'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>') +
      '</span><strong></strong><button type="button" class="ac-toast-close" aria-label="Dismiss">×</button></div>' +
      '<p class="ac-toast-msg"></p>' +
      (reference ? '<div class="ac-toast-ref mono"></div>' : '');
    el.querySelector('strong').textContent = title;
    el.querySelector('.ac-toast-msg').textContent = message;
    if (reference) el.querySelector('.ac-toast-ref').textContent = reference;
    el.querySelector('.ac-toast-close').addEventListener('click', function () {
      el.classList.add('is-leaving');
      setTimeout(function () { el.remove(); }, 220);
    });
    stack.appendChild(el);
    setTimeout(function () {
      if (!el.classList.contains('is-leaving')) {
        el.classList.add('is-leaving');
        setTimeout(function () { el.remove(); }, 220);
      }
    }, 5200);
  }

  function scrollTo(target, offset) {
    if (!target) return;
    const lenis = window.__os2Lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: offset || -80, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function scrollToWorkflow() {
    scrollTo(document.getElementById('workflow-guide') || document.getElementById('technology'));
  }

  // --------------------------------------------------------------------------
  // Hero — animated pipeline schematic
  // --------------------------------------------------------------------------
  var PIPELINE = {
    upload: {
      step: '01 · Document Ingestion & Verification',
      summary: 'File validation & integrity commitment on arrival.',
      metric: 'Direct File Intake',
    },
    ocr: {
      step: '02 · Smart OCR & Data Extraction',
      summary: 'Automated deskewing, multi-lingual OCR & structured data extraction.',
      metric: '99.6% Field Accuracy',
    },
    audit: {
      step: '03 · Cross-Document Discrepancy Check',
      summary: 'Validates document dates, stamp timelines & invoice calculation math.',
      metric: '3 Automated Checks',
    },
    report: {
      step: '04 · Compiled Single PDF Report',
      summary: 'Custom letterhead deliverable with verified source data.',
      metric: '< 5 Min Turnaround',
    },
  };
  var PIPELINE_ORDER = ['upload', 'ocr', 'audit', 'report'];

  function initPipeline() {
    var diagram = document.getElementById('pipelineDiagram');
    if (!diagram) return;
    var tabs = diagram.querySelectorAll('.pipe-tab');
    var stepEl = document.getElementById('pipeStep');
    var summaryEl = document.getElementById('pipeSummary');
    var metricEl = document.getElementById('pipeMetric');
    var paused = false;
    var timer = null;

    function setStage(id, resetTimer) {
      if (!PIPELINE[id]) return;
      diagram.setAttribute('data-stage', id);
      tabs.forEach(function (tab) {
        var active = tab.getAttribute('data-stage') === id;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      if (stepEl) stepEl.textContent = PIPELINE[id].step;
      if (summaryEl) summaryEl.textContent = PIPELINE[id].summary;
      if (metricEl) metricEl.textContent = PIPELINE[id].metric;
      if (resetTimer && timer) {
        clearInterval(timer);
        timer = window.setInterval(advance, 3600);
      }
    }

    function advance() {
      if (paused) return;
      var current = diagram.getAttribute('data-stage') || 'ocr';
      var next = PIPELINE_ORDER[(PIPELINE_ORDER.indexOf(current) + 1) % PIPELINE_ORDER.length];
      setStage(next, false);
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setStage(tab.getAttribute('data-stage'), true);
      });
    });
    diagram.querySelectorAll('.pipe-clickable').forEach(function (group) {
      group.addEventListener('click', function () {
        setStage(group.getAttribute('data-stage'), true);
      });
    });
    diagram.addEventListener('mouseenter', function () { paused = true; });
    diagram.addEventListener('mouseleave', function () { paused = false; });

    setStage(diagram.getAttribute('data-stage') || 'ocr', false);
    if (!reduceMotion) timer = window.setInterval(advance, 3600);
  }

  function initHeroLinks() {
    var heroScroll = document.getElementById('heroScrollWorkflow');
    if (heroScroll) heroScroll.addEventListener('click', scrollToWorkflow);
  }

  // --------------------------------------------------------------------------
  // Surveyor verdict (shared across the workflow chapter)
  // --------------------------------------------------------------------------
  function setVerdict(value) {
    state.verdict = value;
    document.querySelectorAll('[data-verdict]').forEach(function (btn) {
      var active = btn.getAttribute('data-verdict') === value;
      btn.classList.toggle('is-active', active);
      if (btn.hasAttribute('aria-pressed')) btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    ['wgSelectedVerdict', 'wgReportVerdict'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = value;
    });
  }

  // --------------------------------------------------------------------------
  // Workflow guide — sticky scroll-spy and interactive modules
  // --------------------------------------------------------------------------
  function setActiveChapter(id) {
    document.querySelectorAll('.wg-rail-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-chapter') === id);
    });
  }

  function initWorkflow() {
    var chapters = Array.prototype.slice.call(document.querySelectorAll('.wg-chapter'));
    if (!chapters.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        var visible = entries.filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
        if (visible.length) setActiveChapter(visible[0].target.id);
      }, { rootMargin: '-20% 0px -58% 0px', threshold: 0.05 });
      chapters.forEach(function (chapter) { observer.observe(chapter); });
    }

    document.querySelectorAll('.wg-rail-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-chapter');
        setActiveChapter(id);
        scrollTo(document.getElementById(id));
      });
    });

    // Surveyor verdict cards
    document.querySelectorAll('[data-verdict]').forEach(function (btn) {
      btn.addEventListener('click', function () { setVerdict(btn.getAttribute('data-verdict')); });
    });
    setVerdict(state.verdict);

    // Evidence category filters
    document.querySelectorAll('.wg-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.wg-filter').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        document.querySelectorAll('.wg-vault-row').forEach(function (row) {
          row.style.display = (filter === 'All' || row.getAttribute('data-category') === filter) ? '' : 'none';
        });
      });
    });

    // Export format switch
    document.querySelectorAll('.wg-export-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var format = btn.getAttribute('data-format');
        state.exportFormat = format;
        document.querySelectorAll('.wg-export-tab').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        var label = document.getElementById('wgExportLabel');
        if (label) label.textContent = format.toUpperCase();
      });
    });
  }

  // --------------------------------------------------------------------------
  // Bootstrap
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    initPipeline();
    initHeroLinks();
    initWorkflow();
  });
})();
