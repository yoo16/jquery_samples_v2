$(function () {
    const $win = $(window);

    // ====================================
    // 1. 多層レイヤーパララックス
    // ====================================
    function updateLayers() {
        const scrollTop = $win.scrollTop();
        $('.layer').each(function () {
            const speed = parseFloat($(this).data('speed'));
            const yPos = -(scrollTop * speed);
            $(this).css('transform', `translate3d(0, ${yPos}px, 0)`);
        });

        // ヒーロータイトルのフェードアウト + 上方向スライド
        const $title = $('[data-hero-title]');
        const heroHeight = $('.hero').outerHeight();
        const progress = Math.min(scrollTop / heroHeight, 1);
        $title.css({
            'transform': `translate(-50%, calc(-50% - ${scrollTop * 0.5}px))`,
            'opacity': 1 - progress * 1.5
        });
    }

    // ====================================
    // 2. 背景テキストの横方向パララックス
    // ====================================
    function updateBgText() {
        const scrollTop = $win.scrollTop();
        const $bgText = $('.bg-text');
        const speed = parseFloat($bgText.data('speed-x') || 0.3);
        const offset = scrollTop * speed;
        $bgText.css('transform', `translateY(-50%) translateX(${-offset}px)`);
    }

    // ====================================
    // 3. カードの個別速度パララックス
    // ====================================
    function updateCards() {
        const scrollTop = $win.scrollTop();
        const winHeight = $win.height();

        $('[data-card-speed]').each(function () {
            const $card = $(this);
            const speed = parseFloat($card.data('card-speed'));
            const cardTop = $card.offset().top;
            // 画面に入ってきたところを基準にオフセット計算
            const relative = scrollTop + winHeight - cardTop;
            if (relative > 0 && relative < winHeight * 2) {
                const yPos = -(relative - winHeight) * speed;
                $card.css('transform', `translate3d(0, ${yPos}px, 0)`);
            }
        });
    }

    // ====================================
    // 4. スクロールプログレスバー
    // ====================================
    function updateProgress() {
        const docHeight = $(document).height() - $win.height();
        const progress = ($win.scrollTop() / docHeight) * 100;
        $('.scroll-progress').css('width', progress + '%');
    }

    // ====================================
    // 5. フェードイン要素
    // ====================================
    function updateFadeUp() {
        const scrollBottom = $win.scrollTop() + $win.height();
        $('[data-fade-up]').each(function () {
            const $el = $(this);
            if (scrollBottom > $el.offset().top + 100) {
                $el.css({
                    'opacity': 1,
                    'transform': 'translateY(0)'
                });
            }
        });
    }

    // フェードイン要素の初期スタイル
    $('[data-fade-up]').css({
        'opacity': 0,
        'transform': 'translateY(40px)',
        'transition': 'opacity 0.8s ease-out, transform 0.8s ease-out'
    });

    // ====================================
    // requestAnimationFrameでスクロール最適化
    // ====================================
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateLayers();
                updateBgText();
                updateCards();
                updateProgress();
                updateFadeUp();
                ticking = false;
            });
            ticking = true;
        }
    }

    $win.on('scroll', onScroll);

    // 初期表示時にも実行
    onScroll();
});