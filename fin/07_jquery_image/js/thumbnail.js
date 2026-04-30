$(function () {
    // TODO: サムネイルクリック
    // 1. jqon と入力 ※VSCodeプラグイン の jQuery Code snippets を利用
    // 2. class="thumbnail" を指定
    // 3. クリックイベントを設定
    $('.thumbnail').on('click', function () {
        // TODO: img = $(this) から 画像パス src を取得
        const src = $(this).attr('src')
        // jqfadeOut
        // id="main-image" を指定してフェードアウト
        $("#main-image").fadeOut(300, function(){
            // コールバックで、メイン画像の img にパスを設定してフェードイン
            $("#main-image").attr("src", src).fadeIn(300)
        });
    });
});


// バニラJSの場合
// document.addEventListener("DOMContentLoaded", function () {
//     // サムネイルクリック
//     const thumbnails = document.querySelectorAll(".thumbnail");
//     const mainImage = document.getElementById("main-image");
//     thumbnails.forEach(thumbnail => {
//         thumbnail.addEventListener("click", function () {
//             // img から 画像パス src を取得
//             const src = thumbnail.getAttribute("src");
//             // メイン画像の img をフェードアウト
//             mainImage.style.transition = "opacity 0.3s";
//             mainImage.style.opacity = "0";
//             setTimeout(() => {
//                 // コールバックで、メイン画像の img にパスを設定してフェードイン
//                 mainImage.setAttribute("src", src);
//                 mainImage.style.opacity = "1";
//             }, 300); // フェードアウトに合わせてタイミング調整
//         });
//     });
// });