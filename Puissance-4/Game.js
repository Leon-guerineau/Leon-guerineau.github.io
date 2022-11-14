class Game
{
    constructor(numberOfRows, numberOfColumns, piecesToAlign, players=[])
    {
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        this.piecesToAlign = piecesToAlign;
        this.players = players;

        this.currentPlayer = players[0];
        this.HTMLTable = this.generateTable();
        this.HTMLHeader = this.generateHeader();
        this.cells = this.generateCells();

        this.modifyTableHeader(this.currentPlayer.name)
    }

    destruct()
    {
        document.getElementById('puissance-4').removeChild(this.HTMLTable)
        for (const key in this) {
            delete this[key];
        }
    }

    /**
     * @param {array}players
     */
    addPlayers(players) {
        this.players = players
        // Set le joueur actuel si il n'y en as pas le premier joueur instcrit sera donc le premier à jouer
        if (!this.currentPlayer) {
            this.currentPlayer = players[0];
            this.modifyTableHeader(this.currentPlayer.name)
        }
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player
        this.modifyTableHeader(this.currentPlayer.name)
    }

    swapPlayers() {
        this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer)??0) +1] ?? this.players[0]
        this.modifyTableHeader(this.currentPlayer.name)
    }

    generateTable() {
        // génération de la table
        let table = document.createElement('table');
        document.getElementById('puissance-4').appendChild(table);
        return table
    }

    generateHeader() {
        // Génération du header de la table
        let tableHeader = this.HTMLTable.createTHead().insertRow().insertCell()
        // colspan représente la largeur de la cellule en nombre de colones
        tableHeader.colSpan = this.numberOfColumns

        return tableHeader;
    }

    generateCells() {
        let cells = []
        let tableBody = this.HTMLTable.createTBody()
        for(let row = 0; row<this.numberOfRows; row++) {
            let tableRow = tableBody.insertRow();
            for(let column = 0; column<this.numberOfColumns; column++) {
                let cell = new Cell(row, column, tableRow.insertCell())
                cells.push(cell)

                cell.HTMLCell.addEventListener('click', () => {
                    let validCellsInColumn = this.cells.filter(obj => {
                        return obj.column === cell.column && obj.valid === true
                    })
                    if (validCellsInColumn.length === 0) {
                        return
                    }
                    let lowestCellInColumn = validCellsInColumn[validCellsInColumn.length-1]
                    lowestCellInColumn.change(this.currentPlayer)
                    // changement de joueur
                    this.swapPlayers()
                    this.checkWinHorizontal()
                    this.checkWinVertical()
                    this.checkWinDiagonalDown()
                    this.checkWinDiagonalUp()
                })
            }
        }
        return cells
    }

    /**
     * Modifie le header du tableau
     * @param {string}message
     * @param {string}backgroundColor
     * @param {boolean}hasButton
     */
    modifyTableHeader(message, backgroundColor = 'lightgrey', hasButton = false) {
        this.HTMLHeader.innerHTML = message
        this.HTMLHeader.style.backgroundColor = backgroundColor
        if (hasButton) {
            let restartButton = document.createElement('button')
            restartButton.innerHTML = 'Nouvelle partie'
            restartButton.addEventListener('click', () => {
                restartGame(this)
            })
            this.HTMLHeader.appendChild(restartButton)
        }
    }

    checkWinHorizontal() {
        for(let row = 0; row<this.numberOfRows; row++){
            let cellsInRow = this.cells.filter(cell => {
                return cell.row === row
            })
            this.checkListForWin(cellsInRow)
        }
    }

    checkWinVertical() {
        for(let column = 0; column<this.numberOfColumns; column++){
            let cellsinColumn = this.cells.filter(cell => {
                return cell.column === column
            })
            this.checkListForWin(cellsinColumn)
        }
    }

    checkWinDiagonalDown() {
        for(let diagonal = -this.numberOfColumns; diagonal<this.numberOfRows; diagonal++){
            let cellsinDiagonal = []
            for(let column = 0; column<this.numberOfColumns; column++) {
                let cell = this.cells.find( cell => {
                    return cell.row === diagonal+column && cell.column === column
                })
                cell ? cellsinDiagonal.push(cell) : null

            }
            this.checkListForWin(cellsinDiagonal)
        }
    }

    checkWinDiagonalUp() {
        for(let diagonal = -this.numberOfColumns; diagonal<2*this.numberOfRows; diagonal++){
            let cellsinDiagonal = []
            for(let column = this.numberOfColumns; column>=0; column--) {
                let cell = this.cells.find( cell => {
                    return cell.row === diagonal-column && cell.column === column
                })
                cell ? cellsinDiagonal.push(cell) : null

            }
            this.checkListForWin(cellsinDiagonal)
        }
    }

    checkListForWin(cells) {
        let counter = 1
        let elem = null;
        let winCells = []
        cells.forEach((cell) => {
            if (cell.player instanceof Player) {
                if (cell.player === elem) {
                    counter++
                    winCells.push(cell)
                } else {
                    counter = 1;
                    winCells = [cell]
                }
                if(counter === this.piecesToAlign) {
                    winCells.forEach((cell) => {
                        cell.HTMLCell.style.backgroundColor = 'lightgreen'
                    })
                    this.win(cell.player)
                }
            }
            elem = cell.player
        })
    }

    win(player) {
        this.modifyTableHeader(player.name+' won', 'green', true)
        this.cells.forEach((cell) => {
            cell.removeEventListeners()
        })
    }
}