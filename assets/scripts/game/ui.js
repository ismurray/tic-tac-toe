'use strict'

const engine = require('./engine.js')
const store = require('../store')

const textUpdateById = function (id, text) {
  $(id).text(text)
}

const movePlaySuccess = function (text) {
  $('#game-message').show()
  $('#game-message').text(text)
  $('#game-message').css('background-color', '#fefefe')
  $('#account-page-message').hide('slow')
  // $('#account-page-message').text('')
  // $('#account-page-message').css('background-color', '#fefefe')
}

const movePlayFailure = function (text) {
  $('#game-message').show()
  $('#game-message').text(text)
  $('#game-message').css('background-color', '#f0ad4e')
}

const winMessage = function (text, winLine) {
  $('#game-message').hide('slow')
  $('#gameOver-message').show()
  $('#gameOver-message').text(text)
  $('#gameOver-message').css('background-color', '#5cb85c')
  // change background color of winning positions
  for (let i = 0; i < winLine.length; i++) {
    const spotID = '#mark' + winLine[i]
    $(spotID).css('background-color', '#5cb85c')
  }
}

const drawMessage = function (text) {
  $('#game-message').hide('slow')
  $('#gameOver-message').show()
  $('#gameOver-message').text(text)
  $('#gameOver-message').css('background-color', '#d9534f')
}

// resets the visual board and resets any error/win/draw messages
const newGameReset = function () {
  $('#game-message').show()
  $('#game-message').text('New Game! Player X\'s turn')
  $('#game-message').css('background-color', '#fefefe')
  $('#gameOver-message').hide('slow')
  // $('#gameOver-message').text('')
  // $('#gameOver-message').css('background-color', '#fefefe')
  for (let i = 0; i < 9; i++) {
    const spotID = '#mark' + i
    $(spotID).text(' ')
    $(spotID).css('background-color', '#fefefe')
  }
}

const startGameSuccess = function (data) {
  $('#account-page-message').show()
  $('#account-page-message').text('You have started a game!')
  $('#account-page-message').css('background-color', '#5cb85c')
  $('#current-game').text(store.gameId)
  $('#game-wrapper').show('slow')
  $('#numeric-game-wrapper').hide()
}

const startGameFailure = function (error) {
  $('#account-page-message').show()
  $('#account-page-message').text('Error starting game!')
  $('#account-page-message').css('background-color', '#d9534f')
  console.log(error)
}

// For some reason engine kept returning undefined when it was defined at the
// top of this doc, but works fine if defined within the function??
const getGamesSuccess = function (data) {
  const engine = require('./engine.js')
  engine.allGameStats(data)
  $('#account-page-message').show()
  $('#account-page-message').text('Games stats retrieved!')
  $('#account-page-message').css('background-color', '#5cb85c')
}

const getGamesFailure = function (error) {
  $('#account-page-message').show()
  $('#account-page-message').text('Error on getting games!')
  $('#account-page-message').css('background-color', '#d9534f')
  console.log(error)
}

const getGameWinMessage = function () {
  const engine = require('./engine.js')
  const winLine = engine.findWin(engine.game.board, engine.game.winGroups, engine.game.winner)
  if (winLine !== undefined) {
    const winText = 'Game Loaded! Player ' + engine.game.winner + ' won this game!'
    winMessage(winText, winLine)
  }
}

const getAGameSuccess = function (data) {
  console.log(data)
  $('#account-page-message').show()
  $('#account-page-message').text('Game retrieved!')
  $('#account-page-message').css('background-color', '#fefefe')
  $('#gameOver-message').hide('slow')
  // $('#gameOver-message').text('')
  $('#gameOver-message').css('background-color', '#fefefe')
  // $('#game-message').hide('slow')
  // $('#game-message').text('')
  $('#game-message').css('background-color', '#fefefe')
  $('#current-game').text(store.gameId)
  $('#game-wrapper').show('slow')
  $('#get-game').find('input:text').val('')

  for (let i = 0; i < data.board.length; i++) {
    const spotID = '#mark' + i
    $(spotID).css('background-color', '#fefefe')
    if (data.board[i] === '') {
      $(spotID).text(' ')
    } else {
      $(spotID).text(data.board[i])
    }
  }
  if (!data.over) {
    $('#game-message').show()
    $('#game-message').text('Game Loaded! Player ' + data.user + '\'s turn')
  } else if (data.over) {
    $('#gameOver-message').show()
    switch (data.winner) {
      case 'x':
        getGameWinMessage()
        break
      case 'o':
        getGameWinMessage()
        break
      case 'draw':
        $('#gameOver-message').text('Game Loaded! It was a draw!')
        $('#gameOver-message').css('background-color', '#d9534f')
        break
    }
  }
}

const getAGameFailure = function (error) {
  const failId = $('#get-game').find('input:text').val()
  $('#account-page-message').show()
  $('#account-page-message').text('Error on getting game with ID: ' + failId + '!')
  $('#account-page-message').css('background-color', '#d9534f')
  $('#get-game').find('input:text').val('')
  console.log(error)
}

const accountReturn = function () {
  $('#account-page-message').hide('slow')
  // $('#account-page-message').text('')
  // $('#account-page-message').css('background-color', '#fefefe')
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
