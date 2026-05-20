/**
 * chip-parallax.js
 * #chip セクションでスクロール進行に合わせ、要素を段階的に出現させる。
 * 巨大な M-Core ロゴはスクロール後半でスケールダウン、その後ろの説明が現れる。
 */
(function () {
  'use strict';

  const section = document.getElementById('chip');
  if (!section) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const eyebrow = section.querySelector('[data-chip="eyebrow"]');
  const logo = section.querySelector('[data-chip="logo"]');
  const title = section.querySelector('[data-chip="title"]');
  const desc = section.querySelector('[data-chip="desc"]');
  const stats = section.querySelector('[data-chip="stats"]');
  const glow = section.querySelector('[data-chip="glow"]');

  const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  // 指定の区間（start〜end）でprogressを0〜1にマッピング
  function range(progress, start, end) {
    return clamp((progress - start) / (end - start));
  }

  let ticking = false;

  function update() {
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / total);

    // eyebrow: 0.0〜0.15で出現
    if (eyebrow) {
      eyebrow.style.opacity = easeOut(range(progress, 0.0, 0.15));
    }

    // logo: 0.0〜0.2でスケールアップしつつ出現、0.5〜0.7でスケールダウン+移動
    if (logo) {
      const inProg = easeOut(range(progress, 0.0, 0.2));
      const outProg = easeOut(range(progress, 0.5, 0.75));
      const scale = 0.6 + inProg * 0.4 - outProg * 0.3; // 0.6→1.0→0.7
      const y = -outProg * 80;
      logo.style.transform = `translateY(${y}px) scale(${scale})`;
      logo.style.opacity = inProg;
    }

    // glow: スクロール中ずっと脈動するように移動
    if (glow) {
      const x = Math.sin(progress * Math.PI * 2) * 50;
      const y = Math.cos(progress * Math.PI * 2) * 30;
      const glowScale = 1 + Math.sin(progress * Math.PI) * 0.3;
      glow.style.transform = `translate(${x}px, ${y}px) scale(${glowScale})`;
    }

    // title: 0.3〜0.55で出現
    if (title) {
      const p = easeOut(range(progress, 0.3, 0.55));
      title.style.opacity = p;
      title.style.transform = `translateY(${(1 - p) * 30}px)`;
    }

    // desc: 0.45〜0.65で出現
    if (desc) {
      const p = easeOut(range(progress, 0.45, 0.65));
      desc.style.opacity = p;
      desc.style.transform = `translateY(${(1 - p) * 30}px)`;
    }

    // stats: 0.6〜0.85で出現
    if (stats) {
      const p = easeOut(range(progress, 0.6, 0.85));
      stats.style.opacity = p;
      stats.style.transform = `translateY(${(1 - p) * 40}px)`;
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
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
