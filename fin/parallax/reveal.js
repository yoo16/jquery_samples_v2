/**
 * reveal.js
 * .reveal クラスがついた要素を、ビューポートに入ったタイミングで
 * is-visible クラスを付与してフェードイン表示させる。
 */
(function () {
  'use strict';

  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  // reduced-motionを尊重
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  // 同じ親内の要素を順に遅延させてスタガリング
  const groups = new Map();
  targets.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((els) => {
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });

  targets.forEach((el) => observer.observe(el));
})();
