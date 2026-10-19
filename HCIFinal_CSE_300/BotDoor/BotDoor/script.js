let door1=document.getElementById("door1");
let door2=document.getElementById("door2");
let door3=document.getElementById("door3");
let startButton=document.getElementById("start");
let hintbutton=document.getElementById("hint");

let currentlyPlaying=true;
let numCloseDoors=3;
let currentStreak=document.getElementById("score-number");
let bestStreak=document.getElementById("high-score-number");
let score=0;
let highscore=0;
currentStreak.innerHTML=score;
bestStreak.innerHTML=highscore;


let botDoorPath="./images/robot.svg";
let beachDoorPath="./images/beach.svg";
let spaceDoorPath="./images/space.svg";
let closedDoorPath="./images/closed_door.svg";

let openDoor1;
let openDoor2;
let openDoor3;

const doorOpenSound=new Audio("./audio/open.mp3");

const playDoor=(door)=>{
	numCloseDoors--;
	if(numCloseDoors===0){
		gameOver("Win");
	}else if(isBot(door)){
		gameOver("Lose");
	}
};

const gameOver=(str)=>{
	if (str==="Win"){
		startButton.innerHTML="You Win!!!";
		getYourSocre();
	}else{
		startButton.innerHTML="Game Over!!!";
		score=0;
		currentStreak.innerHTML=score;
	}
	currentlyPlaying=false;
};

const getYourSocre=()=>{
		score=score+1;
		currentStreak.innerHTML=score;
		if(score>highscore){
			highscore=score;
			bestStreak.innerHTML=highscore;
		}
	
};


const isClicked=(door)=>{
	if (door.getAttribute('src')==closedDoorPath) {
		return false;
	}else{
		return true;
	}
};

const isBot=(door)=>{
if (door.getAttribute('src')==botDoorPath) {
		return true;
	}else{
		return false;
	}
	
};

door1.onclick=()=>{
	console.log("Hello, I am door 1");
	console.log(door1.getAttribute('src'));
	
	if (currentlyPlaying && !isClicked(door1)) {
		doorOpenSound.play();
		door1.src=openDoor1;
		playDoor(door1);
	}	
};


door2.onclick=()=>{
	console.log("Hello, I am door 2");
	console.log(door2.getAttribute('src'));
	
	if (currentlyPlaying && !isClicked(door2)) {
		doorOpenSound.play();
		door2.src=openDoor2;
		playDoor(door2);
	}	
};


door3.onclick=()=>{
	console.log("Hello, I am door 3");
	console.log(door3.getAttribute('src'));
	
	if (currentlyPlaying && !isClicked(door3)) {
		doorOpenSound.play();
		door3.src=openDoor3;
		playDoor(door3);
	}	
};


const randomChoreDoorGenerator = () => {
  choreDoor = Math.floor(Math.random() * 6);
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor1 = botDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 2:
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 3:
      openDoor2 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 4:
      openDoor3 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
      break;
    case 5:
      openDoor3 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor2 = beachDoorPath;
      break;
  }
}

const startRound=()=>{
  door1.src=closedDoorPath;
  door2.src=closedDoorPath;
  door3.src=closedDoorPath;
  numCloseDoors=3;
  currentlyPlaying=true;
  startButton.innerHTML="Good luck!";
  randomChoreDoorGenerator();
  hintbutton.disabled=false;
};
startButton.onclick=()=>{
  startRound();
};

startRound();

hintbutton.onclick =()=> {
	if(numCloseDoors == 3){
		hintbutton.disabled=true;
		if(openDoor1== beachDoorPath){
			alert("door 1 is Safe")
		}else if(openDoor2 == beachDoorPath){
			alert("door 2 is Safe")
		}else if(openDoor3 == beachDoorPath){
			alert("door 3 is Safe")
		}
	};
}