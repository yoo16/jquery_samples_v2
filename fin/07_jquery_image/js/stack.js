$(function () {
    const $container = $('#image-container');
    const $buttons = $('#next-button1, #next-button2');
    let isAnimating = false;

    function layoutStack() {
        const $items = $container.children('.stacked-item');
        const total = $items.length;

        $items.each(function (index) {
            const depth = total - index - 1;
            $(this).css({
                zIndex: index + 1,
                transform: `translate(${depth * 12}px, ${depth * 12}px) scale(${1 - depth * 0.03})`,
                opacity: Math.max(0.42, 1 - depth * 0.12),
            });
        });
    }

    function setAnimating(state) {
        isAnimating = state;
        $buttons.prop('disabled', state);
    }

    function getTopImage() {
        return $container.children('.stacked-item').last();
    }

    function stackAnimation1() {
        if (isAnimating) {
            return;
        }

        const $topImage = getTopImage();
        setAnimating(true);

        $topImage.css({
            zIndex: 100,
            transform: 'translate(0, 0) scale(1)',
            opacity: 1,
        }).animate({
            left: '48%',
            top: '-12%',
            opacity: 0.9,
        }, 420, function () {
            $topImage.prependTo($container).css({
                left: '-4%',
                top: '8%',
                opacity: 0.45,
                zIndex: 1,
            }).animate({
                left: 0,
                top: 0,
                opacity: 1,
            }, 320, function () {
                layoutStack();
                setAnimating(false);
            });
        });
    }

    function stackAnimation2() {
        if (isAnimating) {
            return;
        }

        const $topImage = getTopImage();
        setAnimating(true);
        $topImage.css({
            zIndex: 100,
            transform: '',
            opacity: '',
        }).addClass('swipe-out');

        $topImage.one('transitionend', function () {
            $topImage.prependTo($container).css({
                zIndex: 1,
                left: 0,
                top: 0,
            });

            requestAnimationFrame(function () {
                $topImage.addClass('swipe-in').removeClass('swipe-out');

                $topImage.one('transitionend', function () {
                    $topImage.removeClass('swipe-in');
                    layoutStack();
                    setAnimating(false);
                });
            });
        });
    }

    $('#next-button1').on('click', stackAnimation1);
    $('#next-button2').on('click', stackAnimation2);

    layoutStack();
});
