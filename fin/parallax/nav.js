/**
 * nav.js
 * スクロール量に応じてナビバーの背景透明度を変える。
 * 一定以上下にスクロールすると、より不透明な背景に切り替わる。
 */
(function () {
  'use strict';

  const nav = document.getElementById('nav');
  if (!nav) return;

  let ticking = false;

  function update() {
    const y = window.scrollY;
    if (y > 50) {
      nav.classList.add('shadow-sm');
      nav.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
    } else {
      nav.classList.remove('shadow-sm');
      nav.style.backgroundColor = 'rgba(255, 255, 255, 0.70)';
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
})();
