class Morpion extends Game
{
    constructor(
        players=[],
        numberOfRows=3,
        numberOfColumns=3,
        objectif=3,

    ) {
        super(
            players,
            numberOfRows,
            numberOfColumns,
            objectif,
        );
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

    win(player)
    {
        this.ended = true;
        player.scoreMorpion++
        player.HTMLScoreMorpionCell.innerHTML = player.scoreMorpion
        this.modifyTableHeader(player.name+' a gagner', 'lightgreen', '', true)
        activeGame = null;
    }
}