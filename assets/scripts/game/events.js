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

const onGetGames = function (event) {
  event.preventDefault()
  gameAPI.getGames()
    .then(gameUI.getGamesSuccess)
    .catch(gameUI.getGamesFailure)
}

const onGetAGame = function (event) {
  event.preventDefault()
  const id = $('#get-game input').val()
  console.log(id)
  gameAPI.getAGame(id)
    .then(engine.loadApiGame)
    .catch(gameUI.getAGameFailure)
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

const onAccountReturn = function () {
  event.preventDefault()
  gameUI.accountReturn()
}

const addHandlers = () => {
  $('.boardSpot').on('click', onMakePlay)
  $('#start-game').on('submit', onStartGame)
  $('#get-all-games').on('submit', onGetGames)
  $('#get-ended-games').on('submit', onEndedGames)
  $('#get-active-games').on('submit', onActiveGames)
  $('#get-game').on('submit', onGetAGame)
  $('#return-to-acct').on('submit', onAccountReturn)
}

module.exports = {
  addHandlers
}
