class Game
{
    constructor(numberOfRows, numberOfColumns, piecesToAlign, players=[])
    {
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        this.piecesToAlign = piecesToAlign;
        this.players = players;

        this.currentPlayer = this.players.find(()=>true);
        this.HTMLTable = this.generateTable();
        this.HTMLHeader = this.generateHeader();
        this.cells = this.generateCells();
        this.won = false;

        this.modifyTableHeader(this.currentPlayer.name+' commence');
    }

    destruct()
    {
        document.getElementById('puissance-4').removeChild(this.HTMLTable);
        for (const key in this) {
            delete this[key];
        }
    }

    /**
     * Change le joueur du prochain tour
     */
    swapPlayers()
    {
        // on prends l'index du joueur dans la liste des joueurs
        let currentPlayerIndex = this.players.indexOf(this.currentPlayer);
        // si il y a un joueur suivant dans la liste des joueurs alors on l'attribu
        if (this.players[currentPlayerIndex+1]) {
            this.currentPlayer = this.players[currentPlayerIndex+1]
        }
        // sinon on prends le premier de la liste
        else {
            // find permets de trouver le premier element sans présumer que son index est 0
            this.currentPlayer = this.players.find(()=>true)
        }
        // Modification du header
        this.modifyTableHeader('Au tour de : '+this.currentPlayer.name)
    }

    /**
     * Génère la table HTML
     *
     * @returns {HTMLTableElement}
     */
    generateTable()
    {
        // génération de la table
        let table = document.createElement('table');
        // attribution de la table à la div du jeu sur la page principale
        document.getElementById('puissance-4').appendChild(table);

        return table
    }

    /**
     * Génère le header de la table HTML
     *
     * @returns {HTMLTableElement}
     */
    generateHeader()
    {
        // génération du header de la table
        let tableHeader = this.HTMLTable.createTHead().insertRow().insertCell()
        // colspan représente la largeur de la cellule en nombre de colones
        tableHeader.colSpan = this.numberOfColumns

        return tableHeader;
    }

    /**
     * Génère les cellules
     *
     * @returns {HTMLTableElement[]}
     */
    generateCells() {
        // génération du corps de la table
        let tableBody = this.HTMLTable.createTBody()
        //génération des colones et des cellules
        let cells = []
        for(let row = 0; row<this.numberOfRows; row++) {
            let tableRow = tableBody.insertRow()
            for(let column = 0; column<this.numberOfColumns; column++) {
                // génération de la cellule
                let tableCell = tableRow.insertCell()
                let cell = new Cell(row, column, tableCell)
                tableCell.addEventListener('click', () => {
                    //recherche les cases valides dans la column
                    let validCellsInColumn = this.cells.filter(obj => {
                        return obj.column === cell.column && obj.valid === true;
                    })
                    // ne fait rien si il n'y a aucune case valide ou si la partie est gagnée
                    if (validCellsInColumn.length <= 0 || this.won) {
                        return;
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

                cells.push(cell)
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
        this.won = true;
        this.modifyTableHeader(player.name+' won', 'green', true)
    }
}