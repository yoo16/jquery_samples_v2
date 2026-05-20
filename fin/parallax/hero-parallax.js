/**
 * hero-parallax.js
 * #hero セクションのピン留め演出。スクロール進行度（0〜1）に応じて
 * テキスト/プロダクト画像のtransform・opacityを動かす。
 */
(function () {
  'use strict';

  const section = document.getElementById('hero');
  if (!section) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const eyebrow = section.querySelector('[data-hero="eyebrow"]');
  const title = section.querySelector('[data-hero="title"]');
  const tagline = section.querySelector('[data-hero="tagline"]');
  const sub = section.querySelector('[data-hero="sub"]');
  const cta = section.querySelector('[data-hero="cta"]');
  const product = section.querySelector('[data-hero="product"]');

  // 数値を 0〜1 にクランプ
  const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
  // イージング
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  let ticking = false;

  function update() {
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    // 進行度0〜1（セクション先頭が画面上端に来た時0、末尾で1）
    const progress = clamp(-rect.top / total);

    // テキスト群 - 進行度が進むにつれ上方にフェード
    const textOpacity = 1 - easeOut(clamp(progress / 0.4));
    const textY = -progress * 120; // 上に流す

    if (eyebrow) {
      eyebrow.style.opacity = textOpacity;
      eyebrow.style.transform = `translateY(${textY}px)`;
    }
    if (title) {
      title.style.opacity = textOpacity;
      title.style.transform = `translateY(${textY * 1.2}px)`;
    }
    if (tagline) {
      tagline.style.opacity = textOpacity;
      tagline.style.transform = `translateY(${textY}px)`;
    }
    if (sub) {
      sub.style.opacity = textOpacity;
      sub.style.transform = `translateY(${textY}px)`;
    }
    if (cta) {
      cta.style.opacity = textOpacity;
      cta.style.transform = `translateY(${textY * 0.8}px)`;
    }

    // 製品画像 - 後半でスケールアップしながら上に動く
    if (product) {
      const scale = 1 + progress * 0.4; // 1.0 → 1.4
      const y = -progress * 200;
      const rot = progress * -3;
      product.style.transform = `translateY(${y}px) scale(${scale}) rotate(${rot}deg)`;
      // 終盤フェードアウト
      product.style.opacity = 1 - easeOut(clamp((progress - 0.6) / 0.4));
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
