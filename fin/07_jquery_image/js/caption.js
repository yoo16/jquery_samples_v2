$(function () {
    const $imageList = $("#image-list");

    // 画像リストを動的に生成
    function loadImages() {

        // TODO: items を繰り返し: forEach
        // foreach と入力して forEach 文を作成
        items.forEach(data => {
            // --- ここから（繰り返し） ---
            const listItem = `
            <li class="relative group">
                <div class="loading absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div class="loader border-4 border-gray-300 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                </div>
                <img src="${data.image}" class="item w-full h-auto rounded-lg shadow-md hidden">
                <div class="caption hidden absolute inset-0 bg-teal-600 rounded-lg p-3 bg-opacity-85 flex items-center justify-center text-white">
                    <div class="name p-4">${data.name}</div>
                    <div class="caption p-4">${data.caption}</div>
                </div>
            </li>`;
            // TODO: listItem を $imageList に追加
            $imageList.append(listItem)
            // --- ここまで（繰り返し） --- 
        });



        // 画像読み込み完了イベント
        $('.item').on('load', function () {
            // TODO: ローディングフェードアウト＆削除: fadeOut()
            $(this).siblings('.loading').fadeOut(200)

            // TODO: 画像フェードイン: fadeIn()
            $(this).fadeIn(200)
        });
    }

    // マウスオーバーイベントの設定（イベントデリゲーション: li）
    $imageList.on({
        mouseenter: function () {
            // TODO: マウスオーバーでキャプション表示: class=caption: fadeIn()
            $(this).find('.caption').stop().fadeIn(200)
        },
        mouseleave: function () {
            // TODO: マウスアウトでキャプション非表示: class=caption: fadeOut()
            $(this).find('.caption').stop().fadeOut(200)
        }
    }, 'li');

    loadImages();
});
