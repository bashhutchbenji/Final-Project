const state = document.getElementById("status");
const board = document.getElementById("board");
let cells = [];
let boardstate = Array(9).fill(null);
let currentplayer = "X";
const singleplayer = document.getElementById("singleplayer");


function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function checkwin() {
    function same3(i, j, k) {
        return boardstate[i] && boardstate[i] == boardstate[j] && boardstate[j] == boardstate[k];
    }
    if (same3(0, 1, 2) || same3(3, 4, 5) || same3(6, 7, 8) || same3(0, 3, 6)
        || same3(1, 4, 7) || same3(2, 5, 8) || same3(0, 4, 8) || same3(2, 4, 6)) {
        return true;
    }
}

function disableboard() {
    cells.forEach(cell => cell.removeEventListener("click", handleMove));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (!boardstate[index]) {
        boardstate[index] = currentplayer;
        event.target.textContent = currentplayer;
        if (checkwin()) {
            state.textContent = `Player ${currentplayer} wins`;
            disableboard();
            return;
        }
        if (boardstate.every(cell => cell)) {
            state.textContent = "It was a draw";
            return;
        }
    }
    currentplayer = currentplayer === "X" ? "O" : "X";
    state.textContent = `Player ${currentplayer} turn`;

    if (singleplayer.style.backgroundColor === "blue" && currentplayer === "O") {
        state.textContent = "Single Player Mode!"
        aimove();
    }
}

async function aimove() {
    let emptyCells = [];
for (let i = 0; i < cells.length; i++) {
  if (cells[i].textContent === "") {
    emptyCells.push(i);
  }
}   
    let chosencell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    await sleep(750);
    cells[chosencell].click();
}

singleplayer.addEventListener("click", player1);

function player1() {
    singleplayer.style.backgroundColor = singleplayer.style.backgroundColor
        === "blue" ? "white" : "blue";
    if (singleplayer.style.backgroundColor === "blue") {
        singleplayer.style.color = "white";
        singleplayer.style.borderColor = "yellow";
    } else {
        singleplayer.style.color = "blue";
        singleplayer.style.borderColor = "black";
    }
}

createBoard();

function resetGame() {
    cells = [];
    boardstate = Array(9).fill(null);
    currentplayer = "X";
    state.textContent = `Player ${currentplayer} turn`;
    createBoard();
}