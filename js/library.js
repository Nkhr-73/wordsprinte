// ========================================
// WordSprint - Library
// ========================================

console.log("library.js 読み込み成功");


// ========================================
// 保存されている単語を取得
// ========================================

const savedData =
    localStorage.getItem("wordsprint_words");

const words =
    savedData ? JSON.parse(savedData) : [];

console.log(
    "保存されている単語数:",
    words.length
);


// ========================================
// 習得率
// ========================================

function displayMasteryRate() {

    const masteryElement =
        document.getElementById("masteryRate");

    if (!masteryElement) {
        return;
    }


    if (words.length === 0) {

        masteryElement.textContent =
            "習得率：0.0%";

        return;
    }


    const masteredCount =
        words.filter(
            word => word.status === "perfect"
        ).length;


    const rate =
        (masteredCount / words.length) * 100;


    masteryElement.textContent =
        "習得率：" + rate.toFixed(1) + "%";

}


// ========================================
// 単語を表示
// ========================================

function displayLibrary() {

    const library =
        document.getElementById("library");


    if (!library) {
        console.log("library要素がありません");
        return;
    }


    // 単語がない場合
    if (words.length === 0) {

        library.innerHTML =
            '<p class="loading">単語が登録されていません。</p>';

        return;
    }


    // HTMLを作成

    library.innerHTML =
        words.map((word, index) => {

            let statusText =
                "未評価";

            if (word.status === "perfect") {
                statusText = "😎 完璧";
            }

            if (word.status === "unsure") {
                statusText = "🤔 あやしい";
            }

            if (word.status === "bad") {
                statusText = "😵 全然";
            }


            return `
                <div class="library-card">

                    <div class="library-word">
                        ${word.word || "単語なし"}
                    </div>

                    <div class="library-meaning">
                        ${word.meaning || "意味なし"}
                    </div>

                    <div class="library-info">

                        ${word.partOfSpeech || ""}

                        ${word.unit
                            ? "・ Unit " + word.unit
                            : ""
                        }

                        ・ ${statusText}

                    </div>

                </div>
            `;

        }).join("");


    console.log(
        "Libraryに表示:",
        words.length,
        "語"
    );

}


// ========================================
// 実行
// ========================================

displayMasteryRate();

displayLibrary();
