'use strict'

const numEngine = require('./numberEngine.js')
const gameUI = require('./ui.js')
const gameAPI = require('./api.js')

const onStartGame = function () {
  event.preventDefault()
  gameAPI.startGame()
    .then(numEngine.createNewGame)
    .catch(gameUI.startGameFailure)
}

const onMakeNumPlay = function () {
  event.preventDefault()
  const index = this.getAttribute('data-id')
  const formInputTag = '#numForm' + index + ' input'
  const input = $(formInputTag).val()
  numEngine.moveEntry(numEngine.game.user, index, input)
}

const addHandlers = () => {
  $('.numBoardSpot').on('submit', onMakeNumPlay)
  $('#start-numeric-button').on('submit', onStartGame)
}

module.exports = {
  addHandlers
}
