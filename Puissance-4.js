class Puissance4 extends Morpion
{
    constructor(
        players=[],
        numberOfRows=6,
        numberOfColumns=7,
        objectif=4,

    ) {
        super(
            players,
            numberOfRows,
            numberOfColumns,
            objectif,
        );
    }

    /**
     * Pose le pion dans la colone sélectionnée et vérifie si la partie est gagnée
     *
     * @param cell La cellule jouée
     */
    play(cell)
    {
        let column = cell.column
        //recherche les cases valides dans la column
        let validCellsInColumn = this.cells.filter(obj => {
            return obj.column === column && obj.valid === true;
        })
        // ne fait rien si il n'y a aucune case valide ou si la partie est gagnée
        if (validCellsInColumn.length <= 0 || this.ended) {
            return;
        }
        // trouve la cellule la plus basse et lui attribu le joueur actuel
        let lowestCellInColumn = validCellsInColumn[validCellsInColumn.length-1]
        lowestCellInColumn.change(this.currentPlayer)
        this.numberOfValidCells--
        // changement de joueur
        this.swapPlayers()
        // vérifie si la partie est gagnée
        this.checkWin()
    }
}