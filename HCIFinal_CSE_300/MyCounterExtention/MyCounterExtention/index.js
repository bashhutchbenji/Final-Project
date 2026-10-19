var valueCount = document.getElementById("count");
var descbtn = document.getElementById("desc");
var incsbtn = document.getElementById("incs");
var resetbtn = document.getElementById("reset");
var count = Number(localStorage.getItem("counter_value") || 0);
var descbtn10 = document.getElementById("desc10");
var incsbtn10 = document.getElementById("incs10");
const colors = [
  "red", "blue", "green", "purple", "orange",
  "yellow", "pink", "teal", "brown", "cyan",
  "magenta", "lime", "indigo", "violet", "gold",
  "silver", "navy", "maroon", "olive", "coral",
  "turquoise", "plum", "salmon", "chocolate", "orchid",
  "black"
];

function render() {
    valueCount.textContent = count;
    localStorage.setItem("counter_value", String(count));
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    valueCount.style.color = randomColor;
}

function increase() {
    count = count + 1;
    console.log(count);
    render();
    /*if(count > 40){
        incsbtn.disabled=true;
    }
    if (count < -40){
        descbtn.disabled=false;
    }*/
}
incsbtn.addEventListener("click", increase);

function decrease() {
    count = count - 1;
    console.log(count);
    render();
    /*if(count < -40){
        descbtn.disabled=true;
    }
    if (count > 40){
        incsbtn.disabled=false;
    }*/
}
descbtn.addEventListener("click", decrease);

function resetnum() {
    count = 0;
    console.log(count);
    render();
}
resetbtn.addEventListener("click", resetnum)

function decrease10() {
    count = count - 10;
    console.log(count);
    render();
}
descbtn10.addEventListener("click", decrease10)

function increase10() {
    count = count + 10;
    console.log(count);
    render();
}
incsbtn10.addEventListener("click", increase10)

/*function resetcolors(){
   document.getElementById("count").style.color="black";
   render
}*/