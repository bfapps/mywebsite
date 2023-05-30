let qid = 1;
let definition = "";
let pronunciation = "";
let example = "";
let wordText = "";
let exampleText ="";
let defCheck = false;
let pronunciationCheck = false;
let exampleCheck = false;
// setting this is important 30
//let topNumber = 20;

// show definition

document.getElementsByClassName("definition")[0].addEventListener("click", function () {
    setdefinition();
})
function setdefinition() {
    if (defCheck === false) {
        defCheck = true;
        definition = document.getElementById(qid).innerText;
        document.getElementById("answer").innerText = definition;
    }
    else {
        defCheck = false;
        document.getElementById("answer").innerText = "?";
    }
    pronunciationCheck = false;
    exampleCheck = false;
}

// show pronunciation 
document.getElementsByClassName("pronunciation")[0].addEventListener("click", function () {
    setpronunciation();
})
function setpronunciation() {
    if (pronunciationCheck === false) {
        pronunciationCheck = true;
        pronunciation = document.getElementById(qid).getAttribute("pronunciation");
        document.getElementById("answer").innerText = pronunciation;
    }
    else {
        pronunciationCheck = false;
        document.getElementById("answer").innerText = "?";
    }
    defCheck = false;
    exampleCheck = false;
}

// Show example pronunciation
document.getElementsByClassName("example")[0].addEventListener("click", function () {
    setexample();
})
function setexample() {
    if (exampleCheck === false) {
        exampleCheck = true;
        // example = document.getElementById(qid).getAttribute("example");
        example = document.getElementById(qid).getAttribute("ep");
        document.getElementById("answer").innerText = example;
    }
    else {
        exampleCheck = false;
        document.getElementById("answer").innerText = "?";
    }
    defCheck = false;
    pronunciationCheck = false;
}

// next and previous btn
document.getElementById("next-page").addEventListener("click", function () {
    if (qid <= topNumber - 1) {
        qid = qid + 1;
    }
    else {
        qid = 1;
    }
    pagechanger();
})

document.getElementById("previous-page").addEventListener("click", function () {
    if (qid >= 2) {
        qid = qid - 1;
    }
    else {
        qid = topNumber;
    }
    pagechanger();
})

function pagechanger() {
    exampleText = document.getElementById(qid).getAttribute("example");
    document.getElementById("example-text").innerText = exampleText;
    wordText = document.getElementById(qid).getAttribute("name");
    document.getElementById("word").innerText = qid + ". " + wordText;
    document.getElementById("answer").innerText="?";
    defCheck = false;
    pronunciationCheck = false;
    exampleCheck = false;
} 