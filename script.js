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
const rounds_display = document.querySelector(`.rounds`);
const buttons = document.querySelectorAll("button");
const result_placement = document.querySelector("div.result");
const result_element = document.createElement("p");
const round_element = document.createElement(`div`);

//for winner of round section
// const winnerImage_element = document.createElement(`img`);
const winnerImage_element = document.querySelector(`.result > img`); ///CHANGE NAME

//for replay section
const replay_placement = document.querySelector(`div.replay`);
const replay_element = document.createElement(`p`);
const replay_button = document.createElement(`button`);

let playerSelection = ``;
let computerSelection = ``;
let result = ``;
let counter = 1;

//cannot be constant as they will reload
let roundWinners = [];
let playerSelectionChoices = [];
let computerSelectionChoices = [];
let points = [];

function setPlayerSelectionButton(playerSelection) {
  this.playerSelection = playerSelection;
}

function getPlayerSelectionButton() {
  return this.playerSelection;
}

function displayReplay() {
  //disables options buttons
  document.querySelector(`#rock`).disabled = true;
  document.querySelector(`#paper`).disabled = true;
  document.querySelector(`#scissors`).disabled = true;

  //changes color
  document.querySelector(`#rock`).style.cssText =
    "mix-blend-mode: difference; background-color:black;";
  document.querySelector(`#paper`).style.cssText =
    "mix-blend-mode: difference; background-color:black;";
  document.querySelector(`#scissors`).style.cssText =
    "mix-blend-mode: difference; background-color:black;";

  //cancels hover
  document.querySelector(`#rock`).setAttribute(`class`, `nohover`);
  document.querySelector(`#paper`).setAttribute(`class`, `nohover`);
  document.querySelector(`#scissors`).setAttribute(`class`, `nohover`);

  //creates replay button
  replay_element.innerText = `Would you like to replay?`;
  replay_button.innerText = "REPLAY?";
  replay_placement.appendChild(replay_element);
  replay_placement.appendChild(replay_button);
  replay_button.addEventListener(`click`, () => {
    location.reload();
  });
}

function displayWinner() {
  if (result === "Computer") {
    winnerImage_element.setAttribute(`src`, `../images/computer.png`);
    winnerImage_element.setAttribute(`alt`, `computer.png`);
    result_element.innerText = result + " won the round!!!";
  } else if (result === "Player") {
    winnerImage_element.setAttribute(`src`, `../images/you.png`);
    winnerImage_element.setAttribute(`alt`, `you.png`);
    result_element.innerText = result + " won the round!!!";
  } else {
    winnerImage_element.setAttribute(`src`, `../images/tie_game.png`);
    winnerImage_element.setAttribute(`alt`, `tie_game.png`);
    result_element.innerText = result + " boohoo try again!!";
  }
  result_placement.appendChild(result_element);
}

function displayRounds() {
  let display = `<tr><th>Round</th> <th>Player Choice</th> <th>Computer Choice</th> <th>Winner of Round</th> </tr>`;

  for (let i = 0; i < roundWinners.length; i++) {
    display += `    <tr><td>${i + 1}</td>  <td>${
      playerSelectionChoices[i]
    }</td>  <td>${computerSelectionChoices[i]} </td> <td>${
      roundWinners[i]
    }</td> </tr>`;
  }
  round_element.innerHTML = `<table> ${display}</table> </br>${gameResults(
    roundWinners
  )}</br> `;
  rounds_display.appendChild(round_element);
}

function displayFinalResult() {
  let finalResult = gameResults(roundWinners);

  if (finalResult.match("COMPUTER IS THE WINNER")) {
    winnerImage_element.setAttribute(`src`, `../images/computer.png`);
    winnerImage_element.setAttribute(`alt`, `computer.png`);
    result_placement.style.cssText = "background-color: gold;"
    finalResult = "COMPUTER HAS WON THE GAME";
  } else if (finalResult.match("PLAYER IS THE WINNER")) {
    winnerImage_element.setAttribute(`src`, `../images/you.png`);
    winnerImage_element.setAttribute(`alt`, `you.png`);
    result_placement.style.cssText = "background-color: gold;"
    finalResult = "PLAYER HAS WON THE GAME";
  } else {
    winnerImage_element.setAttribute(`src`, `../images/tie_game.png`);
    winnerImage_element.setAttribute(`alt`, `tie_game.png`);
    result_placement.style.cssText = "background-color: lightblue;"
    finalResult = "ITS A TIE";
  }
  result_element.innerText = finalResult;
  result_placement.appendChild(result_element);
}

function gameResults(roundWinners) {
  // let roundResult = ``;
  let result = ``;
  let player = 0;
  let comp = 0;
  let tie = 0;
  let counter = 1;

  //loops through winner results to determine points
  for (const winner of roundWinners) {
    switch (winner) {
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

    points = [player, comp, tie]; //this lets button loop know when to end, its resets every iteration
    console.log(`points[]:${points}`);
    counter++;
  }

  ///if player or comp =2 and tie equal 2 in game of five player, auto win
  if (
    (player == 2 && tie == 2 && comp == 0) ||
    (comp == 2 && tie == 2 && player == 0)
  ) {
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
  // console.log(`player:${player}, comp:${comp}, tie:${tie}`);
  // console.log(result);
  return result;
  //}
}

///where the game actually happens
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    //player's play
    setPlayerSelectionButton(button.id);
    playerSelectionChoices.push(getPlayerSelectionButton());

    //computers' play
    computerSelection = computerPlay();
    computerSelectionChoices.push(computerSelection);

    //where results are evaluated
    result = playRound(getPlayerSelectionButton(), computerSelection);
    roundWinners.push(result); //places winners in sequence of wins

    //dynamically displayed into page
    displayWinner();
    displayRounds();
    counter++; //to know when to end the 5 rounds

    //when to replay and reset
    if (
      counter > 5 ||
      points[0] === 3 ||
      points[1] === 3 ||
      (points[0] === 2 && points[2] === 2) ||
      (points[1] === 2 && points[2] === 2)
    ) {

      displayFinalResult();
      roundWinners = [];
      playerSelectionChoices = [];
      computerSelectionChoices = [];
      counter = 1;
      displayReplay();
    }
  });
});
