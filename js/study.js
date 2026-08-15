// ===== 保存されている単語を取得 =====

const savedWords =
    JSON.parse(localStorage.getItem("wordsprint_words")) || [];


// ===== 単語がない場合 =====

if (savedWords.length === 0) {

    alert("単語帳がありません。先にCSVを読み込んでください。");

}


// ===== Study用データ =====

const words = savedWords;
console.log("単語データ:", words[0]);
console.log("word:", words[0]?.word);
console.log("meaning:", words[0]?.meaning);

let current = 0;


// ===== HTML要素 =====

const word = document.getElementById("word");
const meaning = document.getElementById("meaning");


// ===== 問題を表示 =====

function display() {

    if (words.length === 0) {
        word.textContent = "単語がありません";
        meaning.style.display = "none";
        return;
    }

    word.textContent = words[current].word;

    meaning.textContent = words[current].meaning;

    meaning.style.display = "none";

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

window.rate = function (level) {

    words[current].status = level;

    console.log(
        "評価:",
        words[current].word,
        level
    );

    nextWord();

};


// ===== 最初の問題を表示 =====

display();
