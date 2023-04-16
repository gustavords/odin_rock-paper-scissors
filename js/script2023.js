
console.log(singleRound(`rock`));
console.log(singleRound(`PAPER`));
console.log(singleRound(`scisSor`));


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

function singleRound(playerSelection, computerSelection = getComputerChoice()) {

    let winningChoice;
    let result = `player: ${playerSelection}\ncomp: ${computerSelection}\n`;
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
        result += `player (${playerSelection}) has WON.`;
    }
    else if (winningChoice == `tie`) {
        result += `player (${playerSelection}) and comp (${computerSelection}) tied.`;
    }
    else {
        result += `comp (${computerSelection}) has WON,`;
    }

    return result;

}