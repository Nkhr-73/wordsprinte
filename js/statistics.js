// ========================================
// WordSprint - Statistics
// ========================================


// ===== データ取得 =====

const savedData =
    localStorage.getItem("wordsprint_words");

const words =
    savedData
        ? JSON.parse(savedData)
        : [];


// ===== 基本データ =====

const totalWords = words.length;

const perfectWords =
    words.filter(word => word.status === "perfect");

const unsureWords =
    words.filter(word => word.status === "unsure");

const badWords =
    words.filter(word => word.status === "bad");

const studiedWords =
    words.filter(word => word.status);

const unratedWords =
    words.filter(word => !word.status);


// ===== 数値 =====

const masteryRate =
    totalWords === 0
        ? 0
        : (perfectWords.length / totalWords) * 100;


const progressRate =
    totalWords === 0
        ? 0
        : (studiedWords.length / totalWords) * 100;


// ========================================
// 基本統計を表示
// ========================================

document.getElementById("totalWords").textContent =
    totalWords;

document.getElementById("studiedWords").textContent =
    studiedWords.length;

document.getElementById("unratedWords").textContent =
    unratedWords.length;

document.getElementById("masteryRate").textContent =
    masteryRate.toFixed(1);

document.getElementById("perfectCount").textContent =
    perfectWords.length;

document.getElementById("unsureCount").textContent =
    unsureWords.length;

document.getElementById("badCount").textContent =
    badWords.length;

document.getElementById("progressRate").textContent =
    progressRate.toFixed(1);


// ========================================
// Unit別統計
// ========================================

function createUnitStats() {

    const unitStats =
        document.getElementById("unitStats");

    const units = {};


    // Unitごとに分類
    words.forEach(word => {

        const unit =
            word.unit || "未分類";


        if (!units[unit]) {

            units[unit] = {
                total: 0,
                perfect: 0,
                unsure: 0,
                bad: 0
            };

        }


        units[unit].total++;


        if (word.status === "perfect") {
            units[unit].perfect++;
        }

        if (word.status === "unsure") {
            units[unit].unsure++;
        }

        if (word.status === "bad") {
            units[unit].bad++;
        }

    });


    unitStats.innerHTML = "";


    // Unitを並べる
    Object.keys(units)
        .sort((a, b) => Number(a) - Number(b))
        .forEach(unit => {

            const data = units[unit];


            const rate =
                data.total === 0
                    ? 0
                    : (data.perfect / data.total) * 100;


            const div =
                document.createElement("div");


            div.innerHTML = `
                <h3>Unit ${unit}</h3>

                <p>
                    総単語数：
                    ${data.total}語
                </p>

                <p>
                    😎 ${data.perfect}語
                    ／
                    🤔 ${data.unsure}語
                    ／
                    😵 ${data.bad}語
                </p>

                <p>
                    習得率：
                    ${rate.toFixed(1)}%
                </p>

                <hr>
            `;


            unitStats.appendChild(div);

        });

}


// ========================================
// 苦手単語
// ========================================

function createWeakWords() {

    const weakWords =
        document.getElementById("weakWords");


    const weak =
        words.filter(
            word =>
                word.status === "bad" ||
                word.status === "unsure"
        );


    if (weak.length === 0) {

        weakWords.textContent =
            "復習が必要な単語はありません！";

        return;

    }


    weakWords.innerHTML = "";


    weak.forEach(word => {

        const div =
            document.createElement("div");


        let statusText = "";


        if (word.status === "bad") {
            statusText = "😵 全然";
        }

        if (word.status === "unsure") {
            statusText = "🤔 あやしい";
        }


        div.textContent =
            `${word.word} — ${word.meaning} (${statusText})`;


        weakWords.appendChild(div);

    });

}


// ========================================
// 習得済み単語
// ========================================

function createMasteredWords() {

    const masteredWords =
        document.getElementById("masteredWords");


    if (perfectWords.length === 0) {

        masteredWords.textContent =
            "まだ習得した単語はありません。";

        return;

    }


    masteredWords.innerHTML = "";


    perfectWords.forEach(word => {

        const div =
            document.createElement("div");


        div.textContent =
            `${word.word} — ${word.meaning}`;


        masteredWords.appendChild(div);

    });

}


// ========================================
// 実行
// ========================================

createUnitStats();

createWeakWords();

createMasteredWords();

console.log("Statistics loaded");

console.log("総単語数:", totalWords);

console.log("習得率:", masteryRate.toFixed(1) + "%");s
