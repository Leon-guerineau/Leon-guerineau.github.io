class Cell
{
    constructor(
        row,
        column,
        HTMLCell,
    ) {
        this.row = row;             // Position dans la colone (y)
        this.column = column;       // Position dans la ligne (x)
        this.HTMLCell = HTMLCell;   // Élément HTML relié à l'objet

        this.player = null;         // Joueur attribué à la case
        this.valid = true;          // Détermine si la case est valide pour poser un pion
    }

    /**
     * Attribu la case à un joueur
     *
     * @param {Player}player Le joueur à qui on attribu la case
     */
    change(player) {
        // Attribule joueur à l'objet
        this.player = player
        // 'appenChild' permet d'insèrer dans l'HTML de l'objet l'HTML du pion du joueur
        this.HTMLCell.appendChild(player.piece())
        // Rends la case invalide
        this.valid = false
    }
}