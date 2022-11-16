/**
 * Permet d'attendre avant d'effectuer une action
 *
 * @param ms Le temps d'attente en ms
 * @returns {Promise<unknown>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Lance les jeux
 */
function startGames()
{
    // sécurité pour démarrer les jeux uniquement si il y a des joueurs actifs
    if (activePlayers.length <= 0) {
        return
    }
    // lance les jeux
    new Puissance4(activePlayers)
    new Morpion(activePlayers)
    // retire le boutton de lancement
    document.querySelector('#start-games').remove()
}

/**
 * Relance un jeu
 *
 * @param game Le jeu à relancer
 */
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

