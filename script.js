//Player Factory
const Player = (playerName, playerSign) => {
    const getPlayerName = () => playerName
    const getPlayerSign = () => playerSign
    const getPlayerScore = () => 0 
    return {getPlayerName, getPlayerSign, getPlayerScore}
}



const playerSelection = (function(){
        let numberOfPlayers = 2
        let playerOneName = ''
        let playerTwoName = ''

    //Dom Elements for Player Choice
    const playerSelectionDiv = document.getElementById('players-selection');
    const onePlayerButton = document.getElementById('choose-one-player');
    const twoPlayersButton = document.getElementById('choose-two-players');
    const playerOneInput = document.getElementById('player-1-name-input');
    const playerTwoInput = document.getElementById('player-2-name-input');
    const startGameButton = document.getElementById('start-game-btn');
    const playerTwoLabel = document.getElementById('player-two')
        
    // Event Listeners
    onePlayerButton.addEventListener('click', selectPlayer);
    twoPlayersButton.addEventListener('click', selectPlayer)
    startGameButton.addEventListener('click', startGame)

    function selectPlayer(e){
        e.stopPropagation()
        //Assign Number of Players
        numberOfPlayers = parseInt(this.dataset.selection)
        numberOfPlayers === 1 ? choosePcPlayer() : chooseTwoPlayers();
        return numberOfPlayers
    }

    //When Selecting One Player vs PC
    function choosePcPlayer() {
        //Style Buttons
        twoPlayersButton.classList.remove('choose-two-players-active')
        twoPlayersButton.classList.add('blue-text')
        onePlayerButton.classList.remove('orange-text')
        onePlayerButton.classList.add(onePlayerButton.id + '-active')

        //Assign random name to PC
        const randomEnemyArray = ["Abandoned Jerry", "Amish Cyborg", 
            "Arcade Alien","Big-Head Morty",
            "Birdperson","Buttmouth",
            "Calypso",
            "Coach Feratu",
            "Dr. Glip-Glop",
            "Duck with Muscles",
            "Evil Beth Clone",
            "Helium-Q",
            "Hemorrhage",
            "Hologram Rick",
            "Jan-Michael Vincent",
            "King Flippy Nips",
            "Maximums Rickimus",
            "Mr. Meeseeks",
            "Mr. Poopybutthole",
            "Pickle Rick",
            "Reverse Giraffe",
            "Schlami",
            "Scroopy Noopers",
            "Scropon",
            "Scrotians",
            "Shleemypants",
            "Shmlamantha Shmlicelli",
            "Shnoopy Bloopers",
            "Shrimp Rick",
            "Snuffles",
            "Squanchy",
            "Squeeb",
            "Stealy",
            "Talking Cat",
            "Teacher Rick",
            "Testicle Monster",
            "Unity",
            "Unmuscular Michaels"]

        const randomEnemy = randomEnemyArray[Math.floor(Math.random() * randomEnemyArray.length)];
            //Remove Input and Display Random CPU Enemy
        playerTwoInput.style.display = 'none'
        playerTwoLabel.innerText = randomEnemy
    }
    //When Selecting 2 Players
    function chooseTwoPlayers(){
        //Style Buttons
        twoPlayersButton.classList.add(twoPlayersButton.id + '-active');
        twoPlayersButton.classList.remove('blue-text');
        onePlayerButton.classList.remove(onePlayerButton.id + '-active');
        onePlayerButton.classList.add('orange-text');
        //Restore Input
        playerTwoLabel.textContent = 'Player 2'
        playerTwoInput.style.display = 'flex'
    }

    function assignPlayersNames(){
        
        //Make sure player name was inserted

        if (!playerOneInput.value) {
            animations.inputError(playerOneInput)
            return false
        }   
        else playerOneName = playerOneInput.value

        //Check number of Players Selection
    switch (getNumberOfPlayers()){

        case 1:
            playerTwoName = playerTwoLabel.textContent
        return true
        
        case 2:
            if (!playerTwoInput.value) animations.inputError(playerTwoInput)
            else playerTwoName = playerTwoInput.value  
        return true
        default:

        return false
    }
}
function startGame(){
    if (assignPlayersNames()){
        player1 = Player(playerOneName, 'o')
        player2 = Player(playerTwoName, 'x')
        animations.fadeOut(playerSelectionDiv)
        setTimeout(function(){gameBoard.appear()}, 400) 
    }
    else {
        startGameButton.textContent = 'Select number of Players'
        setTimeout(function(){startGameButton.textContent = 'Play!'},800)
    }
}
    //Getter Functions
    const getNumberOfPlayers = () => numberOfPlayers
    const getPlayer1Name = () => player1.getPlayerName()
    const getPlayer2Name = () => player2.getPlayerName()
    const getPlayer1Sign = () => player1.getPlayerSign()
    const getPlayer2Sign = () => player2.getPlayerSign()
    
    return {getNumberOfPlayers, getPlayer1Name, getPlayer2Name, getPlayer1Sign, getPlayer2Sign, playerSelectionDiv}

})();

const gameBoard = (function(){
    const boardArray = [
        '', '', '', 
        '', '', '',
        '', '', ''];


        const cells = [...document.querySelectorAll('.cell')]


    const gameBoardDiv = document.getElementById('gameboard');
    const scoresDiv = document.getElementById('scores');
    const endGameDiv = document.getElementById('end-game-div')

    let lastPlayer = 2
    let player1Score = 0
    let player2Score = 0

    cells.forEach(cell => {
        cell.addEventListener('click', addSignToBoard)
    })

    function appear(){
        animations.fadeIn(gameBoardDiv, 'grid', '30rem')
        animations.fadeIn(scoresDiv, 'flex')
        gameBoard.renderBoard()
        scoreBoard.updateDisplayNames()
    }

    function addSignToBoard(e){
        const currentCell = e.target
        const currentCellNumber = currentCell.dataset.number
        if (currentCell.textContent) {
            animations.takenCellError(currentCell, currentCell.textContent)
        }
        else{
        switch (checkTurn()){
            case 1:
                boardArray[currentCellNumber] = player1.getPlayerSign()
                e.target.style.color = 'var(--red-salsa)'
            break

            case 2:
                boardArray[currentCellNumber] = player2.getPlayerSign()
                e.target.style.color = 'var(--turquoise-blue)'
            break
            
        }
        lastPlayer === 2 ? lastPlayer = 1 : lastPlayer = 2
        renderBoard()
    }
}

    function checkTurn(){ 
        if (lastPlayer === 2)  {
            scoreBoard.playerTwoNameDisplay.style.borderBottom = 'none'
            scoreBoard.playerOneNameDisplay.style.borderBottom = '1px solid var(--red-salsa)'
            return 1}
        else {
            scoreBoard.playerOneNameDisplay.style.borderBottom = 'none'
            scoreBoard.playerTwoNameDisplay.style.borderBottom = '1px solid var(--turquoise-blue)'
            return 2}
    }


    function renderBoard() {
        checkTurn()
        populateBoard()
        checkWin(lastPlayer)
        scoreBoard.updateScores()
    }

    function populateBoard() {
        let index = 0
        cells.forEach(cell => {
            //Assign unique incremental ID
            cell.dataset.number = index;
            //Display sign from boardArray to cell.
            cell.textContent = boardArray[index]
            index++;
        })
    }



function checkWin(lastPlayer) {
const winningCombos = ['012', '345', '678', '048', '036', '147', '258', '246']
    let sign
lastPlayer === 1 ? sign = 'o' : sign = 'x'

winningCombos.forEach(combo => {
    let index = 0
    combo.split('').forEach(cell => {
        cell = parseInt(cell)
    if (sign === boardArray[cell]) index++
    });
    if (index === 3) {
        animations.highlightWinningRow(combo, lastPlayer)
        if (lastPlayer === 1) {
            player1Score++

        }
        else{
            player2Score++
        }
    setTimeout(function(){endGame(lastPlayer)},2000)
    }
});
}

function endGame(lastPlayer){

    animations.fadeOut(gameBoardDiv)
    animations.fadeOut(scoresDiv)
    setTimeout(function(){
        animations.fadeIn(endGameDiv, 'flex', '30vh')
        animations.fadeIn(scoresDiv, 'flex')},600)
    const winnerSpan = document.getElementById('winner')
    const rematchBtn = document.getElementById('rematch-btn')
    const mainMenuBtn = document.getElementById('main-menu-btn')
    winnerSpan.textContent = `${lastPlayer === 1 ? player1.getPlayerName() : player2.getPlayerName()}`
    
    rematchBtn.addEventListener('click', rematch)
    mainMenuBtn.addEventListener('click', goToMainMenu)
}

function rematch(){
    clearEndGameDiv()
    setTimeout(function(){appear()},600)

}

function goToMainMenu(){
    clearEndGameDiv()
    player1Score = 0
    player2Score = 0
    const mainMenu = playerSelection.playerSelectionDiv
    setTimeout(function(){
        animations.fadeIn(mainMenu, 'flex')
},600)
}

function clearEndGameDiv(){
    boardArray.length = 0
    animations.fadeOut(endGameDiv)
    animations.fadeOut(scoresDiv)
}


    const getPlayer1Score = () => player1Score
    const getPlayer2Score = () => player2Score


    return {appear, renderBoard, getPlayer1Score, getPlayer2Score}
    
})();

const scoreBoard = (function(){

    const playerOneNameDisplay = document.getElementById('player-1-name')
    const playerTwoNameDisplay = document.getElementById('player-2-name')
    const playerOneScoreDisplay = document.getElementById('player-1-score');
    const playerTwoScoreDisplay = document.getElementById('player-2-score');
    
    function updateDisplayNames(){
    playerOneNameDisplay.textContent = playerSelection.getPlayer1Name()
    playerTwoNameDisplay.textContent = playerSelection.getPlayer2Name()
}

    function updateScores(){
        playerOneScoreDisplay.textContent = gameBoard.getPlayer1Score()
        playerTwoScoreDisplay.textContent = gameBoard.getPlayer2Score()

    }

    return {updateDisplayNames, updateScores, playerOneNameDisplay, playerTwoNameDisplay}
})()

//Animations module
const animations = (function(){
    function fadeOut(element){
        element.style.opacity = '1'
        element.style.transition = 'all linear 0.2s'
        element.style.opacity = '0'
        setTimeout(function(){element.style.display = 'none'}, 300)
    }
    
function highlightWinningRow(combo, lastPlayer){
    let color = ''
    lastPlayer === 1 ? color = 'var(--red-salsa)' : color = 'var(--turquoise-blue)' 
    combo.split('').forEach(cell => {
        const domCell = document.querySelector(`[data-number='${cell}']`)
        let i = 0
        let blink = setInterval(function(){
            if (i === 2) clearInterval(blink)
        domCell.style.backgroundColor = color
        domCell.style.color = '#666'
        setTimeout(function(){
            domCell.style.backgroundColor = '';
            domCell.style.color = color
        },250)
    i++   
    console.log(i)
    },500)
    });
}

    function fadeIn(element, display, height){
        element.style.display = display || 'block'
        setTimeout(function(){element.style.opacity = '1'
        element.style.height = height || 'auto';}, 50)
    
    }
    function inputError(element){
    element.style.border = '1px solid var(--red-salsa)';
    setTimeout(function(){
        element.style.border = 'none'}, 2000)
}

    function takenCellError(cell, value){
        cell.textContent = '🧐  ';
        setTimeout(function(){
            cell.textContent = value
        }, 500)
    }
return {fadeOut, fadeIn, inputError, takenCellError, highlightWinningRow}
})()


// Choose between one player or two player


// THEN THE BOARD WILL APPEAR, THE PLAYER WILL PUT HIS MARK SOMEWHERE WHICH MEANS:
// WHEN HE CLICKS TO A CELL WITH A CERTAIN ID, WE GET THE NUMBER OF THAT CELL AND PLACE THAT SIGN IN THE ARRAY POSITION
// WE THEN LOCK THE CELL AND MAKE IT UNCLICKABLE AGAIN. 
// 

