class Player
{
    constructor(name, color, automatic=false) {
        this.name = name;
        this.color = color;
        this.automatic = automatic;

        this.scoreMorpion = 0;
        this.HTMLScoreMorpionCell = '';
        this.scorePuissance4 = 0;
        this.HTMLScorePuissance4Cell = '';

        this.piece = this.generatePiece
    }

    playMorpion(game)
    {
        let validCells = game.cells.filter(cell => {
            return cell.valid;
        })
        if (validCells.length < 1) {
            return
        }
        let randomValidCell = validCells[Math.floor(Math.random() * validCells.length)];
        randomValidCell.HTMLCell.click();
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