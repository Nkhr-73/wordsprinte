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


        // ========================================
        // CSVを行ごとに分割
        // ========================================

        const lines =
            csvText
                .trim()
                .split(/\r?\n/);


        if (lines.length < 2) {

            alert("CSVに単語データがありません。");

            return;

        }


        // ========================================
        // ヘッダー
        // ========================================

        const headers =
            parseCSVLine(lines[0]);


        console.log(
            "ヘッダー:",
            headers
        );


        // ========================================
        // 今回読み込んだ単語
        // ========================================

        const newWords = [];


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


            newWords.push(word);

        }


        // ========================================
        // 既存データを取得
        // ========================================

        let savedWords = [];

        const savedData =
            localStorage.getItem("wordsprint_words");


        if (savedData) {

            try {

                savedWords =
                    JSON.parse(savedData);

            } catch (error) {

                console.error(
                    "保存データの読み込みに失敗しました。",
                    error
                );

                savedWords = [];

            }

        }


        // ========================================
        // 既存データ＋新データを統合
        // ========================================

        const mergedWords =
            [...savedWords];


        let addedCount = 0;
        let updatedCount = 0;


        newWords.forEach(newWord => {

            // wordを識別キーにする
            const existingIndex =
                mergedWords.findIndex(
                    savedWord =>
                        savedWord.word === newWord.word
                );


            // ====================================
            // 新しい単語
            // ====================================

            if (existingIndex === -1) {

                mergedWords.push(newWord);

                addedCount++;

                return;

            }


            // ====================================
            // 既存単語
            // ====================================

            const oldWord =
                mergedWords[existingIndex];


            // statusを保存
            const oldStatus =
                oldWord.status;


            // CSVの内容で更新
            mergedWords[existingIndex] = {
                ...newWord
            };


            // 既存のstatusがあれば維持
            if (oldStatus) {

                mergedWords[existingIndex].status =
                    oldStatus;

            }


            updatedCount++;

        });


        // ========================================
        // localStorageに保存
        // ========================================

        localStorage.setItem(
            "wordsprint_words",
            JSON.stringify(mergedWords)
        );


        // ========================================
        // 確認
        // ========================================

        console.log(
            "今回読み込んだ単語数:",
            newWords.length
        );

        console.log(
            "新しく追加:",
            addedCount
        );

        console.log(
            "更新:",
            updatedCount
        );

        console.log(
            "保存されている単語数:",
            mergedWords.length
        );


        console.log(
            "最初の単語:",
            mergedWords[0]
        );


        // ========================================
        // 画面表示
        // ========================================

        result.textContent =
            `読み込み成功！ ${newWords.length}語`;


        updateSavedCount();


        alert(
            `${newWords.length}語を読み込みました！\n\n` +
            `新規追加：${addedCount}語\n` +
            `更新：${updatedCount}語\n` +
            `合計：${mergedWords.length}語`
        );


        // ファイル選択をリセット
        csvFile.value = "";

        fileName.textContent =
            "ファイルが選択されていません";

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
