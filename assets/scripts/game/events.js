'use strict'

const engine = require('./engine.js')
const gameAPI = require('./api.js')
const gameUI = require('./ui.js')

const onMakePlay = function () {
  const index = this.getAttribute('data-id')
  engine.moveEntry(engine.game.user, index)
}

const onStartGame = function (event) {
  event.preventDefault()
  gameAPI.startGame()
    .then(engine.createNewGame)
    .catch(gameUI.startGameFailure)
}

const onNewGame = function () {
  event.preventDefault()
  engine.newGame()
}

const onGetGames = function (event) {
  event.preventDefault()
  gameAPI.getGames()
    .then(gameUI.getGamesSuccess)
    .catch(gameUI.getGamesFailure)
}

const onEndedGames = function (event) {
  event.preventDefault()
  gameAPI.getEndedGames()
    .then(gameUI.getGamesSuccess)
    .catch(gameUI.getGamesFailure)
}

const onActiveGames = function (event) {
  event.preventDefault()
  gameAPI.getActiveGames()
    .then(gameUI.getGamesSuccess)
    .catch(gameUI.getGamesFailure)
}

const addHandlers = () => {
  $('.boardSpot').on('click', onMakePlay)
  $('#new-game').on('click', onNewGame)
  $('#start-game').on('submit', onStartGame)
  $('#get-all-games').on('submit', onGetGames)
  $('#get-ended-games').on('submit', onEndedGames)
  $('#get-active-games').on('submit', onActiveGames)
}

module.exports = {
  addHandlers
}
