$(function () {
    const $mainImage = $("#main-image");
    const $mainTitle = $("#main-title");
    const $mainCopy = $("#main-copy");
    const $mainCount = $("#main-count");

    $('.thumbnail').on('click', function () {
        const $button = $(this);
        const src = $button.find('img').attr('src');
        const title = $button.data('title');
        const copy = $button.data('copy');
        const index = $button.data('index');

        $('.thumbnail').removeClass('is-active');
        $button.addClass('is-active');

        $mainImage.fadeOut(220, function () {
            $mainImage.attr({
                src,
                alt: title,
            }).fadeIn(220);

            $mainTitle.text(title);
            $mainCopy.text(copy);
            $mainCount.text(`${index} / 5`);
        });
    });
});
