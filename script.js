import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";
const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');
const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');
const message = document.getElementById('resultText');
const resetBtn = document.getElementById('reset');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const playerChoice = document.getElementById('playerChoice');
const computerChoice = document.getElementById('computerChoice');
const gameContainer = document.getElementById('game-container')

const playerWeapons = [playerRock, playerPaper, playerScissors, playerLizard, playerSpock];
const computerWeapons = [computerRock, computerPaper, computerScissors, computerLizard, computerSpock];

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let myChoice;
let compyChoice;
let selected = '';
let computerSelected;
let playerPoints = 0;
let computerPoints = 0;
let gameEnded = false;

// Choosing the weapon
const chooseWeapon = (e) => {
  if (!gameEnded) {
    if (selected) {
      selected.classList.remove('selected');
      computerSelected.classList.remove('selected');
    }
    let choice = e.target.title.toLowerCase();
    myChoice = choices[choice];
    selected = e.target;
    e.target.classList.add('selected');
    playerChoice.textContent = ` --- ${selected.title}`;
    computerChooseWeapon();
    showResult(myChoice, compyChoice);
    if (playerPoints === 10 || computerPoints === 10) {
      gameEnded = true;
      message.textContent = playerPoints === 10 ? 'GG!' : 'Game over...';
      return;
    }
  }
}

// Computer chosing random weapon
const computerChooseWeapon = () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  const weaponItem = computerWeapons[getRandomInt(0, computerWeapons.length)];
  compyChoice = choices[weaponItem.title.toLowerCase()];
  computerSelected = weaponItem;
  weaponItem.classList.add('selected');
  computerChoice.textContent = ` --- ${weaponItem.title}`;
}


const showResult = (myChoice, compyChoice) => {
  if (myChoice.defeats.includes(compyChoice.name.toLowerCase())) {
    playerPoints++;
    playerScore.textContent = `${playerPoints}`;
    message.textContent = 'You won!';
  } else if (compyChoice.defeats.includes(myChoice.name.toLowerCase())) {
    computerPoints++;
    computerScore.textContent = `${computerPoints}`;
    message.textContent = 'You lost...';
  } else {
    message.textContent = 'Tie';
  }
}

// Reload the game
const reload = () => {
  if (gameEnded) {
    gameEnded = false;
    selected.classList.remove('selected');
    selected = '';
    computerSelected.classList.remove('selected');
    computerSelected = '';
    message.textContent = '';
    playerChoice.textContent = ' --- Choice';
    computerChoice.textContent = ' --- Choice';
    playerPoints = 0;
    computerPoints = 0;
    playerScore.textContent = playerPoints;
    computerScore.textContent = computerPoints;
  }
}

// Event Listeners

playerWeapons.forEach((weapon) => {weapon.addEventListener('click', chooseWeapon)});
resetBtn.addEventListener('click', reload);



