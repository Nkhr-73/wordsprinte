const words=[

{
word:"abandon",
meaning:"捨てる・見捨てる",
status:null
},

{
word:"accurate",
meaning:"正確な",
status:null
},

{
word:"obtain",
meaning:"得る",
status:null
}

];

let current=0;

const word=document.getElementById("word");
const meaning=document.getElementById("meaning");

function display(){

    word.textContent=words[current].word;

    meaning.textContent=words[current].meaning;

    meaning.style.display="none";

    document.getElementById("current").textContent=current+1;

    document.getElementById("total").textContent=words.length;

    document.getElementById("progress").style.width=
    ((current+1)/words.length)*100+"%";

}

document.getElementById("showMeaning").onclick=()=>{

    meaning.style.display="block";

}

function nextWord(){

    if(current<words.length-1){

        current++;

        display();

    }

}

function previousWord(){

    if(current>0){

        current--;

        display();

    }

}

function rate(level){

    words[current].status = level;

    console.log(words[current]);

    nextWord();

}

}

display();
