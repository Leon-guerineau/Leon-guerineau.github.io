/** @type {Player[]} Liste des joueurs inactifs */
let inactivePlayers = [
    new Player('joueur-1', 'yellow', true),
    new Player('joueur-2', 'red', true),
    new Player('joueur-3', 'blue', true),
    new Player('joueur-4', 'green', true),
]

/** @type {Player[]} Liste des joueurs actifs */
let activePlayers = []

/**
 * Ajoute un joueur actif
 */
//TODO : ajouter les 2 premiers joueurs de base
function addActivePlayer()
{
    // sécurité pour éviter d'ajouter plus que le maximum de joueurs authorisés
    if (inactivePlayers.length <= 0) {
        //TODO : ajouter un message "pas plus de 4 joueurs"
        return
    }
    // recherche un joueur aléatoire parmi les inactifs
    // TODO : prendre les joueurs dans l'ordre de la liste
    let player = inactivePlayers[Math.floor(Math.random() * inactivePlayers.length)]
    //
    addRowInPlayerSelect(player)
    // ajoute le joueur dans la liste des joueurs actifs et le retire de la liste des joueurs inactifs
    activePlayers.push(player)
    inactivePlayers.splice(inactivePlayers.indexOf(player),1)
}

/**
 * Retire un joueur actif
 *
 * @param {Player} player
 */
function removeActivePlayer(player)
{
    //TODO : ajouter une sécurité et un message "pas moins de 2 joueurs"
    inactivePlayers.push(player)
    activePlayers.splice(activePlayers.indexOf(player),1)
    player.HTMLScoreMorpionCell.parentElement.remove()
}

/**
 * Ajoute une ligne dans le menu des joueurs
 *
 * @param {Player} player Le joueur de la ligne
 */
function addRowInPlayerSelect(player) {
    // créer l'élément HTML de la ligne
    let playerListRow = document.querySelector('#player-select table tbody').insertRow()
    // cellule 1 : le nom du joueur
    playerListRow.insertCell().innerHTML = player.name
    // cellule 2 : la couleur du joueur
    // TODO : trouveer le moyen d'utiliser player.piece au lieu de player.generatePiece()
    playerListRow.insertCell().appendChild(player.generatePiece())
    // cellule 3 : joueur automatique ?
    // TODO : ajouter un switch pour automatique
    playerListRow.insertCell().innerHTML = player.automatic
    // cellule 4 : score du joueur pour le morpion
    player.HTMLScoreMorpionCell = playerListRow.insertCell()
    player.HTMLScoreMorpionCell.innerHTML = player.scoreMorpion
    // cellule 5 : score du joueur pour le puissance 4
    player.HTMLScorePuissance4Cell = playerListRow.insertCell()
    player.HTMLScorePuissance4Cell.innerHTML = player.scorePuissance4
    // cellule 6 : boutton de suppression de la ligne
    let deleteCell = playerListRow.insertCell()
    let deleteRowButton = document.createElement("button")
    deleteRowButton.innerText = 'Retirer'
    deleteRowButton.onclick = () => {
        removeActivePlayer(player)
    }
    deleteCell.appendChild(deleteRowButton)
}