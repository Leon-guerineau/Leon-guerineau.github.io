const player1 = new Player('player1', 'yellow')
const player2 = new Player('player2', 'red')
const player3 = new Player('player3', 'blue')

const game1 = new Game(6,7,4)
const game3 = new Game(10,12,4)

game1.addPlayers([player1,player2])
game3.addPlayers([player1,player2,player3])