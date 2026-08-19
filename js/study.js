// ========================================
// WordSprint - Study
// Phase 3.2
// ========================================


// ========================================
// 単語データを読み込む
// ========================================

const savedData =
    localStorage.getItem("wordsprint_words");

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


// ========================================
// Study用の単語順を作る
// ========================================

// 元のwords配列そのものは変更しない
// StatisticsやLibraryとの互換性を保つ

let studyWords = [...words];


// Fisher-Yatesシャッフル
function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
            [array[j], array[i]];

    }

    return array;
}


// ランダム出題
shuffle(studyWords);


// ========================================
// 現在の問題番号
// ========================================

let current = 0;


// ========================================
// 1回目のクリックかどうか
// ========================================

// false = まだ意味を見ていない
// true  = 意味を見た

let meaningShown = false;


// ========================================
// 今回のStudy結果
// ========================================

let sessionResults = [];


// ========================================
// HTML要素
// ========================================

const word =
    document.getElementById("word");

const meaning =
    document.getElementById("meaning");

const currentElement =
    document.getElementById("current");

const totalElement =
    document.getElementById("total");


// ========================================
// 単語を表示
// ========================================

function display() {

    if (studyWords.length === 0) {

        word.textContent =
            "単語がありません";

        meaning.textContent = "";

        currentElement.textContent = "0";

        totalElement.textContent = "0";

        return;
    }


    const currentWord =
        studyWords[current];


    // 単語
    word.textContent =
        currentWord.word || "単語なし";


    // 意味
    meaning.textContent =
        currentWord.meaning || "意味なし";


    // 最初は意味を隠す
    meaning.style.display = "none";


    // 1回目のクリック待ち
    meaningShown = false;


    // 進行状況
    currentElement.textContent =
        current + 1;

    totalElement.textContent =
        studyWords.length;

}


// ========================================
// 習得率を計算
// ========================================

function calculateMasteryRate() {

    if (words.length === 0) {
        return 0;
    }


    const masteredCount =
        words.filter(
            word => word.status === "perfect"
        ).length;


    return (
        masteredCount /
        words.length
    ) * 100;

}


// ========================================
// 次の問題
// ========================================

function nextWord() {

    if (current < studyWords.length - 1) {

        current++;

        display();

    }

}


// ========================================
// 前の問題
// ========================================

function previousWord() {

    if (current > 0) {

        current--;

        display();

    }

}


// HTMLのonclickから使えるようにする
window.previousWord = previousWord;
window.nextWord = nextWord;


// ========================================
// 理解度を記録
// ========================================

window.rate = function(level) {

    if (studyWords.length === 0) {
        return;
    }


    // ====================================
    // 1回目
    // ====================================

    if (!meaningShown) {

        // 意味を表示

        meaning.style.display = "block";

        meaningShown = true;


        console.log(
            "意味を表示:",
            studyWords[current].word
        );


        // この時点では評価を保存しない

        return;
    }


    // ====================================
    // 2回目
    // ====================================

    const currentWord =
        studyWords[current];


    // 元データの中から同じ単語を探す
    const originalWord =
        words.find(
            item => item === currentWord
        );


    // 評価を保存
    currentWord.status = level;


    // localStorageへ保存
    localStorage.setItem(
        "wordsprint_words",
        JSON.stringify(words)
    );


    // 今回のStudy結果を保存
    sessionResults[current] = level;


    console.log(
        "評価を保存:",
        currentWord.word,
        "→",
        level
    );


    // ====================================
    // 最後の問題か確認
    // ====================================

    if (current === studyWords.length - 1) {

        showResult();

        return;
    }


    // ====================================
    // 次の問題へ
    // ====================================

    nextWord();

};


// ========================================
// 結果画面
// ========================================

function showResult() {

    const studyArea =
        document.querySelector("body");


    const perfectCount =
        sessionResults.filter(
            status => status === "perfect"
        ).length;


    const unsureCount =
        sessionResults.filter(
            status => status === "unsure"
        ).length;


    const badCount =
        sessionResults.filter(
            status => status === "bad"
        ).length;


    const total =
        studyWords.length;


    const masteryRate =
        total === 0
            ? 0
            : (perfectCount / total) * 100;


    studyArea.innerHTML = `

        <header class="top-header">

            <a href="index.html">
                🏃 WordSprint
            </a>

        </header>


        <main style="
            width: min(700px, 92%);
            margin: 50px auto;
            text-align: center;
        ">

            <h1>🎉 Study Complete!</h1>

            <p>
                今回の学習が完了しました！
            </p>


            <section style="
                background: white;
                border-radius: 18px;
                padding: 30px;
                margin-top: 30px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.06);
            ">

                <h2>📊 学習結果</h2>

                <p>
                    📚 学習した単語：
                    <strong>${total}</strong>語
                </p>

                <hr>


                <p>
                    😎 完璧：
                    <strong>${perfectCount}</strong>語
                </p>

                <p>
                    🤔 あやしい：
                    <strong>${unsureCount}</strong>語
                </p>

                <p>
                    😵 全然：
                    <strong>${badCount}</strong>語
                </p>


                <hr>


                <h2>
                    習得率
                </h2>

                <p style="
                    font-size: 36px;
                    font-weight: bold;
                ">
                    ${masteryRate.toFixed(1)}%
                </p>

            </section>


            <div style="margin-top: 30px;">

                <button
                    onclick="location.reload()"
                    style="
                        padding: 12px 20px;
                        margin: 5px;
                        cursor: pointer;
                    "
                >
                    🔄 もう一度学習
                </button>


                <button
                    onclick="location.href='index.html'"
                    style="
                        padding: 12px 20px;
                        margin: 5px;
                        cursor: pointer;
                    "
                >
                    🏠 Homeへ戻る
                </button>

            </div>

        </main>

    `;

}


// ========================================
// 初期表示
// ========================================

display();


console.log(
    "Study開始:",
    studyWords.length,
    "語"
);


console.log(
    "現在の全体習得率:",
    calculateMasteryRate().toFixed(1) + "%"
);
