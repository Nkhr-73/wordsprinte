// ========================================
// WordSprint - Library
// Phase 3.3
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
// 評価名
// ========================================

function getStatusText(status) {

    if (status === "perfect") {
        return "😎 完璧";
    }

    if (status === "unsure") {
        return "🤔 あやしい";
    }

    if (status === "bad") {
        return "😵 全然";
    }

    return "⚪ 未評価";

}


// ========================================
// Unitフィルターを作成
// ========================================

function createUnitFilter() {

    const unitFilter =
        document.getElementById("unitFilter");

    if (!unitFilter) {
        return;
    }


    // Unitを取得
    const units =
        [...new Set(
            words
                .map(word => word.unit)
                .filter(unit => unit !== undefined && unit !== "")
        )];


    // 数字として並べる
    units.sort((a, b) =>
        Number(a) - Number(b)
    );


    units.forEach(unit => {

        const option =
            document.createElement("option");

        option.value = unit;

        option.textContent =
            "📚 Unit " + unit;

        unitFilter.appendChild(option);

    });

}


// ========================================
// 単語を表示
// ========================================

function displayLibrary(filteredWords = words) {

    const library =
        document.getElementById("library");


    const resultCount =
        document.getElementById("resultCount");


    if (!library) {
        console.log(
            "library要素がありません"
        );

        return;
    }


    // 件数表示
    if (resultCount) {

        resultCount.textContent =
            filteredWords.length;

    }


    // 単語がない場合
    if (filteredWords.length === 0) {

        library.innerHTML = `
            <p class="loading">
                条件に一致する単語がありません。
            </p>
        `;

        return;
    }


    // HTMLを作成
    library.innerHTML =
        filteredWords.map(word => {

            const statusText =
                getStatusText(word.status);


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

                        ${
                            word.unit
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
        filteredWords.length,
        "語"
    );

}


// ========================================
// フィルター
// ========================================

function applyFilters() {

    const searchInput =
        document.getElementById("searchInput");

    const unitFilter =
        document.getElementById("unitFilter");

    const statusFilter =
        document.getElementById("statusFilter");


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedUnit =
        unitFilter
            ? unitFilter.value
            : "all";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const filteredWords =
        words.filter(word => {

            // ==========================
            // 単語検索
            // ==========================

            const matchesSearch =
                !searchText ||
                (word.word || "")
                    .toLowerCase()
                    .includes(searchText);


            // ==========================
            // Unit
            // ==========================

            const matchesUnit =
                selectedUnit === "all" ||
                String(word.unit) ===
                    String(selectedUnit);


            // ==========================
            // 評価
            // ==========================

            let matchesStatus = true;


            if (selectedStatus === "unrated") {

                matchesStatus =
                    !word.status;

            } else if (selectedStatus !== "all") {

                matchesStatus =
                    word.status === selectedStatus;

            }


            return (
                matchesSearch &&
                matchesUnit &&
                matchesStatus
            );

        });


    displayLibrary(filteredWords);

}


// ========================================
// イベント
// ========================================

const searchInput =
    document.getElementById("searchInput");

const unitFilter =
    document.getElementById("unitFilter");

const statusFilter =
    document.getElementById("statusFilter");

const resetFilters =
    document.getElementById("resetFilters");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        applyFilters
    );

}


if (unitFilter) {

    unitFilter.addEventListener(
        "change",
        applyFilters
    );

}


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        applyFilters
    );

}


if (resetFilters) {

    resetFilters.addEventListener(
        "click",
        function () {

            if (searchInput) {
                searchInput.value = "";
            }

            if (unitFilter) {
                unitFilter.value = "all";
            }

            if (statusFilter) {
                statusFilter.value = "all";
            }

            applyFilters();

        }
    );

}


// ========================================
// 実行
// ========================================

createUnitFilter();

displayMasteryRate();

displayLibrary();
