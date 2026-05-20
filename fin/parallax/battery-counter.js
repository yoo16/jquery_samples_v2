/**
 * battery-counter.js
 * #battery セクションでスクロール進行に応じて、数字を 0 → 24 までカウントアップする。
 * 単語「充電器」もフェードイン演出。
 */
(function () {
  'use strict';

  const section = document.getElementById('battery');
  if (!section) return;

  const numEl = section.querySelector('[data-battery="num"]');
  const wordEl = section.querySelector('[data-battery="word"]');
  if (!numEl) return;

  const TARGET = 24;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    numEl.textContent = TARGET;
    return;
  }

  const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  let ticking = false;

  function update() {
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / total);

    // 0.1〜0.7 でカウントアップ
    const countProg = easeOut(clamp((progress - 0.1) / 0.6));
    const value = Math.round(TARGET * countProg);
    numEl.textContent = value;

    // 単語にも少し動きを
    if (wordEl) {
      const wordProg = clamp((progress - 0.05) / 0.2);
      wordEl.style.opacity = 0.4 + wordProg * 0.6;
    }

    // 余韻：終盤に少しスケールダウン
    const scale = 1 - clamp((progress - 0.8) / 0.2) * 0.1;
    numEl.style.transform = `scale(${scale})`;
    numEl.style.transformOrigin = 'center';
    numEl.style.display = 'inline-block';

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
