function restartGame(game)
{
    if (game instanceof Game) {
        $a = new Game(game.numberOfRows, game.numberOfColumns, game.piecesToAlign, game.players)
        console.log($a.players)
        console.log(game.players)
        game.destruct()
    }
}

const player1 = new Player('joueur-1', 'yellow')
const player2 = new Player('joueur-2', 'red')
// const player3 = new Player('joueur-3', 'blue')

const game1 = new Game(6,7,4, [player1,player2])
// const game3 = new Game(10,12,4, [player1,player2,player3])

