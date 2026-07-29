alert("library.js読み込み成功！");
// 保存された単語帳を取得

const savedWords = JSON.parse(
    localStorage.getItem("wordsprint_words")
) || [];


// 表示場所

const library = document.getElementById("library");


// 単語帳がない場合

if (savedWords.length === 0) {

    library.innerHTML =
        "<p>単語帳がありません。</p>";

}


// 単語帳がある場合

else {

    library.innerHTML = `

        <h2>📘 英単語帳</h2>

        <p>
            単語数：${savedWords.length}語
        </p>

        <button>
            学習する
        </button>

    `;

}


// Console確認

console.log(savedWords);
