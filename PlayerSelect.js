/** @type {Player[]} Liste des joueurs inactifs */
let inactivePlayers = [
    new Player('joueur-1', 'gold', false),
    new Player('joueur-2', 'red', false),
    new Player('joueur-3', 'blue', false),
    new Player('joueur-4', 'green', false),
]

/** @type {Player[]} Liste des joueurs actifs */
let activePlayers = []

/**
 * Ajoute un joueur actif
 */
function addActivePlayer()
{
    if (activeGame instanceof Morpion) {
        return alert('Veuillez finir le morpion')
    }
    if (activeGame instanceof Puissance4) {
        return alert('Veuillez finir le puissance 4')
    }
    // sécurité pour éviter d'ajouter plus que le maximum de joueurs authorisés
    if (inactivePlayers.length <= 0) {
        return alert('Il ne peut pas y avoir plus de 4 joueurs')
    }
    // recherche un joueur aléatoire parmi les inactifs
    let player = inactivePlayers.find(()=>true)
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
// TODO : ajouter une sécurité pour ne pas retirer de joueur si un jeu est en cours
function removeActivePlayer(player)
{
    if (activePlayers.length <= 2) {
        return alert('Il ne peut pas y avoir moins de 2 joueurs')
    }
    if (activeGame instanceof Morpion) {
        return alert('Veuillez finir le morpion')
    }
    if (activeGame instanceof Puissance4) {
        return alert('Veuillez finir le puissance 4')
    }
    inactivePlayers.push(player)
    activePlayers.splice(activePlayers.indexOf(player),1)
    player.HTMLScoreMorpionCell.parentElement.remove()
}

/**
 * Ajoute une ligne dans le menu des joueurs
 *
 * @param {Player} player Le joueur de la ligne
 */
function addRowInPlayerSelect(player)
{
    // créer l'élément HTML de la ligne
    let playerListRow = document.querySelector('#player-select table tbody').insertRow()
    // cellule 1 : le nom du joueur
    playerListRow.insertCell().innerHTML = player.name
    // cellule 2 : la couleur du joueur
    // TODO : trouver le moyen d'utiliser player.piece au lieu de player.generatePiece()
    playerListRow.insertCell().appendChild(player.generatePiece())
    // cellule 3 : joueur automatique ?
    let automaticSwitch = document.createElement('input');
    automaticSwitch.type = 'checkbox';
    automaticSwitch.checked = player.automatic
    automaticSwitch.onchange = () => {
        if (activeGame != null) {
            activeGame.nextTurn()
        }
        player.automatic = automaticSwitch.checked;
    }
    playerListRow.insertCell().appendChild(automaticSwitch);
    // cellule 4 : score du joueur pour le morpion
    player.HTMLScoreMorpionCell = playerListRow.insertCell()
    player.HTMLScoreMorpionCell.innerHTML = player.scoreMorpion
    // cellule 5 : score du joueur pour le puissance 4
    player.HTMLScorePuissance4Cell = playerListRow.insertCell()
    player.HTMLScorePuissance4Cell.innerHTML = player.scorePuissance4
    // cellule 6 : boutton de suppression de la ligne
    let deleteCell = playerListRow.insertCell()
    let deleteRowButton = document.createElement('button')
    deleteRowButton.innerText = 'Retirer'
    deleteRowButton.onclick = () => {
        removeActivePlayer(player)
    }
    deleteCell.appendChild(deleteRowButton)
}