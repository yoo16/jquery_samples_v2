$(function () {
    const $container = $('#image-container');
    const $buttons = $('#next-button1, #next-button2');
    let isAnimating = false;

    function waitForTransformEnd($element, callback) {
        $element.off('transitionend.stack');
        $element.on('transitionend.stack', function (event) {
            if (event.target !== this || event.originalEvent.propertyName !== 'transform') {
                return;
            }

            $element.off('transitionend.stack');
            callback();
        });
    }

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
        }).removeClass('swipe-in is-resetting').addClass('swipe-out');

        waitForTransformEnd($topImage, function () {
            $topImage
                .addClass('is-resetting')
                .removeClass('swipe-out')
                .prependTo($container)
                .css({
                zIndex: 1,
                left: 0,
                top: 0,
                transform: 'translate(-4%, 8%) scale(0.96)',
                opacity: 0.45,
            });

            $topImage[0].offsetWidth;

            requestAnimationFrame(function () {
                waitForTransformEnd($topImage, function () {
                    setAnimating(false);
                });

                $topImage.removeClass('is-resetting');
                layoutStack();
            });
        });
    }

    $('#next-button1').on('click', stackAnimation1);
    $('#next-button2').on('click', stackAnimation2);

    layoutStack();
});
