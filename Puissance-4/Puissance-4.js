class Puissance4
{
    constructor(players=[], numberOfRows=6, numberOfColumns=7, piecesToAlign=4)
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
     * @returns {HTMLTableElement} L'élément HTML de la table
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
     * @returns {HTMLTableElement} L'élément HTML du header
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
     * @returns {Cell[]} La liste des cellules
     */
    generateCells()
    {
        // génération du corps de la table
        let tableBody = this.HTMLTable.createTBody()
        //génération des colones et des cellules
        let cells = []
        for(let row = 0; row<this.numberOfRows; row++) {
            let tableRow = tableBody.insertRow()
            for(let column = 0; column<this.numberOfColumns; column++) {
                // génération de la cellule
                let tableCell = tableRow.insertCell()
                tableCell.addEventListener('click', () => {
                    this.play(column)
                })
                // Attribution d'un nouvel objet Cellule dans la liste des cellules
                cells.push(new Cell(row, column, tableCell))
            }
        }

        return cells
    }

    /**
     * Pose le pion dans la colone sélectionnée et vérifie si la partie est gagnée
     *
     * @param column La colone jouée
     */
    play(column)
    {
        //recherche les cases valides dans la column
        let validCellsInColumn = this.cells.filter(obj => {
            return obj.column === column && obj.valid === true;
        })
        // ne fait rien si il n'y a aucune case valide ou si la partie est gagnée
        if (validCellsInColumn.length <= 0 || this.won) {
            return;
        }
        // trouve la cellule la plus basse et lui attribu le joueur actuel
        let lowestCellInColumn = validCellsInColumn[validCellsInColumn.length-1]
        lowestCellInColumn.change(this.currentPlayer)
        // changement de joueur
        this.swapPlayers()
        // vérifie si la partie est gagnée
        this.checkWinHorizontal()
        this.checkWinVertical()
        this.checkWinDiagonalDown()
        this.checkWinDiagonalUp()
    }

    /**
     * Modifie le header du tableau
     *
     * @param {string}message Le message à afficher
     * @param {string}backgroundColor La couleur du fond
     * @param {boolean}hasButton Est-ce qu'on affiche le boutton pour redémarrer la partie
     */
    modifyTableHeader(message, backgroundColor = 'lightgrey', hasButton = false)
    {
        // modification du message et du fond du header
        this.HTMLHeader.innerHTML = message
        this.HTMLHeader.style.backgroundColor = backgroundColor
        // affichage du boutton reset si demandé
        if (hasButton) {
            let restartButton = document.createElement('button')
            restartButton.innerHTML = 'Nouvelle partie'
            restartButton.addEventListener('click', () => {
                restartGame(this)
            })
            this.HTMLHeader.appendChild(restartButton)
        }
    }

    /**
     * Vérifie pour chaque ligne si un joueur à gagner
     */
    checkWinHorizontal() {
        for(let row = 0; row<this.numberOfRows; row++){
            // filtre les cellules pour garder celles apartenant à une ligne précise
            let cellsInRow = this.cells.filter(cell => {
                return cell.row === row
            })
            // vérifie si un joueur à gagner
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

    /**
     * prends une chaine de pions et regarde si un nombre suffisant de pions sont alignés pour qu'un joueur gagne
     *
     * @param cells
     */
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