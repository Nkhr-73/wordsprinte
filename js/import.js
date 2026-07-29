// ===== 要素取得 =====

const csvFile = document.getElementById("csvFile");
const fileName = document.getElementById("fileName");
const importButton = document.getElementById("importButton");
const result = document.getElementById("result");

// ===== イベント =====

csvFile.addEventListener("change", showFileName);
importButton.addEventListener("click", readCSV);

// ==============================
// ファイル名を表示
// ==============================

function showFileName() {

    if (csvFile.files.length === 0) {
        fileName.textContent = "ファイルが選択されていません";
        return;
    }

    fileName.textContent = csvFile.files[0].name;

}

// ==============================
// CSVを読み込む
// ==============================

function readCSV() {

    // ファイル未選択
    if (csvFile.files.length === 0) {
        alert("CSVファイルを選択してください。");
        return;
    }

    const file = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {

        // CSV全文
        const csvText = event.target.result;

        // 改行ごとに分割
        const lines = csvText.trim().split(/\r?\n/);

        // ヘッダー取得
        const headers = lines[0].split(",");

        // 単語データ
        const words = [];

        // 2行目以降を読み込む
        for (let i = 1; i < lines.length; i++) {

            const values = lines[i].split(",");

            const word = {};

            // ヘッダーと値を対応させる
            for (let j = 0; j < headers.length; j++) {
                word[headers[j]] = values[j];
            }

            // 配列へ追加
            words.push(word);

        }

        // localStorageへ保存
        localStorage.setItem(
            "wordsprint_words",
            JSON.stringify(words)
        );

        // 保存状況更新
        updateSavedCount();

        // 読み込み結果表示
        result.textContent =
            JSON.stringify(words, null, 2);

        // Console確認用
        console.log(words);

        alert("単語帳を保存しました！");

    };

    reader.readAsText(file, "UTF-8");

}

// ==============================
// 保存されている単語数を表示
// ==============================

function updateSavedCount() {

    const savedWords =
        JSON.parse(localStorage.getItem("wordsprint_words")) || [];

    const savedCount = document.getElementById("savedCount");

    if (savedCount) {
        savedCount.textContent =
            `保存されている単語：${savedWords.length}語`;
    }

}

// ページを開いた時に表示
updateSavedCount();
