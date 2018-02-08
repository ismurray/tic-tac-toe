'use strict'

// const gameEvents = require('./game/events.js')

const movePlaySuccess = function (text) {
  $('#game-message').text(text)
  $('#game-message').css('background-color', 'white')
}

const movePlayFailure = function (text) {
  $('#game-message').text(text)
  $('#game-message').css('background-color', 'red')
}

const winMessage = function (text) {
  $('#gameOver-message').text(text)
  $('#gameOver-message').css('background-color', 'green')
}

const drawMessage = function (text) {
  $('#gameOver-message').text(text)
  $('#gameOver-message').css('background-color', 'red')
}

module.exports = {
  movePlaySuccess,
  movePlayFailure,
  winMessage,
  drawMessage
}
