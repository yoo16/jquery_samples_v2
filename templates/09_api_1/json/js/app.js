document.addEventListener('DOMContentLoaded', function () {
    const errorElement = document.getElementById('error');
    // JSONデータ（テキスト）
    let jsonString = "";

    // ユーザオブジェクト
    let user = {}

    /**
     * JSON から Userオブジェクト
     */
    function loadUser() {
        try {
            // テキストエリアからJSONデータ（テキスト）を取得
            jsonString = document.getElementById('json-user').textContent;
            // TODO: JSONをパースし、ユーザオブジェクトに変換
            user = {};

            // ユーザ情報表示
            displayUser(user);
        } catch (error) {
            // エラー表示
            errorElement.textContent = 'JSONの形式が正しくありません: ' + error.message;
        }
    }

    /**
     * Userオブジェクト から JSON
     */
    function updateUser() {
        try {
            // 各フィールドから値を取得
            user.name = document.getElementById('user-name').value;
            user.email = document.getElementById('user-email').value;
            user.birthday = document.getElementById('user-birthday').value;
            user.city = document.getElementById('user-city').value;

            // TODO: JSONに変換
            jsonString = "";
            // テキストエリアにJSONデータ表示
            document.getElementById('json-user').textContent = jsonString
        } catch (error) {
            // エラー表示
            errorElement.textContent = 'JSONの形式が正しくありません: ' + error.message;
        }
    }

    /**
     * ユーザ情報表示
     * @param {*} user 
     */
    function displayUser(user) {
        // エラーをリセット
        errorElement.textContent = '';
        document.getElementById('user-name').value = user.name || '';
        document.getElementById('user-email').value = user.email || '';
        document.getElementById('user-birthday').value = formatDate(user.birthday) || '';
        document.getElementById('user-city').value = user.city || '';
    }

    /**
     * 日付フォーマット
     * @param {*} dateString 
     * @returns 
     */
    function formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        // 不正な日付をチェック
        if (isNaN(date)) return "";
        // YYYY-MM-DD形式
        return date.toISOString().split("T")[0];
    }

    // イベントリスナー
    // JSON -> Userオブジェクト
    const loadBtn = document.getElementById('load-button');
    loadBtn.addEventListener('click', loadUser);

    // Userオブジェクト -> JSON
    const updateBtn = document.getElementById('update-button');
    updateBtn.addEventListener('click', updateUser);
});