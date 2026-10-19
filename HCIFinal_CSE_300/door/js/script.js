const drimg = document.getElementById("doorimage");
const imgs = ["./images/Starcat.gif", "./images/Cat1.jpg", "./images/bg.gif",
     "./images/stardog.gif", "./images/galaxydog.jpg", "./images/spacedog.gif"]
let imgnum = 0;

function imageSwitch() {
    imgnum = (imgnum + 1) % imgs.length;
    drimg.src = imgs[imgnum];
}

const imgbtn = document.getElementById("imgbutton").addEventListener("click", imageSwitch);