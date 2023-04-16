
// console.log(playRound(`rock`));
// console.log(playRound(`PAPER`));
// console.log(playRound(`scisSor`));
game();

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
        consoleMessage += `player (${playerSelection}) has WON.`;
        result = `player`;
    }
    else if (winningChoice == `tie`) {
        consoleMessage += `player (${playerSelection}) and comp (${computerSelection}) tied.`;
        result = `tie`;
    }
    else {
        consoleMessage += `comp (${computerSelection}) has WON,`;
        result = `comp`;
    }

    console.log(consoleMessage);

    return result;

}

function game() {
    let compScore = 0,
        playerScore = 0,
        tiePoints = 0,
        playerSelection = ``;

    let x = 0
    while (x < 5) {
        playerSelection = prompt(`Type in either: Rock, Paper or Scissor`, ``);
        // if(playerSelection === null || playerSelection == `` || playerSelection == undefined){
        //     playerSelection = prompt(`Try Again\nType in either: Rock, Paper or Scissor`, ``);
        // }
        let points = playRound(playerSelection);
        
        if(points == `player`) playerScore += 1;
        else if(points == `comp`) compScore += 1;
        else tiePoints += 1;
        console.log(`compScore:${compScore}\nplayerScore:${playerScore}\ntieScore:${tiePoints}\n`);
        x++;
    }
}

