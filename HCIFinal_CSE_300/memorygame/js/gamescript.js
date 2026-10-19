const spanPlayer = document.querySelector(".player");
const grid = document.querySelector(".grid");
const timer = document.querySelector(".timer");
const player = localStorage.getItem("playername");
document.getElementById("playername").textContent = player;

const characters = [
    'SpadeKing',
    'ClubKing',
    'SpadeQueen',
    'ClubQueen',
    'SpadeJack',
    'ClubJack',
    'SpadeJoker',
    'ClubJoker',
];

let firstCard = "";
let secondCard = "";

const startTimer = () => {
    this.loop = setInterval(() => {
        currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    },
        1000);
};

function speakAddress(address) {
    if ('speechSynthesis' in window) {
        var speech = new SpeechSynthesisUtterance(address);
        speech.lang = 'en-US';
        window.speechSynthesis.speak(speech);
    } else {
        console.log("Speech synthesis not supported in this browser.");
    };
};

const creatElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

const creatCard = (characters) => {
    const card = creatElement('div', 'card');
    const front = creatElement('div', 'face front');
    const back = creatElement('div', 'face back');
    front.style.backgroundImage = `url('../images/${characters}.png')`;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', characters);
    return card;
};

const revealCard = (event) => {
    const target = event.target;
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        setTimeout(() => checkCards(), 2000);
    };
};

const loadGame = () => {
    const uniquecards = Number(localStorage.getItem("numbercards"));
    const cardsnum = characters.slice(0, uniquecards);
    const repeatedCards = [...cardsnum, ...cardsnum];
    const shuffledArray = repeatedCards.sort(() => Math.random() - 0.5);
    shuffledArray.forEach((characters) => {
        const card = creatCard(characters);
        grid.appendChild(card);
    });
};

let matchCount = 0;

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        matchCount = matchCount + 2;

        firstCard = "";
        secondCard = "";
        setTimeout(() => { checkendgame() }, 300);
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            firstCard = "";

            secondCard.classList.remove('reveal-card');
            secondCard = "";
        }, 1000
        );
    };
};

const checkendgame = () => {
    const totalCards = document.querySelectorAll('.card').length;
    if (matchCount === totalCards) {
        alert("You did it");
        removecard();
    }
};

window.onload = () => {
    loadGame();
    startTimer();
    speakAddress(player);
};

const removecard = () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.visibility = 'hidden';
    });
    showFireworks();
    setTimeout(() => { location.reload() }, 10000);
};

const showFireworks = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'fireworks-canvas';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const fireworks = [];
    function createFirework(x, y) {
        const particles = [];
        const numParticles = 100;
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: x,
                y: y,
                dx: Math.random() * 4 - 2,
                dy: Math.random() * 4 - 2,
                size: Math.random() * 2 + 1,
                life: Math.random() * 60 + 60,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            });
        }
        return particles;
    }
    function updateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            firework.forEach((particle, i) => {
                particle.x += particle.dx;
                particle.y += particle.dy;
                particle.size *= 0.999;
                particle.life -= 1;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                if (particle.life <= 0) {
                    firework.splice(i, 1);
                }
            });
            if (firework.length === 0) {
                fireworks.splice(index, 1);
            }
        });
        if (Math.random() < 0.1) {
            fireworks.push(createFirework(Math.random() * canvas.width, Math.random() * canvas.height));
        }
        requestAnimationFrame(updateFireworks);
    }
    updateFireworks();
    setTimeout(() => {
        fireworks.length = 0;
        canvas.remove();
        location.reload();
    }, 30000);
};