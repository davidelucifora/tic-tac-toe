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
    let player1
    let player2
        
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
            player1 = Player(player1Name, 'x')
            player2 = Player(player2Name, 'o')
            animations.fadeOut(DOM.playerSelectionDiv)
            setTimeout(function(){gameBoard.init()},500)
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

    const numberOfPlayers = playerSelection.getNumberOfPlayers()
    let currentPlayer = playerSelection.getPlayer1()

    let boardArray = [
        '', 'x', 'o', 
        '', '', '',
        '', '', ''];


function init() {
    animations.fadeIn(DOM.gameBoardDiv, 'grid', '30rem')
    animations.fadeIn(DOM.scoresDiv, 'flex')
    renderBoard()
    // scoreBoard.updateDisplayNames()
}

//Event Listeners
DOM.cells.forEach(cell => cell.addEventListener('click', addSignToCell))

function addSignToCell(e){
    const clickedCell = e.target
    const clickedCellNumber = e.target.dataset.number
    const clickedCellContent = e.target.textContent
    if (clickedCellContent) animations.takenCellError(clickedCell, clickedCellContent)

    else {
        boardArray[clickedCellNumber] = 'x'
    renderBoard()
    }

}



function renderBoard(){
    populateBoard()
}
function populateBoard(){
    let index = 0
    DOM.cells.forEach(cell => {
        cell.dataset.number = index
        cell.textContent = boardArray[index]
        cell.textContent === 'o' ? cell.classList.add('orange-text') : cell.classList.add('blue-text')
        index++
    })
}



return {init}

})()
        //     let lastPlayer = 2
//     let player1Score = 0
//     let player2Score = 0

//     function addSignToBoard(e){
//         const currentCell = e.target
//         const currentCellNumber = currentCell.dataset.number
        
//         if (currentCell.textContent) {
//             animations.takenCellError(currentCell, currentCell.textContent)
//         }

//         else{

//             if(playerSelection.getNumberOfPlayers() === 2){

//             if (checkTurn() === 1){
//                 boardArray[currentCellNumber] = player1.getPlayerSign()
//             }

//             else{
//                 boardArray[currentCellNumber] = player2.getPlayerSign()
//             }
        
       
//         }

//     else {

//             boardArray[currentCellNumber] = player1.getPlayerSign()
//             e.target.style.color = 'var(--red-salsa)'
//             addRandomSign()

//     }

//     lastPlayer === 2 ? lastPlayer = 1 : lastPlayer = 2
//     renderBoard()   

// }
// }

// function addRandomSign(){
//     let emptyCellsArray = []
// for (let i = 0; i < boardArray.length; i++){
//     if (boardArray[i] === '') emptyCellsArray.push(i)
// }
// const randomEmptyCell = emptyCellsArray[Math.floor(Math.random() * emptyCellsArray.length)]
// boardArray[randomEmptyCell] = player2.getPlayerSign()
// }

//     function checkTurn(){ 
//         if (lastPlayer === 2)  {
//             scoreBoard.playerTwoNameDisplay.style.borderBottom = 'none'
//             scoreBoard.playerOneNameDisplay.style.borderBottom = '1px solid var(--red-salsa)'
//             return 1}
//         else {
//             scoreBoard.playerOneNameDisplay.style.borderBottom = 'none'
//             scoreBoard.playerTwoNameDisplay.style.borderBottom = '1px solid var(--turquoise-blue)'
//             return 2}
//     }


//     function renderBoard() {
//         checkWin(lastPlayer)
//         populateBoard() 
//         checkTurn()
//         scoreBoard.updateScores()
//     }

//     function populateBoard() {
//         let index = 0
//         cells.forEach(cell => {
//             //Assign unique incremental ID
//             cell.dataset.number = index;
//             //Display sign from boardArray to cell.
//             cell.textContent = boardArray[index]
//             cell.textContent === 'o' ? cell.style.color = 'var(--red-salsa)' : cell.style.color = 'var(--turquoise-blue)'
//             index++;
//         })
//     }



// function checkWin(lastPlayer) {
// const winningCombos = ['012', '345', '678', '048', '036', '147', '258', '246']
//     let sign
// lastPlayer === 1 ? sign = 'o' : sign = 'x'
// console.log(sign)

// winningCombos.forEach(combo => {
//     let index = 0
//     combo.split('').forEach(cell => {
//         cell = parseInt(cell)
//     if (sign === boardArray[cell]) index++
//     });
//     if (index === 3) {
//         lockBoard()
//         animations.highlightWinningRow(combo, lastPlayer)
//         if (lastPlayer === 1) {
//             player1Score++

//         }
//         else{
//             player2Score++
//         }
//     setTimeout(function(){endGame(lastPlayer)},2000)
//     }
// });
// }

// function lockBoard(){
//     gameBoardDiv.style.pointerEvents = 'none'
//     setTimeout(function(){gameBoardDiv.style.pointerEvents = 'auto'}, 2400)
// }

// function endGame(lastPlayer){

//     animations.fadeOut(gameBoardDiv)
//     animations.fadeOut(scoresDiv)
//     setTimeout(function(){
//         animations.fadeIn(endGameDiv, 'flex', '30vh')
//         animations.fadeIn(scoresDiv, 'flex')},600)
//     const winnerSpan = document.getElementById('winner')
//     const rematchBtn = document.getElementById('rematch-btn')
//     const mainMenuBtn = document.getElementById('main-menu-btn')
//     const endGameMsg = document.getElementById('endgame-message')
    
//     if (lastPlayer === 1){
//         winnerSpan.textContent = player1.getPlayerName()
//         winnerSpan.style.color = 'var(--red-salsa)'
//     }
//     else if (lastPlayer === 2) {
//     winnerSpan.textContent = player2.getPlayerName()
//     winnerSpan.style.color = 'var(--turquoise-blue)'
// }
//     else {
//         endGameMsg.textContent === 'It\'s a tie!';
//     }
//     rematchBtn.addEventListener('click', rematch)
//     mainMenuBtn.addEventListener('click', goToMainMenu)
// }

// function rematch(){
//     clearEndGameDiv()
//     setTimeout(function(){appear()},600)

// }

// function goToMainMenu(){
//     clearEndGameDiv()
//     player1Score = 0
//     player2Score = 0
//     const mainMenu = playerSelection.playerSelectionDiv
//     setTimeout(function(){
//         animations.fadeIn(mainMenu, 'flex')
// },600)
// }

// function clearEndGameDiv(){
//     boardArray = ['', '', '', 
//     '', '', '', 
//     '', '', '', ]
//     animations.fadeOut(endGameDiv)
//     animations.fadeOut(scoresDiv)
// }


//     const getPlayer1Score = () => player1Score
//     const getPlayer2Score = () => player2Score


//     return {appear, renderBoard, getPlayer1Score, getPlayer2Score}
    
// })();

// const scoreBoard = (function(){

//     const playerOneNameDisplay = document.getElementById('player-1-name')
//     const playerTwoNameDisplay = document.getElementById('player-2-name')
//     const playerOneScoreDisplay = document.getElementById('player-1-score');
//     const playerTwoScoreDisplay = document.getElementById('player-2-score');
    
//     function updateDisplayNames(){
//     playerOneNameDisplay.textContent = player1.getPlayerName()
//     playerTwoNameDisplay.textContent = player2.getPlayerName()
// }

//     function updateScores(){
//         playerOneScoreDisplay.textContent = gameBoard.getPlayer1Score()
//         playerTwoScoreDisplay.textContent = gameBoard.getPlayer2Score()

//     }

//     return {updateDisplayNames, updateScores, playerOneNameDisplay, playerTwoNameDisplay}


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

