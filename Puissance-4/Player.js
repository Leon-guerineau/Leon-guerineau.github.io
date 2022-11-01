class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.piece = this.generatePiece
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