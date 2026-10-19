var wheel = document.getElementById("wheel");
var spinBtn = document.getElementById("spinBtn");
var result = document.getElementById("result");
var coloroptions = document.querySelectorAll('#coloroptions input[type="checkbox"]');

var info = {
    Red: "love",
    Orange: "warm",
    Yellow: "happiness",
    Green: "growth",
    Blue: "sadness",
    Purple: "cool",
    Pink: "nice",
    White: "clean",
    Black: "mysterious",
    Grey: "dull"
};

var names = getSelectedColors();
var total = 0;
var current = 0;
var slice = 360 / names.length;
var picked = 0;

function getSelectedColors() {
    return Array.from(coloroptions)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
}

function updateWheel() {
    names = getSelectedColors();
    slice = 360 / names.length;
    let angle = 0;
    let segments = names.map(name => {
        let start = angle;
        let end = angle + slice;
        angle = end;
        return `${name.toLowerCase()} ${start}deg ${end}deg`;
    }).join(',');

    wheel.style.background = `conic-gradient(${segments})`;
}

function mode360(x) {
    var r = x % 360;
    return r < 0 ? (r + 360) : r;
}

function centerAngle(i) {
    return i * slice + slice / 2;
}

spinBtn.onclick = function () {
    names = getSelectedColors();
    if (names.length === 0) {
        result.textContent = "Please select at least one color.";
        return;
    }

    slice = 360 / names.length;
    picked = Math.floor(Math.random() * names.length);
    var target = centerAngle(picked);
    var basedelta = mode360(360 - target - current);

    var spins = (Math.floor(Math.random() * 3) + 3) * 360;
    total = total + basedelta + spins;
    current = mode360(total);

    result.textContent = "Spinning...";
    spinBtn.disabled = true;
    wheel.style.transition = "transform 4s ease-out";
    wheel.style.transform = "rotate(" + total + "deg)";
};

wheel.addEventListener("transitionend", function () {
    var colorname = names[picked];
    result.textContent = colorname + ": " + info[colorname];
    spinBtn.disabled = false;
});

coloroptions.forEach(cb => cb.addEventListener('change', updateWheel));

updateWheel();