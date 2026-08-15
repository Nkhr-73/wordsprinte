// ========================================
// WordSprint - CSV Import
// ========================================


// ===== 要素取得 =====

const csvFile = document.getElementById("csvFile");
const fileName = document.getElementById("fileName");
const importButton = document.getElementById("importButton");
const result = document.getElementById("result");


// ===== イベント =====

csvFile.addEventListener("change", showFileName);

importButton.addEventListener("click", readCSV);


// ========================================
// ファイル名表示
// ========================================

function showFileName() {

    if (csvFile.files.length === 0) {

        fileName.textContent =
            "ファイルが選択されていません";

        return;
    }

    fileName.textContent =
        csvFile.files[0].name;

}


// ========================================
// CSVの1行を正しく分割する
// カンマが入った文章にも対応
// ========================================

function parseCSVLine(line) {

    const values = [];

    let value = "";
    let insideQuotes = false;


    for (let i = 0; i < line.length; i++) {

        const char = line[i];


        // ダブルクォーテーション
        if (char === '"') {

            // "" → " として扱う
            if (
                insideQuotes &&
                line[i + 1] === '"'
            ) {

                value += '"';
                i++;

            } else {

                insideQuotes = !insideQuotes;

            }

            continue;
        }


        // クォーテーション外のカンマ
        if (char === "," && !insideQuotes) {

            values.push(value.trim());

            value = "";

            continue;
        }


        value += char;

    }


    values.push(value.trim());

    return values;
}


// ========================================
// CSVを読み込む
// ========================================

function readCSV() {

    if (csvFile.files.length === 0) {

        alert("CSVファイルを選択してください。");

        return;
    }


    const file = csvFile.files[0];

    const reader = new FileReader();


    reader.onload = function(event) {

        const csvText = event.target.result;


        // 改行ごとに分割
        const lines =
            csvText
                .trim()
                .split(/\r?\n/);


        // ヘッダー
        const headers =
            parseCSVLine(lines[0]);


        console.log("ヘッダー:", headers);


        const words = [];


        // ========================================
        // データを1行ずつ処理
        // ========================================

        for (let i = 1; i < lines.length; i++) {

            // 空行を無視
            if (lines[i].trim() === "") {
                continue;
            }


            const values =
                parseCSVLine(lines[i]);


            const word = {};


            for (
                let j = 0;
                j < headers.length;
                j++
            ) {

                word[headers[j]] =
                    values[j] || "";

            }


            words.push(word);

        }


        // ========================================
        // localStorageに保存
        // ========================================

        localStorage.setItem(
            "wordsprint_words",
            JSON.stringify(words)
        );


        // ========================================
        // 確認
        // ========================================

        console.log(
            "読み込んだ単語数:",
            words.length
        );

        console.log(
            "最初の単語:",
            words[0]
        );


        // ========================================
        // 画面表示
        // ========================================

        result.textContent =
            `読み込み成功！ ${words.length}語`;


        updateSavedCount();


        alert(
            `${words.length}語の単語帳を保存しました！`
        );

    };


    reader.readAsText(file, "UTF-8");

}


// ========================================
// 保存されている単語数
// ========================================

function updateSavedCount() {

    const savedWords =
        JSON.parse(
            localStorage.getItem("wordsprint_words")
        ) || [];


    const savedCount =
        document.getElementById("savedCount");


    if (savedCount) {

        savedCount.textContent =
            `保存されている単語：${savedWords.length}語`;

    }

}


// ========================================
// ページ読み込み時
// ========================================

updateSavedCount();
