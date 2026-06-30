/* Diploma360 — site.js
   Gestisce: consenso cookie (GDPR / Consent Mode v2), caricamento GA4 post-consenso,
   scroll-reveal accessibile. Nessuna dipendenza esterna. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Scroll reveal (sicuro: se JS non parte, tutto resta visibile) -------- */
  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var style = document.createElement('style');
    style.textContent =
      '.reveal{opacity:0;transform:translateY(14px);transition:opacity .6s ease,transform .6s ease}' +
      '.reveal.in{opacity:1;transform:none}';
    document.head.appendChild(style);

    var sel = '.sec-head,.sit,.sit2,.card,.pillar,.pillar-bro2,.stepcard,.testi,.plan,.dipl,.story,.consult .ck,.notmill .pt,.perchi-tz .pc,.tutorc,.feat-grid .fc,.r360,.molli-band,.numbers';
    var els = Array.prototype.slice.call(document.querySelectorAll(sel));
    if (!els.length) return;
    els.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Google Analytics 4 (caricato solo dopo consenso) -------------------- */
  function loadGA() {
    var id = window.__GA_ID__;
    if (!id || id.indexOf('XXXX') !== -1 || window.__gaLoaded) return; // placeholder => non caricare
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
    function gtag() { window.dataLayer.push(arguments); }
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }

  /* ---------------- Cookie consent ------------------------------------------------------ */
  var KEY = 'd360_consent';
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function initCookies() {
    var banner = document.getElementById('cookie-banner');
    var saved = getConsent();
    if (saved === 'all') { loadGA(); return; }
    if (saved === 'necessary') { return; }
    if (!banner) return;
    banner.hidden = false;
    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cookie]');
      if (!btn) return;
      var choice = btn.getAttribute('data-cookie');
      if (choice === 'accept') { setConsent('all'); loadGA(); }
      else { setConsent('necessary'); }
      banner.hidden = true;
    });
  }

  /* ---------------- Lead form -> endpoint (il dev lo collega a Brevo) ------------------ */
  function initLeadForm() {
    var forms = document.querySelectorAll('[data-lead-form]');
    if (!forms.length) return;
    var endpoint = window.__LEAD_ENDPOINT__ || '/api/lead';
    forms.forEach(function (form) {
      var status = form.querySelector('.lf-status');
      var btn = form.querySelector('button[type="submit"]');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        // honeypot: se compilato, finge successo e non invia (bot)
        var hp = form.querySelector('.hp-field');
        if (hp && hp.value) { show('ok', 'Grazie! Ti ricontattiamo a breve.'); form.reset(); return; }
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var data = {
          nome: val('nome'), telefono: val('telefono'), email: val('email'),
          per_chi: radio('per_chi'),
          messaggio: val('messaggio'), pagina: location.pathname, ts: new Date().toISOString()
        };
        if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Invio in corso\u2026'; }
        fetch(endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) throw new Error('bad status');
          show('ok', 'Richiesta inviata! Ti ricontattiamo entro 24h.');
          form.reset();
        }).catch(function () {
          show('err', 'Invio non riuscito. Scrivici su WhatsApp 351 7214644 o chiama lo 06 8428 0999.');
        }).finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Invia'; }
        });
      });
      function val(n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; }
      function radio(n) { var el = form.querySelector('[name="' + n + '"]:checked'); return el ? el.value : ''; }
      function show(kind, msg) {
        if (!status) return;
        status.hidden = false; status.className = 'lf-status ' + kind; status.textContent = msg;
      }
    });
  }

  /* ---------------- Mega-menu accessibile (click + tastiera, hover come enhancement) --- */
  function initMega() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.mainnav .navitem'));
    if (!items.length) return;

    function closeAll(except) {
      items.forEach(function (it) {
        if (it === except) return;
        it.classList.remove('open');
        var t = it.querySelector('.navlink');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }

    items.forEach(function (it, i) {
      var trigger = it.querySelector('.navlink');
      var mega = it.querySelector('.mega');
      if (!trigger || !mega) return; // voci semplici (Home, Diplomi, Prezzi) restano <a href> normali

      // l'<a> senza href diventa un controllo annunciato come pulsante
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      if (!mega.id) mega.id = 'mega-' + (i + 1);
      trigger.setAttribute('aria-controls', mega.id);

      function setOpen(v) {
        if (v) closeAll(it);
        it.classList.toggle('open', v);
        trigger.setAttribute('aria-expanded', v ? 'true' : 'false');
      }
      function isOpen() { return it.classList.contains('open'); }

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        setOpen(!isOpen());
      });
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault(); setOpen(!isOpen());
        } else if (e.key === 'ArrowDown' || e.key === 'Down') {
          e.preventDefault(); setOpen(true);
          var first = mega.querySelector('a'); if (first) first.focus();
        } else if (e.key === 'Escape' || e.key === 'Esc') {
          setOpen(false);
        }
      });
      mega.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') { setOpen(false); trigger.focus(); }
      });
    });

    // click fuori / Esc globale: chiudi tutto
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.mainnav .navitem')) closeAll();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') closeAll();
    });
  }

  /* ---------------- Header: ombra morbida dopo lo scroll -------------------------------- */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () { initHeader(); initMega(); initReveal(); initCookies(); initLeadForm(); });
})();
