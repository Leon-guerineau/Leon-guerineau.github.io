class Morpion
{
    constructor(
        players=[],
        numberOfRows=3,
        numberOfColumns=3,
        objectif=3,
    ) {
        this.players = players;
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        this.objectif = objectif;

        this.jsClassName = this.constructor.name;
        this.numberOfValidCells = 0;
        this.gameBody = document.getElementById(this.jsClassName);
        this.currentPlayer = this.players.find(()=>true);
        this.HTMLTable = this.generateTable();
        this.HTMLHeader = this.generateHeader();
        this.cells = this.generateCells();
        this.ended = false;
        this.nextTurn()

        this.modifyTableHeader(this.currentPlayer.name+' commence', 'lightgrey', this.currentPlayer.color);
    }

    isMorpion()
    {
        return this.jsClassName = Morpion.constructor.name;
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
        this.modifyTableHeader('Au tour de : '+this.currentPlayer.name, 'lightgrey', this.currentPlayer.color)
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
        this.gameBody.appendChild(table);

        return table
    }

    /**
     * Génère le header de la table HTML
     *
     * @returns {HTMLTableElement} L'élément HTML du header
     */
    generateHeader()
    {
        let header = this.HTMLTable.createTHead()
        let titreHeader = header.insertRow().insertCell()
        titreHeader.colSpan = this.numberOfColumns
        titreHeader.innerHTML = this.jsClassName
        titreHeader.style.backgroundColor = 'lightgray'
        // génération du header de la table
        let headerInfo = header.insertRow().insertCell()
        // colspan représente la largeur de la cellule en nombre de colones
        headerInfo.colSpan = this.numberOfColumns

        return headerInfo;
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
                let cell = new Cell(row, column, tableRow.insertCell())
                this.numberOfValidCells++
                // Attribution d'un nouvel objet Cellule dans la liste des cellules
                cells.push(cell)
                cell.HTMLCell.addEventListener('click', () => {
                    if (this.currentPlayer.automatic) {
                        return
                    }
                    this.play(cell)
                    this.nextTurn()
                })
            }
        }

        return cells
    }

    /**
     * Pose le pion dans la cellule sélectionnée et vérifie si la partie est gagnée
     *
     * @param {Cell}cell
     */
    play(cell)
    {
        // ne fait rien si il n'y a aucune case valide ou si la partie est gagnée
        if (cell.valid === false || this.ended) {
            return;
        }
        cell.change(this.currentPlayer)
        this.numberOfValidCells--
        // changement de joueur
        this.swapPlayers()
        // vérifie si la partie est gagnée
        this.checkWin()
    }

    nextTurn()
    {
        sleep(500).then( ()=> {
            if (!this.currentPlayer.automatic || this.ended) {
                return
            }
            this.currentPlayer.autoPlay(this)
        })
    }

    /**
     * Modifie le header du tableau
     *
     * @param {string}message Le message à afficher
     * @param {string}backgroundColor La couleur du fond
     * @param {string}fontColor La couleur du message
     * @param {boolean}hasButton Est-ce qu'on affiche le boutton pour redémarrer la partie
     */
    modifyTableHeader(message, backgroundColor = 'lightgrey', fontColor = '', hasButton = false)
    {
        // modification du message et du fond du header
        this.HTMLHeader.innerHTML = '<span style="color: '+fontColor+'">'+message+'</span>'
        this.HTMLHeader.style.backgroundColor = backgroundColor
        // affichage du boutton reset si demandé
        if (hasButton) {
            let restartButton = document.createElement('button')
            restartButton.innerHTML = 'Nouvelle partie'
            restartButton.addEventListener('click', () => {
                restartGame(this)
            })
            this.HTMLHeader.appendChild(restartButton)
            let switchButton = document.createElement('button')
            switchButton.innerHTML = 'Changer de jeu'
            switchButton.addEventListener('click', () => {
                switchGame(this)
            })
            this.HTMLHeader.appendChild(switchButton)
        }
    }

    checkWin() {
        this.checkWinHorizontal()
        this.checkWinVertical()
        this.checkWinDiagonalDown()
        this.checkWinDiagonalUp()
        if (this.ended) {
            return
        }
        if (this.numberOfValidCells <= 0) {
            this.lose()
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
                if(counter === this.objectif) {
                    winCells.forEach((cell) => {
                        cell.HTMLCell.style.backgroundColor = 'lightgreen'
                    })
                    this.win(cell.player)
                }
            }
            elem = cell.player
        })
    }

    win(player)
    {
        this.ended = true;
        if (this.jsClassName === 'Morpion'){
            player.scoreMorpion++
            player.HTMLScoreMorpionCell.innerHTML = player.scoreMorpion
        }
        else if (this.jsClassName === 'Puissance4') {
            player.scorePuissance4++
            player.HTMLScorePuissance4Cell.innerHTML = player.scorePuissance4
        }
        this.modifyTableHeader(player.name+' a gagner', 'lightgreen', '', true)
        activeGame = null;
    }

    lose()
    {
        this.ended = true;
        this.modifyTableHeader('Personne n\'as a gagner', 'indianred', '', true)
        activeGame = null;
    }
}