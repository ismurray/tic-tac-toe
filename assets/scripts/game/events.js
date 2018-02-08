'use strict'

const engine = require('./engine.js')

const onMakePlay = function () {
  const index = this.getAttribute('data-id')
  engine.moveEntry(engine.game.user, index)
}

const onNewGame = function () {
  event.preventDefault()
  engine.newGame()
}

const addHandlers = () => {
  $('.boardSpot').on('click', onMakePlay)
  $('#new-game').on('click', onNewGame)
}

module.exports = {
  addHandlers
}
