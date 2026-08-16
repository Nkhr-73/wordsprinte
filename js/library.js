// ========================================
// WordSprint - Library
// ========================================

console.log("library.js 読み込み成功");


// ===== 保存されている単語を取得 =====

const savedData =
    localStorage.getItem("wordsprint_words");

const words =
    savedData ? JSON.parse(savedData) : [];


// ===== 単語数 =====

console.log("保存されている単語数:", words.length);


// ===== 習得率 =====

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


// ===== 実行 =====

displayMasteryRate();
