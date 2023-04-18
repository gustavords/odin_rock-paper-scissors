
let compScore = 0,
    playerScore = 0,
    tiePoints = 0,
    round = 1;

const points = [];

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
    let pS = playerSelection.toLowerCase();
    playerSelection = pS;

    switch (true) {
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
    // const roundDisplay = document.getElementById(`roundDisplay`);
    // roundDisplay.innerText = text;

    const theRound = document.getElementById(`round`);
    const compChoice = document.getElementById(`compChoice`);
    const playerChoice = document.getElementById(`playerChoice`);
    theRound.innerText = `Round: ${round.toString()}`;
    playerChoice.innerText = `Player: ${playerSelection}`;
    compChoice.innerText = `Comp: ${computerSelection}`;
    
    if(result == `tie`)appendWinner(`Result: ${result.toUpperCase()}`);
    else appendWinner(`${result.toUpperCase()} Wins Round`);

}

function game(playerSelection) {
    let points = playRound(playerSelection)[2];

    if (points == `player`) playerScore += 1;
    else if (points == `comp`) compScore += 1;
    else tiePoints += 1;
    round++;

    console.log(`compScore:${compScore}\nplayerScore:${playerScore}\ntieScore:${tiePoints}\n`);
    appendScore(`compScore:${compScore}\nplayerScore:${playerScore}\ntieScore:${tiePoints}\n`);

    //logic set for 5 rounds
    //two separate if-statements for readability
    if (tiePoints > 2 || compScore > 2 || playerScore > 2) {
        declareWinner();
    }
    else if (tiePoints == 2 && compScore == 2 || tiePoints == 2 && playerScore == 2) {
        declareWinner();
    }

    return console.log([playerScore, compScore, tiePoints]);
}

//how is this working?!?!?
//dont need to select nodes??
function declareWinner() {
    // const you_img = document.getElementByName(`you_img`);
    // const comp_img = document.getElementByName(`comp_img`);
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
    appendWinner(result);
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

    //disables options buttons
    Array.from(rps_btn).forEach((button) => {
        button.disabled = true;
        //changes color
        button.style.cssText +=
            "mix-blend-mode: difference; background-color:black;";
        button.classList.add(`class`, `nohover`);
    });
}


//TODO
function appendScore(text) {
    // const scoreBoard = document.querySelector(`#scoreDisplay`);
    // const scoreDisplay = document.getElementById(`scoreDisplay`);
    // scoreDisplay.innerText = text;

    const scoreBoard = document.getElementById(`scoreBoard`);
    scoreBoard.innerText = text;
    const scoreTable = document.getElementById(`scoreTable`);
    // scoreTable

}

function appendWinner(text) {
    // const scoreBoard = document.querySelector(`#scoreDisplay`);
    // const winnerDisplay = document.getElementById(`winnerDisplay`);
    // winnerDisplay.innerText = text;
    const winner = document.getElementById(`winner`);
    winner.innerText = text;
}











//TODO
function addRow(tableID, [], []) {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);

    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    // Insert a cell in the row at index 0
    let roundCell = newRow.insertCell(0),
        psCell = newRow.insertCell(1),
        csCell = newRow.insertCell(2)
    tsCell = newRow.insertCell(3);

    // Append a text node to the cell
    // let newText = document.createTextNode("New bottom row");
    // roundCell.appendChild(newText);
    // pcCell.appendChild(newText);
    // ccCell.appendChild(newText);
    // winnerCell.appendChild(newText);

    roundCell.innerText = round.toString();
    pcCell.innerText = "test01";
    ccCell.innerText = "test02";
}

// Call addRow() with the table's ID
// addRow("scoreTable");
// addRow("scoreTable");

// //rewriting game() for the tableScore, but not working,
function games(playerSelection) {
    let points = playRound(playerSelection)[2];
    let plScr = 0,
        coScr = 0,
        tPnt = 0,
        rds = 1;

    if (points == `player`) plScr += 1;
    else if (points == `comp`) coScr += 1;
    else tPnt += 1;

    // console.log(`coScr:${coScr}\nplScr:${plScr}\ntieScore:${tPnt}\n`);
    // appendScore(`coScr:${coScr}\nplScr:${plScr}\ntieScore:${tPnt}\n`);

    //logic set for 5 rounds
    //two separate if-statements for readability
    // if (tPnt > 2 || coScr > 2 || plScr > 2) {
    //     declareWinner();
    // }
    // else if (tPnt == 2 && coScr == 2 || tPnt == 2 && plScr == 2) {
    //     declareWinner();
    // }
    // declareWinner2();

    return points = [plScr, coScr, tPnt];
}


//rewriting game() for the tableScore, but not working,
// function declareWinner2([]) {
//     console.log(points[0]);
//     // let result = ``;
//     // if (compScore > playerScore) {
//     //     result += `comp wins game`;
//     // }
//     // else if (playerScore > compScore) {
//     //     result += `player wins game`;
//     // }
//     // else { result += `tie game, sorry` }

//     // console.log(result);
//     // appendWinner(result);
//     // gameEnd();
// }



