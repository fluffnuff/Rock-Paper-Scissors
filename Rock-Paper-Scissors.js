let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
    winStreak: 0
};

updateScoreElement();

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose :(';
        } else if (computerMove === 'paper') {
            result = 'You win :)';
        } else if (computerMove === 'scissors') {
            result = 'Tie...';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win :)';
        } else if (computerMove === 'paper') {
            result = 'Tie...';
        } else if (computerMove === 'scissors') {
            result = 'You lose :(';
        }
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie...';
        } else if (computerMove === 'paper') {
            result = 'You lose :(';
        } else if (computerMove === 'scissors') {
            result = 'You win :)';
        }
    }

    if (result === 'You win :)') {
        score.wins ++;
        score.winStreak ++;
    } else if (result === 'You lose :(') {
        score.losses ++;
        resetStreak();
    } else if (result === 'Tie...') {
        score.ties ++;
        resetStreak();
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-player-move').innerHTML = `You <img src= "images/${playerMove}-emoji.png" class="move-icon">`;
    document.querySelector('.js-computer-move').innerHTML = `Computer <img src= "images/${computerMove}-emoji.png" class="move-icon">`;
}

function resetStreak() {
    score.winStreak = 0;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}, Win Streak: ${score.winStreak}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';
    
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}

function move(parameter) {
    playGame(parameter);
    updateScoreElement();
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    score.winStreak = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-player-move').innerHTML = '';
    document.querySelector('.js-computer-move').innerHTML = '';
}