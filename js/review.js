// ========================================
// WordSprint - Review
// ========================================

console.log("review.js 読み込み成功");


// ===== 保存データを取得 =====

const savedData =
    localStorage.getItem("wordsprint_words");

const allWords =
    savedData ? JSON.parse(savedData) : [];


// ===== 復習対象を取得 =====
// 🤔 あやしい と 😵 全然

const reviewWords =
    allWords.filter(word =>
        word.status === "bad" ||
        word.status === "unsure"
    );


// ===== 復習単語数を表示 =====

document.getElementById("reviewTotal").textContent =
    reviewWords.length;

document.getElementById("total").textContent =
    reviewWords.length;


// ===== Console確認 =====

console.log(
    "全単語:",
    allWords.length
);

console.log(
    "復習対象:",
    reviewWords.length
);

console.log(
    "復習単語:",
    reviewWords
);

// ========================================
// 現在の単語
// ========================================

let current = 0;


// ===== 要素取得 =====

const wordElement =
    document.getElementById("word");

const meaningElement =
    document.getElementById("meaning");

const currentElement =
    document.getElementById("current");


// ========================================
// 単語を表示
// ========================================

function displayWord() {

    // 復習する単語がない場合
    if (reviewWords.length === 0) {

        wordElement.textContent =
            "復習する単語がありません";

        meaningElement.style.display =
            "none";

        currentElement.textContent =
            "0";

        return;
    }


    const word =
        reviewWords[current];


    wordElement.textContent =
        word.word;

    meaningElement.textContent =
        word.meaning;


    // 意味を隠す
    meaningElement.style.display =
        "none";


    // 番号
    currentElement.textContent =
        current + 1;

}


// ========================================
// 意味を見る
// ========================================

document.getElementById("showMeaning").onclick =
    function () {

        meaningElement.style.display =
            "block";

    };


// ========================================
// 次へ
// ========================================

document.getElementById("next").onclick =
    function () {

        if (current < reviewWords.length - 1) {

            current++;

            displayWord();

        }

    };


// ========================================
// 前へ
// ========================================

document.getElementById("previous").onclick =
    function () {

        if (current > 0) {

            current--;

            displayWord();

        }

    };


// ========================================
// 最初の単語を表示
// ========================================

displayWord();

// ========================================
// 評価
// ========================================

function rate(level) {

    // 復習対象がない場合
    if (reviewWords.length === 0) {
        return;
    }

    // 現在の単語
    const currentWord = reviewWords[current];

    // 元データの中から同じ単語を探す
    const targetWord = allWords.find(
        word => word.word === currentWord.word
    );

    // 見つからなかった場合
    if (!targetWord) {
        console.log("単語が見つかりません");
        return;
    }

    // 評価を更新
    targetWord.status = level;

    // localStorageへ保存
    localStorage.setItem(
        "wordsprint_words",
        JSON.stringify(allWords)
    );

    console.log(
        currentWord.word,
        "→",
        level
    );

    // 次の単語へ
    if (current < reviewWords.length - 1) {

        current++;

        displayWord();

    } else {

        // 最後の単語だった場合
        wordElement.textContent =
            "復習完了！";

        meaningElement.style.display =
            "none";

    }

}
