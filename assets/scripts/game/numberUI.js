'use strict'

// const numEngine = require('./numberEngine.js')
// const store = require('../store')

// resets the visual board and resets any error/win/draw messages
const newGameReset = function () {
  $('#game-message').show()
  $('#game-message').text('New Game! Player X\'s turn')
  $('#game-message').css('background-color', '#fefefe')
  $('#gameOver-message').hide('slow')
  $('#x-moves').text('Player x\'s moves: 1,3,5,7,9')
  $('#o-moves').text('Player o\'s moves: 2,4,6,8,10')
  // $('#gameOver-message').text('')
  // $('#gameOver-message').css('background-color', '#fefefe')
  for (let i = 0; i < 9; i++) {
    const spotID = '#numMark' + i
    $(spotID).css('background-color', '#fefefe')
    $(spotID).text('')
    const formID = '#numForm' + i
    $(formID).find('input:text').val('')
    $(formID).show()
  }
}

const hideInputs = function () {
  for (let i = 0; i < 9; i++) {
    const spotID = '#numMark' + i
    if ($(spotID).text() === '') {
      const formInputTag = '#numForm' + i
      $(formInputTag).hide()
    }
  }
}

const startGameSuccess = function (data) {
  $('#account-page-message').show()
  $('#account-page-message').text('You have started a game!')
  $('#account-page-message').css('background-color', '#5cb85c')
  $('#game-wrapper').hide('slow')
  $('#numeric-game-wrapper').show('slow')
}

module.exports = {
  newGameReset,
  startGameSuccess,
  hideInputs
}
