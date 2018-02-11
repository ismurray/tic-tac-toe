'use strict'

// const engine = require('./engine.js')
const store = require('../store')

const textUpdateById = function (id, text) {
  $(id).text(text)
}

const movePlaySuccess = function (text) {
  $('#game-message').text(text)
  $('#game-message').css('background-color', 'white')
  $('#account-page-message').text('')
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
  $('#account-page-message').css('background-color', 'green')
  $('#current-game').text(store.gameId)
  $('#game-wrapper').show('slow')
}

const startGameFailure = function (error) {
  $('#account-page-message').text('You must be signed in to start a game!')
  $('#account-page-message').css('background-color', 'red')
  console.log(error)
}

// For some reason engine kept returning undefined when it was defined at the
// top of this doc, but works fine if defined within the function??
const getGamesSuccess = function (data) {
  const engine = require('./engine.js')
  engine.allGameStats(data)
  $('#account-page-message').text('Games stats retrieved!')
  $('#account-page-message').css('background-color', 'green')
}

const getGamesFailure = function (error) {
  $('#account-page-message').text('Error on getting games!')
  $('#account-page-message').css('background-color', 'red')
  console.log(error)
}

const getAGameSuccess = function (data) {
  console.log(data)
  $('#account-page-message').text('Game retrieved!')
  $('#account-page-message').css('background-color', 'white')
  $('#gameOver-message').text('')
  $('#gameOver-message').css('background-color', 'white')
  $('#game-message').text('')
  $('#game-message').css('background-color', 'white')
  $('#current-game').text(store.gameId)
  $('#game-wrapper').show('slow')
  $('#get-game').find('input:text').val('')

  for (let i = 0; i < data.board.length; i++) {
    const spotClass = '#mark' + i
    if (data.board[i] === '') {
      $(spotClass).text('[ ]')
    } else {
      $(spotClass).text('[' + data.board[i] + ']')
    }
  }
  if (!data.over) {
    $('#game-message').text('Game Loaded! Player ' + data.user + '\'s turn')
  } else if (data.over) {
    switch (data.winner) {
      case 'x':
        $('#gameOver-message').text('Game Loaded! Player X won this game!')
        $('#gameOver-message').css('background-color', 'green')
        break
      case 'o':
        $('#gameOver-message').text('Game Loaded! Player O won this game!')
        $('#gameOver-message').css('background-color', 'green')
        break
      case 'draw':
        $('#gameOver-message').text('Game Loaded! It was a draw!')
        $('#gameOver-message').css('background-color', 'red')
        break
    }
  }
}

const getAGameFailure = function (error) {
  const failId = $('#get-game').find('input:text').val()
  $('#account-page-message').text('Error on getting game with ID: ' + failId + '!')
  $('#account-page-message').css('background-color', 'red')
  $('#get-game').find('input:text').val('')
  console.log(error)
}

const accountReturn = function () {
  $('#account-page-message').text('')
  $('#account-page-message').css('background-color', 'white')
  $('#game-wrapper').hide('slow')
  $('#account-wrapper').show('slow')
}

const resetGameStats = function () {
  textUpdateById('#total-games', '')
  textUpdateById('#active-games', '')
  textUpdateById('#ended-games', '')
  textUpdateById('#games-won', '')
  textUpdateById('#games-lost', '')
  textUpdateById('#games-drawn', '')
  textUpdateById('#winrate', '')
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
  getGamesFailure,
  getAGameSuccess,
  getAGameFailure,
  textUpdateById,
  accountReturn,
  resetGameStats
}
