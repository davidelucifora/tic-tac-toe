//Player Factory
const Player = (playerName, playerSign) => {
    const getPlayerName = () => playerName
    const getPlayerSign = () => playerSign

    return {getPlayerName, getPlayerSign}
}

const playerSelection = (function(){
        let numberOfPlayers
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

    function startGame(){}

    function selectPlayer(e){
        e.stopPropagation()
        //Assign Number of Players
        numberOfPlayers = parseInt(this.dataset.selection)
        numberOfPlayers === 1 ? choosePcPlayer() : chooseTwoPlayers();
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
        return randomEnemy
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
        if (playerOneInput.value){
            playerOneName = playerOneInput.value
        
            if (getNumberOfPlayers() === 1){
                playerTwoName = playerTwoLabel.textContent   
            }
            else if (getNumberOfPlayers() === 2){
                if (!playerTwoInput.value) {
                    playerTwoInput.style.border = '1px solid var(--red-salsa)'
                    setTimeout(function(){playerTwoInput.style.border = 'none'}, 2000)
                }
                playerTwoName = playerTwoInput.value
            }
            else {
                startGameButton.textContent = 'Choose number of Players!'
                setTimeout(function(){
                    startGameButton.textContent = 'Play'}, 1000)
    }
        }
        else {
            playerOneInput.style.border = '1px solid var(--red-salsa)'
            setTimeout(function(){
                playerOneInput.style.border = 'none'}, 2000)
}
        
    }

function startGame(){
    assignPlayersNames()
    animations.fadeOut(playerSelectionDiv)
    setTimeout(function(){gameBoard.appear()}, 400) 
    
}

const getPlayerOneName = () => playerOneName
const getPlayerTwoName = () => playerTwoName

    //Getter Function for number of Players
    const getNumberOfPlayers = () => numberOfPlayers
    
    //Return 1 or 2 depending on selection
    return {getNumberOfPlayers, getPlayerOneName, getPlayerTwoName}

})();

const gameBoard = (function(){
    const boardArray = [
        '', '', '', 
        '', '', '',
        '', '', ''];

    const domElements =  {
        cells: [...document.querySelectorAll('.cell')]
    }

    function appear(){
        const gameBoardDiv = document.getElementById('gameboard');
        const scoresDiv = document.getElementById('scores');
        animations.fadeIn(gameBoardDiv, 'grid', '30rem')
        animations.fadeIn(scoresDiv, 'flex')
        gameBoard.renderBoard()
    }

    function renderBoard() {
        populateBoard()
    }

    function populateBoard() {
        let index = 0
        domElements.cells.forEach(cell => {
            //Assign unique incremental ID
            cell.id = 'cell-' + index;
            //Display sign from boardArray to cell.
            cell.textContent = boardArray[index]
            styleCell(cell)
            index++;
        })
    }

    function styleCell(cell) {
        //Changes color based on cell content
        if (cell.textContent === 'o') cell.classList.add('orange-text')
        else cell.classList.add('blue-text');

    }
    return {appear, renderBoard}
})();

const animations = (function(){
    function fadeOut(element){
        element.style.opacity = '1'
        element.style.transition = 'all linear 0.2s'
        element.style.opacity = '0'
        setTimeout(function(){element.style.display = 'none'}, 300)
    }
    
    function fadeIn(element, display, height){
        element.style.display = display || 'block'
        setTimeout(function(){element.style.opacity = '1'
        element.style.height = height || 'auto';}, 50)
        

    }
    return {fadeOut, fadeIn}
})()

// Choose between one player or two player

// OK FIRST WE NEED TO GET THE PLAYER TO CHOOSE HIS NAME AND SIGN. THIS WILL ASSIGN HIM A COLOR.
// THEN THE BOARD WILL APPEAR, THE PLAYER WILL PUT HIS MARK SOMEWHERE WHICH MEANS:
// WHEN HE CLICKS TO A CELL WITH A CERTAIN ID, WE GET THE NUMBER OF THAT CELL AND PLACE THAT SIGN IN THE ARRAY POSITION
// WE THEN LOCK THE CELL AND MAKE IT UNCLICKABLE AGAIN. 
// 