class Player
{
    constructor(
        name,
        color,
        automatic=false,
    ) {
        this.name = name;                   // Le nom du joueur
        this.color = color;                 // La couleur du joueur
        this.automatic = automatic;         // Est-ce que le joueur est automatique

        this.scoreMorpion = 0;              // Le score du joueur pour le morpion
        this.HTMLScoreMorpionCell = '';     // L'élément HTML qui affiche le score du morpion (voir PlayerSelect.js)
        this.scorePuissance4 = 0;           // Le score du joueur pour le puissance 4
        this.HTMLScorePuissance4Cell = '';  // L'élément HTML qui affiche le score du puissance 4 (voir PlayerSelect.js)

        this.piece = this.generatePiece     // Le pion du joueur
    }

    /**
     * Recherche une cellule et joue
     *
     * @param {Morpion|Puissance4} game
     */
    autoPlay(game)
    {
        let validCells = game.cells.filter(cell => {
            return cell.valid;
        })
        // TODO : cette sécurité est peut être inutile
        if (validCells.length < 1) {
            return
        }
        let randomValidCell = validCells[Math.floor(Math.random() * validCells.length)];
        game.play(randomValidCell)
        game.nextTurn()
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