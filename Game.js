class Game
{
    constructor(
        players,
        numberOfRows,
        numberOfColumns,
        objectif,
    ) {
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        this.objectif = objectif;
        this.players = players;

        this.numberOfValidCells = 0;
    }
}