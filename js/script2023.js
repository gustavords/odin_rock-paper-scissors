
let compScore = 0,
    playerScore = 0,
    tiePoints = 0;

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
    appendRound(consoleMessage);

    return result;
}

function game(playerSelection) {
    let points = playRound(playerSelection);

    if (points == `player`) playerScore += 1;
    else if (points == `comp`) compScore += 1;
    else tiePoints += 1;

    //why does the switch not work??
    // switch (points = true) {
    //     case (points == `player`):
    //         playerScore += 1;
    //         break;
    //     case (points == `comp`):
    //         compScore += 1;
    //         break;
    //     default:
    //         tiePoints += 1;
    // }

    console.log(`compScore:${compScore}\nplayerScore:${playerScore}\ntieScore:${tiePoints}\n`);
    appendScore(`compScore:${compScore}\nplayerScore:${playerScore}\ntieScore:${tiePoints}\n`);

    //logic set for 5 rounds
    //two separate if-statements for readability
    if (tiePoints > 2 || compScore > 2 || playerScore > 2) {
        scoreTally();
    }
    else if (tiePoints == 2 && compScore == 2 || tiePoints == 2 && playerScore == 2) {
        scoreTally();
    }
    
    //messes up for some reason
    // if (tiePoints > 2 || compScore > 2 || playerScore > 2 
    //     || tiePoints == 2 && compScore == 2 || tiePoints == 2 && playerScore == 2) {
    //     scoreTally();
    // }

}

function scoreTally() {
    let result = ``;
    if (compScore > playerScore) {
        result += `comp wins game`;
    }
    else if (playerScore > compScore) {
        result += `player wins game`;
    }
    else { result += `tie game, sorry` }

    console.log(result);
    appendWinner(result);
    gameEnd();
}

function gameEnd() {
    const box = document.getElementById(`endGame`);
    const btn = document.createElement(`button`);
    btn.setAttribute(`id`, `replay_btn`);
    btn.textContent = `Replay?`
    box.appendChild(btn);

    //reloads page
    btn.addEventListener(`click`, () => {
        location.reload();
    });

    //disables options
    buttons.forEach((button) => {
        button.disabled = true;
    });
}

function appendRound(text) {
    const roundDisplay = document.getElementById(`roundDisplay`);
    roundDisplay.innerText = text;
}

function appendScore(text) {
    // const scoreBoard = document.querySelector(`#scoreDisplay`);
    const scoreDisplay = document.getElementById(`scoreDisplay`);
    scoreDisplay.innerText = text;
}

function appendWinner(text) {
    // const scoreBoard = document.querySelector(`#scoreDisplay`);
    const winnerDisplay = document.getElementById(`winnerDisplay`);
    winnerDisplay.innerText = text;
}

//buttons

// const btn = document.querySelector('#btn');
// btn.addEventListener('click', function (e) {
//   console.log(e.target);
// });

const buttons = document.querySelectorAll(`button`);

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {

    // and for each one we add a 'click' listener
    button.addEventListener('click', () => {
        // console.log(button.id);
        // console.log(button.innerText);
        // playRound(button.innerText);
        game(button.innerText);
    });
});



