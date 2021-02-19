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
    


})();
const gameBoard = (function(){
    const boardArray = [
        'x', 'o', 'x', 
        'x', 'o', 'o',
        'o', 'x', 'x'];

    const cells = [...document.querySelectorAll('.cell')]
    
    function styleCell(cell) {
        //Changes color based on cell content
        if (cell.textContent === 'o') cell.classList.add('orange-text')
        else cell.classList.add('blue-text');

    }
    function renderBoard() {
        let index = 0
        cells.forEach(cell => {
            //Assign unique incremental ID
            cell.id = 'cell-' + index;
            //Display sign from boardArray to cell.
            cell.textContent = boardArray[index]
            styleCell(cell)
            index++;
        })
    }
    return {renderBoard}
})();




// Choose between one player or two player

// OK FIRST WE NEED TO GET THE PLAYER TO CHOOSE HIS NAME AND SIGN. THIS WILL ASSIGN HIM A COLOR.
// THEN THE BOARD WILL APPEAR, THE PLAYER WILL PUT HIS MARK SOMEWHERE WHICH MEANS:
// WHEN HE CLICKS TO A CELL WITH A CERTAIN ID, WE GET THE NUMBER OF THAT CELL AND PLACE THAT SIGN IN THE ARRAY POSITION
// WE THEN LOCK THE CELL AND MAKE IT UNCLICKABLE AGAIN. 
// 