'use strict'

const engine = require('./engine.js')

const onMakePlay = function () {
  console.log('You clicked me!')
  $(this).text('[' + engine.game.user + ']')
  engine.turnSwitch(engine.game.user)
  console.log(engine.game.user)
}

const addHandlers = () => {
  $('.boardSpot').on('click', onMakePlay)
}

module.exports = {
  addHandlers
}
