// ========================================
// WordSprint - Review
// Phase 3.2
// ========================================

console.log("review.js 読み込み成功");


// ========================================
// 保存データを取得
// ========================================

const savedData =
    localStorage.getItem("wordsprint_words");

let allWords = [];

if (savedData) {

    try {

        allWords = JSON.parse(savedData);

    } catch (error) {

        console.error(
            "単語データの読み込みに失敗しました。",
            error
        );

    }

}


// ========================================
// 復習対象を取得
// 🤔 あやしい / 😵 全然
// ========================================

const reviewWords =
    allWords.filter(word =>
        word.status === "bad" ||
        word.status === "unsure"
    );


// ========================================
// 復習単語数
// ========================================

document.getElementById("reviewTotal").textContent =
    reviewWords.length;

document.getElementById("total").textContent =
    reviewWords.length;


// ========================================
// Console確認
// ========================================

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


// ========================================
// 1回目のクリックかどうか
// ========================================

// false = 意味を見ていない
// true  = 意味を見た

let meaningShown = false;


// ========================================
// 要素取得
// ========================================

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

    if (reviewWords.length === 0) {

        wordElement.textContent =
            "復習する単語がありません";

        meaningElement.textContent = "";

        meaningElement.style.display =
            "none";

        currentElement.textContent =
            "0";

        return;
    }


    const currentWord =
        reviewWords[current];


    wordElement.textContent =
        currentWord.word || "単語なし";

    meaningElement.textContent =
        currentWord.meaning || "意味なし";


    // 意味を隠す
    meaningElement.style.display =
        "none";


    // 1回目のクリック待ち
    meaningShown = false;


    // 番号
    currentElement.textContent =
        current + 1;

}


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
// 評価
// ========================================

window.rate = function(level) {

    // 復習対象がない
    if (reviewWords.length === 0) {
        return;
    }


    // ====================================
    // 1回目
    // ====================================

    if (!meaningShown) {

        meaningElement.style.display =
            "block";

        meaningShown = true;


        console.log(
            "意味を表示:",
            reviewWords[current].word
        );


        // まだ評価は保存しない
        return;

    }


    // ====================================
    // 2回目
    // ====================================

    const currentWord =
        reviewWords[current];


    // 元データから探す
    const targetWord =
        allWords.find(
            word => word.word === currentWord.word
        );


    if (!targetWord) {

        console.log(
            "単語が見つかりません"
        );

        return;

    }


    // 評価を保存
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


    // ====================================
    // 最後の単語か確認
    // ====================================

    if (
        current ===
        reviewWords.length - 1
    ) {

        showReviewResult();

        return;

    }


    // ====================================
    // 次の単語
    // ====================================

    current++;

    displayWord();

};


// ========================================
// 結果画面
// ========================================

function showReviewResult() {

    document.body.innerHTML = `

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

            <h1>🎉 Review Complete!</h1>

            <p>
                復習が完了しました！
            </p>


            <section style="
                background: white;
                border-radius: 18px;
                padding: 30px;
                margin-top: 30px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.06);
            ">

                <h2>📚 復習した単語</h2>

                <p style="
                    font-size: 36px;
                    font-weight: bold;
                ">
                    ${reviewWords.length}語
                </p>

                <p>
                    お疲れさま！😎
                </p>

            </section>


            <div class="result-actions">

                <button
                    class="result-button primary"
                    onclick="location.reload()"
                >
                    🔄 もう一度復習
                </button>


                <button
                    class="result-button secondary"
                    onclick="location.href='index.html'"
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

displayWord();
