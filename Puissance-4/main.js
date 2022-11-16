const players = [
    new Player('joueur-1', 'yellow', true),
    new Player('joueur-2', 'red', true),
    new Player('joueur-3', 'blue', true),
    new Player('joueur-4', 'green', true),
]
let activePlayers = []



function addActivePlayer(player=null)
{
    if (players.length < 1) {
        return
    }
    if (player === null) {
        player = players[Math.floor(Math.random() * players.length)]
    }
    addPlayeListRow(player)
    players.splice(players.indexOf(player),1)
    activePlayers.push(player)
}

function removeActivePlayer(player)
{

}

function addPlayeListRow(player) {
    let playerList = document.querySelector('#player-select table tbody')
    let playerListRow = playerList.insertRow()
    playerListRow.insertCell().innerHTML = player.name
    playerListRow.insertCell().appendChild(player.generatePiece())
    playerListRow.insertCell().innerHTML = player.automatic
    player.HTMLScoreMorpionCell = playerListRow.insertCell()
    player.HTMLScoreMorpionCell.innerHTML = player.scoreMorpion
    player.HTMLScorePuissance4Cell = playerListRow.insertCell()
    player.HTMLScorePuissance4Cell.innerHTML = player.scorePuissance4
    playerListRow.insertCell().innerHTML = 'delete'
}

function startGames()
{
    if (activePlayers.length < 1) {
        return
    }
    new Puissance4(activePlayers)
    new Morpion(activePlayers)
    document.querySelector('#start-games').remove()
}

function restartGame(game)
{
    if (game instanceof Puissance4) {
        new Puissance4(activePlayers, game.numberOfRows, game.numberOfColumns, game.piecesToAlign)
        game.destruct()
    } else if (game instanceof Morpion) {
        new Morpion(activePlayers, game.numberOfRows, game.numberOfColumns, game.size)
        game.destruct()
    }
}

// const bot1 = new Player('bot-1', 'green', true)
// const player3 = new Player('joueur-3', 'blue')

// new Puissance4([players[0],players[1]])
// const game3 = new Puiss4([player1,player2,player3],10,12,4,)
// new Morpion([players[0],players[1]])
// new Morpion([players[0],bot1])

