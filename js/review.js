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
