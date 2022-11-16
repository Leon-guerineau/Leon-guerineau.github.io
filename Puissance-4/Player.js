class Player {
    normal = 'normal'
    hard = 'difficile'

    constructor(name, color, automatic=false, level= this.normal) {
        this.name = name;
        this.color = color;
        this.automatic = automatic;
        this.level = level

        this.piece = this.generatePiece
    }

    playMorpion(game)
    {
        let validCells = game.cells.filter(cell => {
            return cell.valid;
        })
        if (validCells === []) {
            return
        }
        let randomValidCell = validCells[Math.floor(Math.random() * validCells.length)];
        game.play(randomValidCell)
    }

    /**
     * Génère un pion de la couleur du joueur
     *
     * @returns {HTMLDivElement} Une div HTML
     */
    generatePiece() {
        let piece = document.createElement('div')
        piece.style.height = '100%'
        piece.style.width = '100%'
        piece.style.borderRadius = '50%'
        piece.style.backgroundColor = this.color
        piece.style.display = 'inline-block'
        return piece
    }
}