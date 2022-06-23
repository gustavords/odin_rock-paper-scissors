// Your game is going to play against the computer, so begin with a function called computerPlay that will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’. We’ll use this function in the game to make the computer’s play. Tip: use the console to make sure this is returning the expected output before moving to the next step!

//returns: random rock paper or scissor
function computerPlay() {
  const action = [`Rock`, `Paper`, `Scissors`];
  return action[Math.floor(Math.random() * action.length)];
}

// Write a function that plays a single round of Rock Paper Scissors. The function should take two parameters - the playerSelection and computerSelection - and then return a string that declares the winner of the round like so: "You Lose! Paper beats Rock"

//     Make your function’s playerSelection parameter case-insensitive (so users can input rock, ROCK, RocK or any other variation).

// Important note: you want to return the results of this function call, not console.log() them. You’re going to use what you return later on, so let’s test this function by using console.log to see the results:

//function for player choice through prompt
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

//returns: Winner of Round
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
//output: winner of number of rounds
//default is a round
function game(rounds = 1) {
  rounds = +rounds;
  let player = 0;
  let comp = 0;
  let tie = 0;
  let result = ``;
  let playerSelection;
  let computerSelection;
  let match;

  //just so no one can place negative numbers
  if (rounds <= 0) {
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

//for replay section
const replay_location = document.createElement(`div`);
document.querySelector(`body`).appendChild(replay_location);
replay_location.classList.add(`replay`);
const replay_placement = document.querySelector(`div.replay`);
const replay_element = document.createElement(`p`);
const replay_button = document.createElement(`button`);

let playerSelection = ``;
let computerSelection = ``;
let result = ``;
let counter = 1;
let roundWinners = [];
let points = [];

function setPlayerSelectionButton(playerSelection) {
  this.playerSelection = playerSelection;
}

function getPlayerSelectionButton() {
  return this.playerSelection;
}

function displayReplay() {
  document.querySelector(`#rock`).disabled = true;
  document.querySelector(`#paper`).disabled = true;
  document.querySelector(`#scissors`).disabled = true;
  replay_element.innerText = `Would like to replay?`;
  replay_button.innerText = "?REPLAY?";
  replay_placement.appendChild(replay_element);
  replay_placement.appendChild(replay_button);
  replay_button.addEventListener(`click`, () => {
    location.reload();
  });
}

function displayWinner() {
  result_element.innerText = result + " won the round!!!";
  result_placement.appendChild(result_element);
}

function displayRounds() {
  round_element.innerText = `${gameResults(roundWinners)}`;
  result_placement.appendChild(round_element);
}

function clearDisplay() {
  result_element.innerText = `click to play again`;
  result_placement.appendChild(result_element);
  round_element.innerText = ``;
  result_placement.appendChild(round_element);
}

function gameResults(roundWinners) {
  let roundResult = ``;
  let result = ``;
  let player = 0;
  let comp = 0;
  let tie = 0;
  let counter = 1;

  // if (roundWinners.length < 3) {
  //   console.log(`not yet, too small, array.length:${roundWinners.length}`);
  // } else {
  for (const winner of roundWinners) {
    switch (winner) {
      case "Player":
        player += 1;
        roundResult = `ROUND[${counter}] -> PLAYER: ${getPlayerSelectionButton()} vs COMP: ${computerSelection} --> WINNER: ${winner} \n`;
        break;
      case "Computer":
        comp += 1;
        roundResult = `ROUND[${counter}] -> PLAYER: ${getPlayerSelectionButton()} vs COMP: ${computerSelection} --> WINNER: ${winner} \n`;
        break;
      case "Tie":
        tie += 1;
        roundResult = `ROUND[${counter}] -> PLAYER: ${getPlayerSelectionButton()} vs COMP: ${computerSelection} --> WINNER: ${winner} \n`;
        break;
    }
    result += roundResult;
    points = [player, comp, tie]; //this lets button loop know when to end
    console.log(points);
    counter++;
  }
  ///if player or comp =2 and tie equal 2 in game of five player, auto win
  if ((player == 2 && tie == 2 && comp == 0) || (comp == 2 && tie == 2 && player == 0)) {
    console.log(`player:${player}  comp:${comp} comp or player===3 auto win`);
    if (player === 2) {
      result += `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nPLAYER IS THE WINNER`;
    } else {
      result += `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nCOMPUTER IS THE WINNER`;
    }
  }
  //since its  a game of 5 first to 3 win automatically
  if (player == 3 || comp == 3) {
    console.log(`player:${player}  comp:${comp} comp or player===3 auto win`);
    if (player === 3) {
      result += `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nPLAYER IS THE WINNER`;
    } else {
      result += `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nCOMPUTER IS THE WINNER`;
    }
  }
  //if the game goes longer than 4 rounds
  else if (roundWinners.length < 5) {
    console.log(`not yet, too small, array.length:${roundWinners.length}`);
  } else {
    if (player > comp) {
      result += `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nPLAYER IS THE WINNER`;
    } else if (player < comp) {
      result += `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nCOMPUTER IS THE WINNER`;
    } else if (player === comp) {
      result += `\nPlayer Wins: ${player} vs Comp Wins: ${comp} \nTIE, play again`;
    } else {
      result += `\nPlayer Wins: ${player} vs Comp Wins: ${comp}  Ties: ${tie}\nTIE, play again`;
    }
  }
  console.log(`player:${player}, comp:${comp}, tie:${tie}`);
  console.log(result);
  return result;
  //}
}

///where the game actually happens

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    setPlayerSelectionButton(button.id);

    //so we get a different result each time
    computerSelection = computerPlay();
    result = playRound(getPlayerSelectionButton(), computerSelection);

    roundWinners.push(result); //places winners in sequence of wins
    displayWinner();
    displayRounds();
    counter++;

    if (
      counter > 5 ||
      points[0] === 3 ||
      points[1] === 3 ||
      (points[0] === 2 && points[2] === 2) ||
      (points[1] === 2 && points[2] === 2)
    ) {
      roundWinners = [];
      counter = 1;
      displayReplay();
    }
  });
});
