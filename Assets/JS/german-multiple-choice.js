let qid = 1;
let btnNumber = 0;
let answer = "";
let clickedBtn = 0;
let questionText = "";
let questionName = "";
// set this to top number
// let topNumber = 33;
document.querySelectorAll(".answer-btn")[0].addEventListener("click", function () {
    btnNumber = 1;
    check();
});
document.querySelectorAll(".answer-btn")[1].addEventListener("click", function () {
    btnNumber = 2;
    check();
});
document.querySelectorAll(".answer-btn")[2].addEventListener("click", function () {
    btnNumber = 3;
    check();
});
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
function check() {
    answer = document.getElementById(qid).getAttribute("name");
    clickedBtn = "a" + btnNumber;
    if (btnNumber == answer) {
        document.getElementById(clickedBtn).style.backgroundColor = "#34c759";
        document.getElementById(clickedBtn).style.color = "white";
    }
    else {
        document.getElementById(clickedBtn).style.backgroundColor = "#ff3b30";
        document.getElementById(clickedBtn).style.color = "white";
    }
}

function pagechanger() {
    clearAll();
    questionText = document.getElementById(qid).innerText;
    questionName = document.getElementById(qid).getAttribute("name");
    document.getElementById("question").innerText = questionText;
    document.getElementById("question").setAttribute("name", questionName);
}
function clearAll() {
    document.querySelectorAll(".answer-btn")[0].style.backgroundColor = "#f2f2f2";
    document.querySelectorAll(".answer-btn")[1].style.backgroundColor = "#f2f2f2";
    document.querySelectorAll(".answer-btn")[2].style.backgroundColor = "#f2f2f2";
    document.querySelectorAll(".answer-btn")[0].style.color = "black";
    document.querySelectorAll(".answer-btn")[1].style.color = "black";
    document.querySelectorAll(".answer-btn")[2].style.color = "black";
}