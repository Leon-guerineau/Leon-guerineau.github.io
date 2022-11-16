function restartGame(game)
{
    if (game instanceof Puissance4) {
        new Puissance4(game.players, game.numberOfRows, game.numberOfColumns, game.piecesToAlign)
        game.destruct()
    } else if (game instanceof Morpion) {
        new Morpion(game.players, game.numberOfRows, game.numberOfColumns, game.size)
        game.destruct()
    }
}

const player1 = new Player('joueur-1', 'yellow')
const player2 = new Player('joueur-2', 'red')
// const player3 = new Player('joueur-3', 'blue')

new Puissance4([player1,player2])
// const game3 = new Puiss4([player1,player2,player3],10,12,4,)
new Morpion([player1,player2])

