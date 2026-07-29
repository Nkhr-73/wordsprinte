// ===== 要素取得 =====

const csvFile = document.getElementById("csvFile");
const fileName = document.getElementById("fileName");

// ===== イベント =====

csvFile.addEventListener("change", showFileName);

// ===== 関数 =====

// ファイル名を表示する
function showFileName() {

    // ファイルが選択されていない場合
    if (csvFile.files.length === 0) {
        fileName.textContent = "ファイルが選択されていません";
        return;
    }

    // ファイル名を表示
    fileName.textContent = csvFile.files[0].name;
}



// ===== CSV読み込み =====

importButton.addEventListener("click", readCSV);

function readCSV() {

    if (csvFile.files.length === 0) {
        alert("CSVファイルを選択してください。");
        return;
    }

    const file = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {

        const csvText = event.target.result;
        // 改行ごとに分割
const lines = csvText.trim().split(/\r?\n/);
        // 1行目をカンマで区切る
const headers = lines[0].split(",");

// 確認
console.log(headers);

        const words = [];

        // ヘッダー以外を1行ずつ読む
for (let i = 1; i < lines.length; i++) {

    const values = lines[i].split(",");

    const word = {};

    for (let j = 0; j < headers.length; j++) {
        word[headers[j]] = values[j];
    }
    words.push(word);

}

// 完成した単語帳を確認
console.log(words);
        
        // ブラウザに保存
localStorage.setItem("words", JSON.stringify(words));
        alert("単語帳を保存しました！");
        
        const savedWords = JSON.parse(localStorage.getItem("words"));

console.log(savedWords);

// 画面にも表示してみる
document.getElementById("result").innerHTML = "";

lines.forEach(line => {
    document.getElementById("result").innerHTML += line + "<br>";
});

        console.log(JSON.stringify(csvText));

        document.getElementById("result").textContent = csvText;

    };

    reader.readAsText(file, "UTF-8");

}
