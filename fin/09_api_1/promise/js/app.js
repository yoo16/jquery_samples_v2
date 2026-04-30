const quotes = [
    {
        "text": "一生迷ってろ…！そして失い続けるんだ…！貴重な機会（チャンス）をっ…！",
        "author": "利根川幸雄"
    },
    {
        "text": "明日からがんばるんじゃない…！今日…今日だけがんばるんだっ…！今日をがんばった者…今日をがんばり始めた者にのみ…明日が来るんだよっ…！",
        "author": "大槻（班長）"
    },
    {
        "text": "追い詰められた人間が最後に頼るべきは…自分自身の『意志』……！それだけだっ……！",
        "author": "伊藤開司"
    },
    {
        "text": "金は命より重いんだっ……！そこの認識をごまかす輩は、生涯地を這う……！",
        "author": "利根川幸雄"
    },
    {
        "text": "勝たなきゃダメだ…！勝たなきゃゴミだっ…！",
        "author": "伊藤開司"
    },
    {
        "text": "未来は僕らの手の中……！なんてな……！だが、その未来を掴むのは…今、この瞬間の狂気だっ……！",
        "author": "伊藤開司"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    const fetchQuoteButton = document.getElementById("fetch-quote-button");
    const loadingDiv = document.getElementById("loading");
    const errorDiv = document.getElementById("error");
    const quoteDiv = document.getElementById("quote");
    const authorDiv = document.getElementById("author");

    function fetchRandomQuote() {
        return new Promise((resolve, reject) => {
            // UIのリセット
            loadingDiv.classList.remove("hidden");
            errorDiv.classList.add("hidden");
            quoteDiv.classList.add("hidden");
            authorDiv.classList.add("hidden");

            setTimeout(() => {
                const success = Math.random() > 0.2; // 80%の確率で成功
                if (success) {
                    const index = Math.floor(Math.random() * quotes.length);
                    // TODO: resolve() を実行: 引数に名言を渡す
                } else {
                    // TODO: reject() を実行: 引数にエラーメッセージを渡す
                }
            }, 1500);
        });
    }

    async function handlerRandomQuote() {
        // ボタンを一時的に無効化
        fetchQuoteButton.disabled = true;
        fetchQuoteButton.classList.add("opacity-50", "cursor-not-allowed");

        try {
            // fetchRandomQuote() を非同期で実行
            const quote = await fetchRandomQuote();
            // TODO: displayQuote() を実行: 引数に名言を渡す
        } catch (error) {
            // TODO: displayError() を実行: 引数にエラーメッセージを渡す
        } finally {
            loadingDiv.classList.add("hidden");
            fetchQuoteButton.disabled = false;
            fetchQuoteButton.classList.remove("opacity-50", "cursor-not-allowed");
        }
    }

    function displayQuote(quote) {
        quoteDiv.textContent = quote.text;
        authorDiv.textContent = `— ${quote.author}`;
        quoteDiv.classList.remove("hidden");
        authorDiv.classList.remove("hidden");
    }

    function displayError(type) {
        const messages = {
            "fetch_failed": "クソッ…！名言の取得に失敗…！運否天賦のギャンブルに…負けたんだっ…！",
            "network": "ざわ… ざわ… 通信が不安定だ…！何かが後ろで蠢いてやがる……！"
        };

        errorDiv.innerHTML = `
        <div class="space-y-2">
            <div class="text-3xl font-black italic tracking-tighter text-red-700">ざわ… ざわ…</div>
            <p class="text-red-600 font-bold">${messages[type] || "エラー発生…！猛省せよっ…！"}</p>
        </div>`;
        errorDiv.classList.remove("hidden");
    }

    fetchQuoteButton.addEventListener("click", handlerRandomQuote);
});