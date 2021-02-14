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