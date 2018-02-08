'use strict'

const engine = require('./engine.js')

const onMakePlay = function () {
  const index = this.getAttribute('data-id')
  engine.moveEntry(engine.game.user, index)
  // engine.turnSwitch(engine.game.user)
}

const addHandlers = () => {
  $('.boardSpot').on('click', onMakePlay)
}

module.exports = {
  addHandlers
}
