const input = document.getElementById("testing");
const loginbutton = document.querySelector(".login__button");
const loginform = document.querySelector(".login-form");
const cardnum = document.getElementById("cardnum");

const validinput = (event) => {
    const target = event.target;
    if (target.value.length > 3) {
        cardnum.addEventListener('input', validnum);
    } else {
        loginbutton.disabled = true;
    };
};

const handlesubmit = (event) => {
    localStorage.setItem("playername", input.value);
    localStorage.setItem("numbercards", cardnum.value);
    window.location.assign("./html/gameindex.html");
    event.preventDefault();
};

const validnum = (action) => {
    const target = action.target;
    if (target.value > 0 && target.value <9) {
        loginbutton.disabled = false;
    } else {
        loginbutton.disabled = true;
    };
};

input.addEventListener('input', validinput);
loginform.addEventListener('submit', handlesubmit);