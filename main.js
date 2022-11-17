
document.addEventListener("DOMContentLoaded", function() {
    addActivePlayer()
    addActivePlayer()
});

let activeGame = null

/**
 * Permet d'attendre avant d'effectuer une action
 *
 * @param {number} ms Le temps d'attente en ms
 * @returns {Promise<unknown>}
 */
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Lance les jeux
 */
function startGames()
{
    // sécurité pour démarrer les jeux uniquement si il y a des joueurs actifs
    if (activePlayers.length < 2) {
        return alert('Il doit y avoir au moins 2 joueurs pour commencer')
    }

    activeGame = new Morpion(activePlayers)

    // retire le boutton de lancement
    document.querySelector('#start-games').remove()
}

function startPuissance4()
{
    // sécurité pour démarrer les jeux uniquement si il y a des joueurs actifs
    if (activePlayers.length < 2) {
        return alert('Il doit y avoir au moins 2 joueurs pour commencer')
    }

    activeGame = new Puissance4(activePlayers)

    // retire le boutton de lancement
    document.querySelector('#start-games').remove()
}

/**
 * Relance un jeu
 *
 * @param {Morpion|Puissance4} game Le jeu à relancer
 */
function restartGame(game)
{
    if (game instanceof Puissance4) {
        activeGame = new Puissance4(activePlayers);
    }
    else if (game instanceof Morpion) {
        activeGame = new Morpion(activePlayers);
    }

    // retire l'objet HTML du jeu et vide son objet JS
    game.gameBody.removeChild(game.HTMLTable);
    for (const key in game) {
        delete game[key];
    }
}

function switchGame(game)
{
    if (game instanceof Puissance4) {
        activeGame = new Morpion(activePlayers);
    }
    else if (game instanceof Morpion) {
        activeGame = new Puissance4(activePlayers);
    }

    // retire l'objet HTML du jeu et vide son objet JS
    game.gameBody.removeChild(game.HTMLTable);
    for (const key in game) {
        delete game[key];
    }
}

