// function to set first mode of night mode or day mode
const time = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
});
const onlyClock = time.slice(0, 2);
if (onlyClock >= 20 || onlyClock <= 15) {
    localStorage.setItem("mode", "night");
    document.getElementById("theme-selector").setAttribute('href', 'Assets/CSS/index-night.css');
    //    document.querySelector("body").classList.toggle("body-night");
    //    document.querySelector(".main-body").classList.toggle("main-body-night");
    //    document.querySelector(".title").classList.toggle("title-night");
    //    document.querySelector(".sub-title").classList.toggle("sub-title-night");
}

// function to change mode by clicks
document.getElementById("change-theme").addEventListener("click", function () {
    document.querySelector("body").classList.toggle("body-night");
    document.querySelector(".main-body").classList.toggle("main-body-night");
    document.querySelector(".title").classList.toggle("title-night");
    document.querySelector(".sub-title").classList.toggle("sub-title-night");
    for (const p of paragraph) {
        p.classList.toggle("p-night");
    }
    for (const head of headers) {
        head.classList.toggle("header-night");
    }
    let mode = localStorage.getItem("mode");
    if (mode === "night") {
        localStorage.setItem("mode", "day");
    }
    else if (mode === "day") {
        localStorage.setItem("mode", "night");
    }
})