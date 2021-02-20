//Player Factory
const Player = (playerName, playerSign) => {
    const getPlayerName = () => playerName
    const getPlayerSign = () => playerSign
    const getColor = () => {
        if (getPlayerSign() === 'o') return 'orange'
        else return 'blue'
    }
    return {getPlayerName, getPlayerSign, getColor}
}



const chooseNumberOfPlayers = (function(){

        let numberOfPlayers

        const choiceModule = document.getElementById('choose-number-of-players');
        const onePlayerButton = document.getElementById('choose-one-player')
        const twoPlayersButton = document.getElementById('choose-two-players')

    onePlayerButton.addEventListener('click', selectPlayer);
    twoPlayersButton.addEventListener('click', selectPlayer)

    function selectPlayer(e){
        choiceModule.style.opacity = '0'
        setTimeout(function(){choiceModule.remove()}, 400)
        e.stopPropagation()
        numberOfPlayers = this.dataset.selection
        getNumberOfPlayers()
    }

    const getNumberOfPlayers = () => numberOfPlayers

    return {getNumberOfPlayers}

})();

const gameBoard = (function(){
    const boardArray = [
        'x', 'o', 'x', 
        'x', 'o', 'o',
        'o', 'x', 'x'];

    const domElements =  {
        cells: [...document.querySelectorAll('.cell')]
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
    return {renderBoard}
})();

// Choose between one player or two player

// OK FIRST WE NEED TO GET THE PLAYER TO CHOOSE HIS NAME AND SIGN. THIS WILL ASSIGN HIM A COLOR.
// THEN THE BOARD WILL APPEAR, THE PLAYER WILL PUT HIS MARK SOMEWHERE WHICH MEANS:
// WHEN HE CLICKS TO A CELL WITH A CERTAIN ID, WE GET THE NUMBER OF THAT CELL AND PLACE THAT SIGN IN THE ARRAY POSITION
// WE THEN LOCK THE CELL AND MAKE IT UNCLICKABLE AGAIN. 
// 