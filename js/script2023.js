
let compScore = 0,
    playerScore = 0,
    tiePoints = 0;

let round = 1;

let end = false;

//player[0], comp[1], tie[2]
const totalGameScore = [0, 0, 0];


const buttons = document.querySelectorAll(`button`);

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener('click', () => {
        game(button.innerText);
    });
});


function getComputerChoice() {
    let range = 3; //0,1,2
    let randomNum = Math.floor(Math.random() * range);

    switch (randomNum) {
        case 0:
            return `rock`;
        case 1:
            return `paper`;
        case 2:
            return `scissor`;
    }
}

function playRound(playerSelection, computerSelection = getComputerChoice()) {
    let winningChoice;
    let result;
    let consoleMessage = `player: ${playerSelection}\ncomp: ${computerSelection}\n`;

    switch (Boolean(playerSelection)) {
        case (playerSelection == `rock` && computerSelection == `scissor` || playerSelection == `scissor` && computerSelection == `rock`):
            winningChoice = `rock`;
            break;
        case (playerSelection == `paper` && computerSelection == `rock` || playerSelection == `rock` && computerSelection == `paper`):
            winningChoice = `paper`;
            break;
        case (playerSelection == `scissor` && computerSelection == `paper` || playerSelection == `paper` && computerSelection == `scissor`):
            winningChoice = `scissor`;
            break;
        default:
            winningChoice = `tie`;
    }

    if (playerSelection == winningChoice) {
        consoleMessage += `PLAYER (${playerSelection}) has won round.`;
        result = `player`;
    }
    else if (winningChoice == `tie`) {
        consoleMessage += `player (${playerSelection}) and comp (${computerSelection}) tied.`;
        result = `tie`;
    }
    else {
        consoleMessage += `COMP (${computerSelection}) has won round,`;
        result = `comp`;
    }

    console.log(consoleMessage);
    appendRoundResults([playerSelection, computerSelection, result]);

    return [playerSelection, computerSelection, result];
}


function appendRoundResults([playerSelection, computerSelection, result]) {
    const theRound = document.getElementById(`round`);
    const compChoice = document.getElementById(`compChoice`);
    const playerChoice = document.getElementById(`playerChoice`);

    //append text
    theRound.innerText = `Round: ${round.toString()}`;
    playerChoice.innerText = `Player: ${playerSelection}`;
    compChoice.innerText = `Comp: ${computerSelection}`;

    //add stylings
    theRound.style.cssText = `text-decoration: underline; background-color: rgba(10, 5, 14, 0.462);`
    playerChoice.style.cssText = `background-color: rgba(10, 5, 14, 0.462);`;
    compChoice.style.cssText = `background-color: rgba(10, 5, 14, 0.462);`;

    //adds round-winner text and styling
    if (result == `tie`) {
        appendWinner(`Result: ${result.toUpperCase()}`);
    }
    else {
        appendWinner(`${result.toUpperCase()} Wins Round`);
    }
}


function game(playerSelection) {
    let points = playRound(playerSelection)[2],
        //player[0], comp[1], tie[2]
        currentRoundScore = [0, 0, 0];

    if (points == `player`) {
        currentRoundScore[0] = 1;
        totalGameScore[0] += 1;
        playerScore += 1;
    }
    else if (points == `comp`) {
        currentRoundScore[1] = 1;
        totalGameScore[1] += 1;
        compScore += 1;
    }
    else {
        currentRoundScore[2] = 1;
        totalGameScore[2] += 1;
        tiePoints += 1;
    }

    //using separate variables for the point 
    // console.log(`playerScore:${playerScore}\ncompScore:${compScore}\ntieScore:${tiePoints}\n`);
    // appendScore([playerScore, compScore, tiePoints]);

    console.log(`currentRoundScore[0]player:${currentRoundScore[0]}\n
    currentRoundScore[1]comp:${currentRoundScore[1]}\n
    currentRoundScore[2]tie:${currentRoundScore[2]}\n`);

    console.log(`totalGameScore[0]player:${totalGameScore[0]}\n
    totalGameScore[1]comp:${totalGameScore[1]}\n
    totalGameScore[2]tie:${totalGameScore[2]}\n`);

    appendScore(currentRoundScore, totalGameScore);

    round++;

    fiveRounds();
  
    console.log([playerScore, compScore, tiePoints])
    return [totalGameScore[0], totalGameScore[1], totalGameScore[2]];
}

/**
 * Win logic of a 5 Round of Rock Paper Scissors game
 * placed into its on function for easier altering later on
 * using variables since its more readable than totalGameScore array
 * 
 TODO: change this for any number of rounds
 */
function fiveRounds(){
    if (tiePoints > 2 || compScore > 2 || playerScore > 2) {
        declareWinner();
    }
    else if (tiePoints == 2 && compScore == 2 || tiePoints == 2 && playerScore == 2) {
        declareWinner();
    }
    else if (playerScore == 2 && compScore == 2 && tiePoints == 1) {
        declareWinner();
    }
}

function appendScore(currentScore, totalScore) {
    let totalPlayerScr = totalScore[0],
        totalCompScr = totalScore[1],
        totalTiePts = totalScore[2];

    addRow(`scoreTable`, currentScore);

    const smallScoreBoard = document.getElementById(`smallScoreBoard`);
    smallScoreBoard.innerText = `playerScore:${totalPlayerScr}\tcompScore:${totalCompScr}\ttieScore:${totalTiePts}\n`;
}

function addRow(tableID, roundStats) {
    // let roundStat = array;
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);

    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    // Insert a cell in the row at index 0
    let roundCell = newRow.insertCell(0),
        psCell = newRow.insertCell(1),
        csCell = newRow.insertCell(2),
        tsCell = newRow.insertCell(3);

    // Fills tag with string
    end ? roundCell.innerText = `total:*` : roundCell.innerText = `${round.toString()} *`;
    psCell.innerText = `${roundStats[0]}`;
    csCell.innerText = `${roundStats[1]}`;
    tsCell.innerText = `${roundStats[2]}`;
}

function declareWinner() {
    const you_img = document.getElementsByName(`you_img`)[0];
    const comp_img = document.getElementsByName(`comp_img`)[0];
    let result = ``;

    if (compScore > playerScore) {
        result += `Comp Wins Game`;
        you_img.style.cssText +=
            "mix-blend-mode: difference; background-color:black;";
        comp_img.style.cssText = "background-color:yellow;";
    }
    else if (playerScore > compScore) {
        result += `Player Wins Game`;
        you_img.style.cssText = "background-color:yellow;";
        comp_img.style.cssText +=
            "mix-blend-mode: difference; background-color:black;";
    }
    else {
        result += `Tie Game`;
        you_img.style.cssText +=
            "mix-blend-mode: difference; background-color:black;";
        comp_img.style.cssText +=
            "mix-blend-mode: difference; background-color:black;";
    }

    console.log(result);

    //appends winner and changes color
    const winner = document.getElementById(`winner`);
    winner.innerText = result;
    winner.style.cssText = `background-color: rgba(255, 0, 0, 0.82);
    font-size:28px;`;

    //append last total score row here
    end = true;
    addRow(`scoreTable`, totalGameScore);

    gameEnd();
}

function gameEnd() {
    const box = document.getElementById(`endGame`);
    const btn = document.createElement(`button`);
    const rps_btn = document.getElementsByClassName(`rps_btn`);

    btn.setAttribute(`id`, `replay_btn`);
    btn.textContent = `Replay?`
    box.appendChild(btn);

    //reloads page
    btn.addEventListener(`click`, () => {
        location.reload();
    });

    //disables rps buttons
    Array.from(rps_btn).forEach((button) => {
        button.disabled = true;
        //changes color
        button.style.cssText +=
            "mix-blend-mode: difference; background-color:black;";
        button.classList.add(`class`, `nohover`);
    });
}

//TODO
//maybe create other function just for the end winner, this is for round winner
function appendWinner(text) {
    const winner = document.getElementById(`winner`);
    winner.innerText = text;
    winner.style.cssText = `background-color: rgba(255, 108, 0, 0.24);`;
}
