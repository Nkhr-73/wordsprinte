// ========================================
// WordSprint Study - データ確認版
// ========================================

const savedData = localStorage.getItem("wordsprint_words");

console.log("保存データ:", savedData);

let words = [];

if (savedData) {
    try {
        words = JSON.parse(savedData);
    } catch (error) {
        console.error("JSON変換エラー:", error);
    }
}

console.log("単語数:", words.length);
console.log("最初のデータ:", words[0]);


// 最初のデータを画面に表示
const wordElement = document.getElementById("word");
const meaningElement = document.getElementById("meaning");

if (words.length > 0) {

    const firstWord = words[0];

    wordElement.textContent =
        "データ確認：" + JSON.stringify(firstWord);

    meaningElement.textContent =
        "キー：" + Object.keys(firstWord).join(" / ");

} else {

    wordElement.textContent = "データがありません";

    meaningElement.textContent = "";

}
