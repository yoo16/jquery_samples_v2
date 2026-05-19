document.addEventListener('DOMContentLoaded', () => {
    const SCROLL_OFFSET = 800;
    const SLIDE_OFFSET  = 400;

    // ────────────────────────────────────────────────
    //  Elements
    // ────────────────────────────────────────────────
    const copyEl           = document.querySelector('#copy');
    const nav              = document.querySelector('#nav');
    const scrollProgress   = document.querySelector('#scroll-progress');
    const fadeElements     = document.querySelectorAll('.fade-in');
    const slideElements    = document.querySelectorAll('.slide-in-y');
    const animationElements= document.querySelectorAll('.css-animation');
    const menuLinks        = document.querySelectorAll('#nav a[href^="#"]');

    // Topics scatter-reveal
    const topicSection = document.querySelector('#topic');
    const topicCards   = document.querySelectorAll('#topic .topic-card');

    // Characters image-parallax
    const charImages = document.querySelectorAll('.char-img-inner');

    // Typewriter
    const copyText    = 'Welcome to Parallax World';
    const typingSpeed = 100;
    let   typingIndex = 0;

    // ────────────────────────────────────────────────
    //  Easing
    // ────────────────────────────────────────────────
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    // ────────────────────────────────────────────────
    //  Generic scroll helpers
    // ────────────────────────────────────────────────
    function getProgress(el, scrollY, offset = SCROLL_OFFSET) {
        const top = el.getBoundingClientRect().top + scrollY;
        return Math.min(1, Math.max(0, (scrollY - top + offset) / window.innerHeight));
    }

    function cssAnimation(el, scrollY) {
        if (getProgress(el, scrollY) > 0) el.classList.add('is-active');
        else el.classList.remove('is-active');
    }

    function fadeIn(el, scrollY) {
        const p = getProgress(el, scrollY);
        if (p > 0) el.style.opacity = p;
    }

    function slideInY(el, scrollY) {
        const p = getProgress(el, scrollY, SCROLL_OFFSET + SLIDE_OFFSET);
        if (p > 0) {
            const c = Math.min(1, p);
            el.style.opacity   = c;
            el.style.transform = `translateY(${(1 - c) * 40}px)`;
        }
    }

    // ────────────────────────────────────────────────
    //  Topics: sticky scatter-reveal
    //  Cards fly in from scattered positions as you
    //  scroll through the 250 vh section.
    // ────────────────────────────────────────────────
    const CARD_ORIGINS = [
        { x: -340, y: 180, r: -24 },  // left card
        { x:    0, y: 400, r:   0 },  // center card
        { x:  340, y: 180, r:  24 },  // right card
    ];

    function topicsReveal(scrollY) {
        if (!topicSection) return;
        const sectionTop = topicSection.getBoundingClientRect().top + scrollY;
        const scrollable = topicSection.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;

        const raw = (scrollY - sectionTop) / scrollable;
        const p   = easeOutQuart(Math.max(0, Math.min(1, raw)));

        topicCards.forEach((card, i) => {
            const o = CARD_ORIGINS[i] ?? CARD_ORIGINS[0];
            card.style.transform = `translate(${o.x * (1 - p)}px, ${o.y * (1 - p)}px) rotate(${o.r * (1 - p)}deg)`;
            card.style.opacity   = Math.min(1, p * 1.6);
        });
    }

    // ────────────────────────────────────────────────
    //  Characters: image floats inside the card frame
    //  as the card travels through the viewport.
    // ────────────────────────────────────────────────
    function charImgParallax() {
        charImages.forEach(img => {
            const wrap = img.parentElement;
            const rect = wrap.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            const viewCenter = window.innerHeight * 0.5;
            const elemCenter = rect.top + rect.height * 0.5;
            const progress   = (elemCenter - viewCenter) / viewCenter; // -1 … 1
            img.style.transform = `translateY(${-progress * 28}px)`;
        });
    }

    // ────────────────────────────────────────────────
    //  Typewriter
    // ────────────────────────────────────────────────
    function typeWriter() {
        if (typingIndex < copyText.length) {
            copyEl.textContent += copyText[typingIndex++];
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // ────────────────────────────────────────────────
    //  Main scroll handler
    // ────────────────────────────────────────────────
    function handleScroll() {
        const scrollY    = window.scrollY;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollProgress) {
            scrollProgress.style.width = `${(scrollY / docHeight) * 100}%`;
        }

        fadeElements.forEach(el      => fadeIn(el, scrollY));
        slideElements.forEach(el     => slideInY(el, scrollY));
        animationElements.forEach(el => cssAnimation(el, scrollY));
        topicsReveal(scrollY);
        charImgParallax();
    }

    // ────────────────────────────────────────────────
    //  Smooth scroll
    // ────────────────────────────────────────────────
    menuLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offset = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // ────────────────────────────────────────────────
    //  Init
    // ────────────────────────────────────────────────
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    copyEl.textContent = '';
    copyEl.classList.add('invisible');
    setTimeout(() => {
        copyEl.classList.remove('invisible');
        typeWriter();
    }, 600);
});
