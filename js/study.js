// ========================================
// WordSprint - Study
// ========================================


// ========================================
// ① 単語データを読み込む
// ========================================

const savedData = localStorage.getItem("wordsprint_words");

let words = [];


// データが存在する場合
if (savedData) {

    try {

        words = JSON.parse(savedData);

    } catch (error) {

        console.error("単語データの読み込みに失敗しました。", error);

    }

}


// 読み込み確認
console.log("===== WordSprint Study =====");
console.log("読み込んだ単語数:", words.length);
console.log("最初の単語:", words[0]);


// ========================================
// ② HTML要素を取得
// ========================================

const wordElement = document.getElementById("word");
const meaningElement = document.getElementById("meaning");

const currentElement = document.getElementById("current");
const totalElement = document.getElementById("total");

const showMeaningButton =
    document.getElementById("showMeaning");


// ========================================
// ③ 現在の問題番号
// ========================================

let current = 0;


// ========================================
// ④ 単語を表示する
// ========================================

function displayWord() {

    // 単語がない場合
    if (words.length === 0) {

        wordElement.textContent = "単語がありません";

        meaningElement.textContent = "";

        currentElement.textContent = "0";

        totalElement.textContent = "0";

        return;
    }


    // 現在の単語
    const currentWord = words[current];


    console.log("現在の単語:", currentWord);


    // 単語を表示
    wordElement.textContent =
        currentWord.word || "単語なし";


    // 意味を設定
    meaningElement.textContent =
        currentWord.meaning || "意味なし";


    // 意味を隠す
    meaningElement.style.display = "none";


    // 進行状況
    currentElement.textContent =
        current + 1;

    totalElement.textContent =
        words.length;

}


// ========================================
// ⑤ 「意味を見る」
// ========================================

showMeaningButton.onclick = function () {

    meaningElement.style.display = "block";

};


// ========================================
// ⑥ 次の問題
// ========================================

function nextWord() {

    if (current < words.length - 1) {

        current++;

        displayWord();

    }

}


// ========================================
// ⑦ 前の問題
// ========================================

function previousWord() {

    if (current > 0) {

        current--;

        displayWord();

    }

}


// ========================================
// ⑧ 理解度を記録
// ========================================

window.rate = function(level) {

    if (words.length === 0) {
        return;
    }


    // 現在の単語に評価を追加
    words[current].status = level;


    console.log(
        "評価:",
        words[current].word,
        "→",
        level
    );


    // 次の問題へ
    nextWord();

};


// ========================================
// ⑨ 最初の問題を表示
// ========================================

displayWord();
