/* CLIFT project page — chapter seek, count-up tiles, lazy video play, BibTeX copy. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- film chapters ---------- */
  var player = document.getElementById('film-player');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-t]'));

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (!player) return;
      player.currentTime = parseFloat(chip.dataset.t);
      var playP = player.play();
      if (playP && playP.catch) playP.catch(function () {});
      player.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  });

  if (player && chips.length) {
    player.addEventListener('timeupdate', function () {
      var t = player.currentTime;
      var active = null;
      chips.forEach(function (chip) {
        if (t >= parseFloat(chip.dataset.t) - 0.25) active = chip;
      });
      chips.forEach(function (chip) {
        chip.classList.toggle('active', chip === active);
      });
    });
  }

  /* ---------- count-up result tiles ---------- */
  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    var from = parseInt(el.dataset.from || '0', 10);
    if (reduceMotion || !window.requestAnimationFrame) {
      el.textContent = target + '%';
      return;
    }
    var start = null;
    var dur = 1300;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (target - from) * eased) + '%';
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var counted = new WeakSet();
  var nums = Array.prototype.slice.call(document.querySelectorAll('.num-final[data-count]'));
  if ('IntersectionObserver' in window && nums.length) {
    var numObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted.has(entry.target)) {
          counted.add(entry.target);
          countUp(entry.target);
          numObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { numObserver.observe(el); });
  }

  /* ---------- task videos: play only while visible ---------- */
  var taskVideos = Array.prototype.slice.call(document.querySelectorAll('.task-video video, .clip-frame video'));
  if ('IntersectionObserver' in window && taskVideos.length) {
    var vidObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () { /* autoplay blocked — poster frame stays */ });
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    taskVideos.forEach(function (v) { vidObserver.observe(v); });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- BibTeX copy ---------- */
  var copyBtn = document.getElementById('copy-bibtex');
  var bibtex = document.getElementById('bibtex-text');
  if (copyBtn && bibtex) {
    copyBtn.addEventListener('click', function () {
      var text = bibtex.textContent;
      function done() {
        copyBtn.textContent = 'Copied';
        copyBtn.classList.add('copied');
        setTimeout(function () {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 1600);
      }
      function fallbackCopy() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* nothing left to try */ }
        document.body.removeChild(ta);
        done();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  }
})();
