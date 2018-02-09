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

// resets the visual board and resets any error/win/draw messages
const newGameReset = function () {
  $('#game-message').text('New Game! Player X\'s turn')
  $('#game-message').css('background-color', 'white')
  $('#gameOver-message').text('')
  $('#gameOver-message').css('background-color', 'white')
  for (let i = 0; i < 9; i++) {
    const spotClass = '#mark' + i
    $(spotClass).text('[ ]')
  }
}

const startGameSuccess = function (data) {
  $('#account-page-message').text('You have started a game!')
  $('#account-page-message').css('background-color', 'white')
}

const startGameFailure = function (error) {
  $('#account-page-message').text('You must be signed in to start a game!')
  $('#account-page-message').css('background-color', 'red')
  console.log(error)
}

const getGamesSuccess = function (data) {
  console.log(data)
  $('#account-page-message').text('Games retrieved! See console.')
  $('#account-page-message').css('background-color', 'white')
}

const getGamesFailure = function (error) {
  $('#account-page-message').text('Error on getting games!')
  $('#account-page-message').css('background-color', 'red')
  console.log(error)
}

module.exports = {
  movePlaySuccess,
  movePlayFailure,
  winMessage,
  drawMessage,
  newGameReset,
  startGameSuccess,
  startGameFailure,
  getGamesSuccess,
  getGamesFailure
}
