'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const gameEvents = require('./game/events.js')
const authEvents = require('./auth/events.js')
const numGameEvents = require('./game/numberEvents.js')

const onShowAll = function () {
  event.preventDefault()
  $('#auth-wrapper').show()
  $('#account-wrapper').show()
  $('#game-wrapper').show()
  $('#account-navbar').show()
}

const onHideAll = function () {
  event.preventDefault()
  $('#auth-wrapper').hide()
  $('#account-wrapper').hide()
  $('#game-wrapper').hide()
}

$(() => {
  setAPIOrigin(location, config)
  gameEvents.addHandlers()
  numGameEvents.addHandlers()
  authEvents.addHandlers()
  $('#account-wrapper').hide()
  $('#game-wrapper').hide()
  $('#account-navbar').hide()
  $('#show-all').on('submit', onShowAll)
  $('#hide-all').on('submit', onHideAll)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
