// Your game is going to play against the computer, so begin with a function called computerPlay that will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’. We’ll use this function in the game to make the computer’s play. Tip: use the console to make sure this is returning the expected output before moving to the next step!

function computerPlay() {
  const action = [`Rock`, `Paper`, `Scissors`];
  return action[Math.floor(Math.random() * action.length)];
}

// Write a function that plays a single round of Rock Paper Scissors. The function should take two parameters - the playerSelection and computerSelection - and then return a string that declares the winner of the round like so: "You Lose! Paper beats Rock"

//     Make your function’s playerSelection parameter case-insensitive (so users can input rock, ROCK, RocK or any other variation).

// Important note: you want to return the results of this function call, not console.log() them. You’re going to use what you return later on, so let’s test this function by using console.log to see the results:

//function for player choice
function getPlayerSelection() {
  let action = prompt(`Rock, Paper, Scissors? `, ``);

  //if player presses cancel
  if (action === null) {
    console.log("You've pressed cancel, bye!");
    return;
  }
  //if player doesn't put in anything
  else if (action === ``) {
    console.log("You've chosen nothing, try again");
    return getPlayerSelection();
  } else {
    action = action.toUpperCase();
    if (action === "ROCK" || action === "PAPER" || action === "SCISSORS") {
      return action;
    }
    // if player writes anything besides rock paper scissors
    else {
      console.log("Must write rock, paper or scissors, try again");
      return getPlayerSelection();
    }
  }
}

//returns: Winner of round
function playRound(playerSelection = "", computerSelection = computerPlay()) {
  playerSelection = playerSelection.toUpperCase();
  computerSelection = computerSelection.toUpperCase();
  let result = ``;

  if (
    (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (playerSelection === "PAPER" && computerSelection === "ROCK") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    return (result = "Player");
  } else if (
    (playerSelection === "ROCK" && computerSelection === "PAPER") ||
    (playerSelection === "PAPER" && computerSelection === "SCISSORS") ||
    (playerSelection === "SCISSORS" && computerSelection === "ROCK")
  ) {
    return (result = "Computer");
  } else if (
    (playerSelection === "ROCK" && computerSelection === "ROCK") ||
    (playerSelection === "PAPER" && computerSelection === "PAPER") ||
    (playerSelection === "SCISSORS" && computerSelection === "SCISSORS")
  ) {
    return (result = "Tie");
  } else if (playerSelection === null || playerSelection === ``) {
    console.log("You've pressed Cancel.\nThis Round will not count.");
    return alert("You've pressed Cancel.\nThis Round will not count.");
  } else {
    return alert("Error");
  }
}

// const playerSelection = "rock";
// const computerSelection = computerPlay();
// console.log(playRound(playerSelection, computerSelection));

// Write a NEW function called game(). Call the playRound function inside of this one to play a 5 round game that keeps score and reports a winner or loser at the end.

// At this point you should be using console.log() to display the results of each round and the winner at the end.
// Use prompt() to get input from the user. Read the docs here if you need to.
// Feel free to re-work your previous functions if you need to. Specifically, you might want to change the return value to something more useful.
// Feel free to create more “helper” functions if you think it would be useful.


//input: amount of desired rounds
//second: method with 2 inputs
//output: winner of number of rounds
//default is a round
function game(rounds = 1, player = 0, comp = 0) {
  rounds = +rounds;
  player;
  comp;
  let tie = 0;
  let result = ``;
  let playerSelection;
  let computerSelection;
  let match;

  if (rounds === 1 && player > 0 && comp > 0) {
    if (player > comp) {
      result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nPLAYER IS THE WINNER`;
    } else if (player < comp) {
      result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nCOMPUTER IS THE WINNER`;
    } else if (player === comp) {
      result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp}\nTIE, play again`;
    } else {
      result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp}  Ties: ${tie}\nTIE, play again`;
    }
  }
  //just so no one can place negative numbers
  else if (rounds <= 0) {
    alert("sorry bruv play again, has to be 1 or more");
  } else {
    //plays the rounds
    for (let i = 1; i <= rounds; i++) {
      //playerSelection = prompt(`ROUND[${i}] -> Rock, Paper, Scissors? `, ``);
      playerSelection = getPlayerSelection();
      computerSelection = computerPlay();
      match = playRound(playerSelection, computerSelection);
      switch (match) {
        case "Player":
          player += 1;
          result = `ROUND[${i}] -> PLAYER: ${playerSelection} vs COMP: ${computerSelection} --> WINNER: ${match} \n`;
          console.log(result);
          break;
        case "Computer":
          comp += 1;
          result = `ROUND[${i}] -> PLAYER: ${playerSelection} vs COMP: ${computerSelection} --> WINNER: ${match} \n`;
          console.log(result);
          break;
        case "Tie":
          tie += 1;
          result = `ROUND[${i}] -> PLAYER: ${playerSelection} vs COMP: ${computerSelection} --> ${match} \n`;
          console.log(result);
          break;
      }
    }

    //determines the winner
    if (player > comp) {
      result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nPLAYER IS THE WINNER`;
    } else if (player < comp) {
      result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nCOMPUTER IS THE WINNER`;
    } else if (player === comp) {
      result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp}\nTIE, play again`;
    } else {
      result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp}  Ties: ${tie}\nTIE, play again`;
    }
  }
  console.log(result);
}

////////UI Stuff
const buttons = document.querySelectorAll("button");
const result_placement = document.querySelector("div.result");
const result_element = document.createElement("p");
const round_element = document.createElement(`p`);
let playerSelection = ``;
let result = ``;
let counter = 1;
let player = 0;
let comp = 0;
let tie = 0;
let points;

function setPlayerSelectionButton(playerSelection) {
  this.playerSelection = playerSelection;
}

function getPlayerSelectionButton() {
  return this.playerSelection;
}

function displayWinner() {
  result_element.innerText = result;
  result_placement.appendChild(result_element);
}

function displayRounds(i) {
  round_element.innerText += `ROUND[${i}]: ${result}\n`;
  result_placement.appendChild(round_element);
}


function gameWinner(points) {
  let player = points[0];
  let comp = points[1];
  let tie = points[3];
  let result = ``;
  if (player > comp) {
    result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nPLAYER IS THE WINNER`;
  } else if (player < comp) {
    result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nCOMPUTER IS THE WINNER`;
  } else if (player === comp) {
    result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nTIE, play again`;
  } else {
    result = `\nPlayer Wins: ${player} vs Comp Wins: ${comp}  Ties: ${tie}\nTIE, play again`;
  }
  return result;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    setPlayerSelectionButton(button.id);
    result = playRound(getPlayerSelectionButton());

    switch (result) {
      case "Player":
        player += 1;
        break;
      case "Computer":
        comp += 1;
        break;
      case "Tie":
        tie += 1;
        break;
    }
    displayWinner();
    displayRounds(counter);
    console.log(
      `typeof -> ${typeof getPlayerSelectionButton()} and button.id-> ${getPlayerSelectionButton()}, WINNER->${result}`
    );
    counter++;
    console.log(
      `counter:${counter}, player:${player}, comp:${comp}, tie:${tie}, point:${points}`
    );

    points = [player, comp, tie];

    if (counter > 5) {
      counter = 1;
      console.log(gameWinner(points));

      round_element.innerText += `\n${gameWinner(points)}\n`;
      result_placement.appendChild(round_element);

      player = 0;
      comp = 0;
      tie = 0;
    }
  });
});
