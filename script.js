//Player Factory
const Player = (playerName, playerSign) => {
    const getPlayerName = () => playerName
    const getPlayerSign = () => playerSign
    const getPlayerScore = () => 0 
    const getPlayerColor = () => playerColor
    return {getPlayerName, getPlayerSign, getPlayerScore, getPlayerColor}
}

//Caching DOM Elements
const DOM = (function(){
    return {
        //Player Selection Screen Elements:
        playerSelectionDiv: document.getElementById('players-selection'),
        onePlayerBtn: document.getElementById('choose-one-player'),
        twoPlayersBtn: document.getElementById('choose-two-players'),
        player1NameInput: document.getElementById('player-1-name-input'),
        player2NameInput: document.getElementById('player-2-name-input'),
        startGameBtn: document.getElementById('start-game-btn'),
        player2Label: document.getElementById('player-two'),

        //Gameboard Elements:
        cells: [...document.querySelectorAll('.cell')],
        gameBoardDiv: document.getElementById('gameboard'),
        scoresDiv: document.getElementById('scores'),
        player1NameDisplay: document.getElementById('player-1-name'),
        player2NameDisplay: document.getElementById('player-2-name'),
        player1ScoreDisplay: document.getElementById('player-1-score'),
        player2ScoreDisplay: document.getElementById('player-2-score'),

        //Endgame Screen Elements
        endGameDiv: document.getElementById('end-game-div'),
        winnerSpan: document.getElementById('winner'),
        rematchBtn: document.getElementById('rematch-btn'),
        mainMenuBtn: document.getElementById('main-menu-btn'),
        endGameMsg: document.getElementById('endgame-message'),
    }
})()

//Player selection module. Takes input on Number of Players, Player Names and Inits the Game board if input is correct.
const playerSelection = (function(){

    let numberOfPlayers = 2 //Two Players selected by Default
        
    //Event Listeners
    DOM.onePlayerBtn.addEventListener('click', selectNumberOfPlayers);
    DOM.twoPlayersBtn.addEventListener('click', selectNumberOfPlayers)
    DOM.startGameBtn.addEventListener('click', startGame)

    function selectNumberOfPlayers(e){
        e.stopPropagation()
        numberOfPlayers = parseInt(this.dataset.selection) 
        choosePlayersNames()
    }

    function choosePlayersNames(){

        //When Selecting 1 Player
        if (numberOfPlayers === 1){
            //Style Buttons
            DOM.twoPlayersBtn.classList.remove('choose-two-players-active')
            DOM.twoPlayersBtn.classList.add('blue-text')
            DOM.onePlayerBtn.classList.remove('orange-text')
            DOM.onePlayerBtn.classList.add(DOM.onePlayerBtn.id + '-active')
            //Assign and Display Random Enemy Name to PC
            assignRandomEnemyName()
            DOM.player2NameInput.style.display = 'none'
            DOM.player2Label.textContent = assignRandomEnemyName()
            
        }
        //When Selecting 2 Players
        else {
            //Style Buttons
            DOM.twoPlayersBtn.classList.add(DOM.twoPlayersBtn.id + '-active');
            DOM.twoPlayersBtn.classList.remove('blue-text');
            DOM.onePlayerBtn.classList.remove(DOM.onePlayerBtn.id + '-active');
            DOM.onePlayerBtn.classList.add('orange-text');
            //Restore Input
            DOM.player2Label.textContent = 'Player 2'
            DOM.player2NameInput.style.display = 'flex'
        }
    }

    function assignRandomEnemyName(){
        //Assigns name from Random Rick and Morty Character to PC
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
        return randomEnemy = randomEnemyArray[Math.floor(Math.random() * randomEnemyArray.length)];
       }



    function startGame(){
        //If all required Input is there, Create Players and Init Board
        if (checkInput()){
            player1Name = checkInput().player1Name
            player2Name = checkInput().player2Name
            player1 = Player(player1Name, 'o')
            player2 = Player(player2Name, 'x')
            animations.fadeOut(DOM.playerSelectionDiv)
            const newGame = true

            setTimeout(function(){gameBoard.init(newGame)},500)
        }
    }

    //Check for Input and return chosen player names 
    function checkInput(){
        let player1Name
        let player2Name

        if (!DOM.player1NameInput.value) {
            animations.inputError(DOM.player1NameInput)
            return false
        }
        
        else {
            player1Name = DOM.player1NameInput.value
            if (numberOfPlayers === 2) {

                if (!DOM.player2NameInput.value) {
                    animations.inputError(DOM.player2NameInput)
                    return false}

                else {
                    player2Name = DOM.player2NameInput.value
                }
            }
            else player2Name = DOM.player2Label.textContent   
        }
        return {player1Name, player2Name}
    }

    //Getter Functions
    const getNumberOfPlayers = () => numberOfPlayers
    const getPlayer1 = () => player1
    const getPlayer2 = () => player2  

    return {getPlayer1, getPlayer2, getNumberOfPlayers}
})();

const gameBoard = (function(){


    let player1Score = 0
    let player2Score = 0
    let lastPlayer = 2 //First player starts by default.
    let boardArray = [];

    let signsCounter = 0


function init(newGame) {

    DOM.endGameMsg.innerHTML = 'Congratulations! <span id="winner"></span> wins!'
    if (newGame) {
        player1Score = 0
        player2Score = 0
    }

    
    
    signsCounter = 0
    DOM.gameBoardDiv.style.pointerEvents = 'auto'
    DOM.cells.forEach(cell => {
        cell.classList.remove('blue-text')
        cell.classList.remove('orange-text')})
        
    boardArray = []
    lastPlayer = 2
    animations.fadeIn(DOM.gameBoardDiv, 'grid', '30rem')
    animations.fadeIn(DOM.scoresDiv, 'flex')
    scoreBoard.updateDisplayNames()
    scoreBoard.updateScores()
    renderBoard()
    // scoreBoard.updateDisplayNames()
}

//Event Listeners
DOM.cells.forEach(cell => cell.addEventListener('click', addSignToCell))

function addSignToCell(e){
    const clickedCell = e.target
    const clickedCellNumber = e.target.dataset.number
    const clickedCellContent = e.target.textContent
    // Clicking on taken Cell returns an error
    if (clickedCellContent) animations.takenCellError(clickedCell, clickedCellContent)
    
    else {
        
        if (lastPlayer ===  1){

            
            boardArray[clickedCellNumber] = playerSelection.getPlayer2().getPlayerSign()
            lastPlayer = 2
            signsCounter++
            checkForWin()
        

        }
        else {            
            boardArray[clickedCellNumber] = playerSelection.getPlayer1().getPlayerSign()
            lastPlayer = 1
            signsCounter++
            checkForWin()
            

            if (playerSelection.getNumberOfPlayers() === 1){
               
                populateBoard()
                
                addComputerSign()
                signsCounter++
                lastPlayer = 2
                checkForWin()}

            
        }
        renderBoard()
    }
}

//Adds PC Sign in Random Cell
function addComputerSign(){
   
    const emptyCellsIndexesArray = DOM.cells.map(cell => {
        if (!cell.textContent) {
            emptyCellIndex = cell.dataset.number
            return emptyCellIndex
        }
    })
    .filter(cell => {
        return cell !== undefined // Array with indexes of free cells.
    })
    randomEmptyCellIndex = Math.floor(Math.random() * emptyCellsIndexesArray.length)
    const randomEmptyCell = emptyCellsIndexesArray[randomEmptyCellIndex]
    boardArray[randomEmptyCell] = playerSelection.getPlayer2().getPlayerSign()

}

function checkForWin(){
    let sign 
    lastPlayer === 1 ? sign = 'o' : sign = 'x'
    const winningCombos = ['012', '345', '678', '048', '036', '147', '258', '246']
    winningCombos.forEach(combo => {
        let index = 0
        combo.split('').forEach(cell => {
            if (boardArray[cell] === sign) index++
        })
        if (index === 3){   

            DOM.gameBoardDiv.style.pointerEvents = 'none'
            animations.highlightWinningRow(combo, lastPlayer)
            lastPlayer === 1 ? player1Score++ : player2Score++
            scoreBoard.updateScores()
            //return the winner
            endGame.init(lastPlayer)
            return lastPlayer
            
        }
    })
}

function checkForTie(){

    let index = 0
    boardArray.forEach(cell => {
        if (cell === 'x' || cell === 'o') index++
    })
    if (index === 9 && (checkForWin() !== 1 && checkForWin() !== 2)) {
        lastPlayer = 0
        animations.highlightWinningRow('012345678', 2)
        endGame.init(lastPlayer)}
    }


function renderBoard(){
    populateBoard()
    styleBoardColors()
    if (signsCounter === 9) checkForTie()
    
}


function populateBoard(){
    let index = 0
    DOM.cells.forEach(cell => {
        cell.dataset.number = index
        cell.textContent = boardArray[index]
        index++
    })
}
function styleBoardColors(){
    DOM.cells.forEach(cell => {
        cell.removeAttribute('style')
        cell.classList.remove('blue-text')
        cell.classList.remove('orange-text')
        if (cell.textContent === 'o'){
            cell.classList.remove('blue-text');
            cell.classList.add('orange-text')
        }
        else if (cell.textContent === 'x'){
            cell.classList.remove('orange-text')
            cell.classList.add('blue-text')
        }
    })
}




const getPlayer1Score = () => player1Score
const getPlayer2Score = () => player2Score
const getLastPlayer = () => lastPlayer

return {init, getPlayer1Score, getPlayer2Score, getLastPlayer}

})()


const endGame = (function(){

    //Event Listeners
    DOM.rematchBtn.addEventListener('click', rematch)
    DOM.mainMenuBtn.addEventListener('click', mainMenu)

    function init(lastPlayer){

        DOM.winnerSpan.classList.remove('orange-text', 'blue-text')
        winnerSpan = document.getElementById('winner')
            switch(lastPlayer){
                case 1:
                    winnerSpan.textContent = playerSelection.getPlayer1().getPlayerName()
                    winnerSpan.classList.add('orange-text')
                break;
                case 2:
                    winnerSpan.textContent = playerSelection.getPlayer2().getPlayerName()
                    winnerSpan.classList.add('blue-text')
                break
                default:
                    DOM.endGameMsg.textContent = "It's a tie!"  
            }
            if (gameBoard.getLastPlayer() === 1) {
                DOM.winnerSpan.textContent = playerSelection.getPlayer1().getPlayerName()
            }
            setTimeout(function(){appear()},2000)     
    }
        function appear(){
            animations.fadeOut(DOM.gameBoardDiv)
            animations.fadeOut(DOM.scoresDiv)
            setTimeout(function(){
                animations.fadeIn(DOM.endGameDiv, 'flex', '30vh')
                animations.fadeIn(DOM.scoresDiv, 'flex')},600)     
    }

    function rematch(){
        disappear()
        setTimeout(function(){gameBoard.init(false)},600)
    }
    function mainMenu(){

        disappear()
        setTimeout(function(){animations.fadeIn(DOM.playerSelectionDiv, 'flex')},600)
        
        
    }


    function disappear(){        
        animations.fadeOut(DOM.endGameDiv)
        animations.fadeOut(DOM.scoresDiv)}

        return {init}
})()


const scoreBoard = (function(){

    
    function updateDisplayNames(){
    DOM.player1NameDisplay.textContent = playerSelection.getPlayer1().getPlayerName()
    DOM.player2NameDisplay.textContent = playerSelection.getPlayer2().getPlayerName()
    }

    function updateScores(){
        DOM.player1ScoreDisplay.textContent = gameBoard.getPlayer1Score()
        DOM.player2ScoreDisplay.textContent = gameBoard.getPlayer2Score()
    }


    return {updateDisplayNames, updateScores}
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
        cell.textContent = `🧐`;
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

