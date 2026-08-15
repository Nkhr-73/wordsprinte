// ========================================
// WordSprint - Study
// ========================================


// ===== 単語データを読み込む =====

const savedData = localStorage.getItem("wordsprint_words");

let words = [];

if (savedData) {

    try {

        words = JSON.parse(savedData);

    } catch (error) {

        console.error(
            "単語データの読み込みに失敗しました。",
            error
        );

    }

}


// ===== 現在の問題番号 =====

let current = 0;


// ===== HTML要素 =====

const word = document.getElementById("word");
const meaning = document.getElementById("meaning");


// ===== 単語を表示 =====

function display() {

    // 単語がない場合
    if (words.length === 0) {

        word.textContent = "単語がありません";

        meaning.textContent = "";

        document.getElementById("current").textContent = "0";

        document.getElementById("total").textContent = "0";

        return;
    }


    // 現在の単語
    const currentWord = words[current];


    // 単語
    word.textContent =
        currentWord.word || "単語なし";


    // 意味
    meaning.textContent =
        currentWord.meaning || "意味なし";


    // 意味を隠す
    meaning.style.display = "none";


    // 進行状況
    document.getElementById("current").textContent =
        current + 1;

    document.getElementById("total").textContent =
        words.length;

}


// ===== 意味を見る =====

document.getElementById("showMeaning").onclick = function () {

    meaning.style.display = "block";

};


// ===== 次の問題 =====

function nextWord() {

    if (current < words.length - 1) {

        current++;

        display();

    }

}


// ===== 前の問題 =====

function previousWord() {

    if (current > 0) {

        current--;

        display();

    }

}


// ===== 理解度を記録 =====

window.rate = function(level) {

    if (words.length === 0) {
        return;
    }


    // 現在の単語に評価を保存
    words[current].status = level;


    // localStorageに保存
    localStorage.setItem(
        "wordsprint_words",
        JSON.stringify(words)
    );


    // Consoleで確認
    console.log(
        "評価を保存:",
        words[current].word,
        "→",
        level
    );


    // 次の問題へ
    nextWord();

};

// ===== 最初の問題を表示 =====

display();
