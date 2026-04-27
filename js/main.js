(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupHeader();
    setupMobileMenu();
    setupBackToTop();
    setupCookieBanner();
    setupCounters();
    setupSmoothScroll();
    setupWhatsapp();
  }

  function setupWhatsapp() {
    fetch('api.php?action=whatsapp')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && data.whatsapp && data.whatsapp.length >= 10) {
          var numero = data.whatsapp;
          var links = document.querySelectorAll('[data-wa="true"]');
          for (var i = 0; i < links.length; i++) {
            var el = links[i];
            var waText = el.getAttribute('data-wa-text');
            if (waText) {
              el.href = 'https://wa.me/55' + numero + '?text=' + waText;
            } else {
              el.href = 'https://wa.me/55' + numero;
            }
          }
          // Atualizar o botão flutuante do WhatsApp também
          var floatBtn = document.querySelector('.whatsapp-float');
          if (floatBtn) {
            floatBtn.href = 'https://wa.me/55' + numero;
          }
        }
      })
      .catch(function() {});
  }

  function setupHeader() {
    var header = document.getElementById('header');
    if (!header) return;
    function check() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  function setupMobileMenu() {
    var btn = document.getElementById('hamburger');
    var nav = document.getElementById('nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      if (nav.classList.contains('mobile-open')) {
        close();
      } else {
        nav.classList.add('mobile-open');
        btn.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', close);
    }

    function close() {
      nav.classList.remove('mobile-open');
      btn.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function setupSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  function setupBackToTop() {
    var btn = document.getElementById('backTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function setupCookieBanner() {
    var banner = document.getElementById('cookieBanner');
    var acceptBtn = document.getElementById('cookieAccept');
    var rejectBtn = document.getElementById('cookieReject');
    if (!banner) return;

    var answered = false;
    try { answered = localStorage.getItem('cookie_consent') !== null; } catch (e) {}

    if (!answered) {
      setTimeout(function () { banner.classList.add('show'); }, 1200);
    }

    function hide(val) {
      banner.classList.remove('show');
      try { localStorage.setItem('cookie_consent', val); } catch (e) {}
    }

    if (acceptBtn) acceptBtn.addEventListener('click', function () { hide('yes'); });
    if (rejectBtn) rejectBtn.addEventListener('click', function () { hide('no'); });
  }

  function setupCounters() {
    var nums = document.querySelectorAll('.stat-number');
    if (nums.length === 0) return;
    var done = false;

    function check() {
      if (done) return;
      var bar = document.querySelector('.stats-bar');
      if (!bar) return;
      var rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        done = true;
        for (var i = 0; i < nums.length; i++) {
          animate(nums[i]);
        }
      }
    }

    function animate(el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      var dur = 1800;
      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var p = Math.min((ts - startTime) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        var val = Math.floor(ease * target);
        el.textContent = target >= 1000 ? val.toLocaleString('pt-BR') : val;
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target >= 1000 ? target.toLocaleString('pt-BR') : target;
        }
      }
      requestAnimationFrame(step);
    }

    window.addEventListener('scroll', check, { passive: true });
    check();
  }

})();
