function restartGame(game)
{
    if (game instanceof Puiss4) {
        new Puiss4(game.numberOfRows, game.numberOfColumns, game.piecesToAlign, game.players)
        game.destruct()
    }
}

const player1 = new Player('joueur-1', 'yellow')
const player2 = new Player('joueur-2', 'red')
// const player3 = new Player('joueur-3', 'blue')

new Puiss4(6,7,4, [player1,player2])
// const game3 = new Puiss4(10,12,4, [player1,player2,player3])
new Morpion([player1,player2])

