// ===== 確認用 =====
console.log("study.js読み込み成功");


// ===== 単語データ =====

const words = [

    {
        word: "abandon",
        meaning: "捨てる・見捨てる",
        status: null
    },

    {
        word: "accurate",
        meaning: "正確な",
        status: null
    },

    {
        word: "obtain",
        meaning: "得る",
        status: null
    }

];


// ===== 現在位置 =====

let current = 0;


// ===== 要素取得 =====

const word = document.getElementById("word");
const meaning = document.getElementById("meaning");


// ===== 表示 =====

function display(){

    word.textContent = words[current].word;

    meaning.textContent = words[current].meaning;

    meaning.style.display = "none";


    document.getElementById("current").textContent =
        current + 1;

    document.getElementById("total").textContent =
        words.length;

}


// ===== 答え表示 =====

document.getElementById("showMeaning").onclick = () => {

    meaning.style.display = "block";

};


// ===== 次へ =====

function nextWord(){

    if(current < words.length - 1){

        current++;

        display();

    }

}


// ===== 前へ =====

function previousWord(){

    if(current > 0){

        current--;

        display();

    }

}


// ===== 評価 =====

window.rate = function(level){

    words[current].status = level;


    console.log(
        "評価:",
        words[current].word,
        level
    );


    nextWord();

};


// ===== 初期表示 =====

display();
