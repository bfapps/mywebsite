// function to change mode by clicks
document.getElementById("change-theme").addEventListener("click", function () {
    let mode = localStorage.getItem("mode");
    if (mode === "night") {
        localStorage.setItem("mode", "day");
        document.getElementById("theme-selector").setAttribute('href', '../../../Assets/CSS/index.css');
    }
    else if (mode === "day") {
        localStorage.setItem("mode", "night");
        document.getElementById("theme-selector").setAttribute('href', '../../../Assets/CSS/index-night.css');
    }
})