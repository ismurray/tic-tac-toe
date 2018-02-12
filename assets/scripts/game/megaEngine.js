'use strict'

// const gameUI = require('./ui.js')
// const gameAPI = require('./api.js')
// const store = require('../store')
const engine = require('./engine.js')

const masterGame = {
  board: ['', '', '', '', '', '', '', '', ''],
  over: false,
  id: null,
  user: 'x',
  winGroups: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  subGames: []
}

// constructor function to locally store multiple game objects
const StoredGame = function (board, over, id, user) {
  this.board = board
  this.over = over
  this.id = id
  this.user = user
}

// a testing function to create new megaboard without API interaction
const createMegaBoard = function () {
  for (let i = 0; i < masterGame.board.length; i++) {
    const tempGame = new StoredGame(masterGame.board, false, i, 'x')
    masterGame.subGames.push(tempGame)
  }
}

// Below are reworked versions of engine functions:

const validMove = function (subGame, board, index) {
  if (subGame.over === true) {
    console.log('You can\'t keep playing after the game is over.')
    // gameUI.movePlayFailure('You can\'t keep playing after the game is over. Start a new game!')
    return false
  } else if (board[index] === '') {
    return true
  } else {
    console.log('You can only play in an empty space!')
    // gameUI.movePlayFailure('You can only play in an empty space! Try a different spot.')
    return false
  }
}

// writes player input to sub board
const play = function (subGame, subUser, subIndex) {
  if (subGame.over === false) {
    // update internal board
    subGame.board[subIndex] = subUser
    // update visual board
    // const spotClass = '#mark' + subIndex
    // $(spotClass).text(game.user)
    // // update API board
    // gameAPI.updateBoard(subIndex, game.user, false)
    return subGame.board
  }
}

// returns true if board is a draw
const drawCheck = function (board) {
  let draw = true
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      draw = false
    }
  }
  return draw
}

// Checks if a single win condition has been met by a given user, if so returns true
const allMatch = function (subBoard, winGroup, subUser) {
  const win = winGroup.every(subIndex => subBoard[subIndex] === subUser)
  return win
}

// Checks if any win conditions have been met by a given user, returns the line
// of the first win found, returns undefined if no win conditions met
// TODO add ability to return multiple wins if the wining move is a combo
const findWin = function (subBoard, winGroups, subUser) {
  for (let i = 0; i < winGroups.length; i++) {
    if (allMatch(subBoard, winGroups[i], subUser)) {
      return winGroups[i]
    }
  }
}

// toggles the current user from 'x' to 'o' and vice versa
const turnSwitch = function (subUser, subGame) {
  subUser === 'x' ? subGame.user = 'o' : subGame.user = 'x'
  return subUser
}

// Prints board to ascii board to console
const printBoard = function (brd) {
  console.log(brd[0] + '|' + brd[1] + '|' + brd[2])
  console.log('-----')
  console.log(brd[3] + '|' + brd[4] + '|' + brd[5])
  console.log('-----')
  console.log(brd[6] + '|' + brd[7] + '|' + brd[8])
}

const megaMoveEntry = function (index, subGame, subUser, subIndex) {
  // confirm move validity
  if (!validMove(subGame, subGame.board, subIndex)) {
    return
  }
  // write move to board
  subGame.board = play(subGame, subUser, subIndex)
  printBoard(subGame.board)
  // check to see if move is a winning play
  const winLine = findWin(subGame.board, masterGame.winGroups, subUser)
  // If game is won-> return winning line, if game is draw-> end, otherwise next user's turn
  if (winLine !== undefined) {
    subGame.over = true
    console.log('User ' + subUser + ' wins subGame of id: ' + subGame.id + 'which takes square ' + index)
    play(masterGame.board, subUser, index)
    // update API game to over
    // gameAPI.updateBoard(index, game.user, true)
    // gameUI.movePlaySuccess('')
    // gameUI.winMessage(user + ' wins! Winning positions are: ' + winLine)
  } else if (drawCheck(subGame.board)) {
    subGame.over = true
    console.log('This sub-game is a draw, so nobody takes square ' + index + 'this turn! Next Player go!')
    // replace spent subBoard with a new board
    masterGame.subGames[subIndex] = new StoredGame(['', '', '', '', '', '', '', '', ''], false, subIndex, 'x')
    // update API game to over
    // gameAPI.updateBoard(index, game.user, true)
    // gameUI.movePlaySuccess('')
    // gameUI.drawMessage('Game is a Draw! Try a new game!')
  } else {
    const lastUser = subUser
    // Game continues-> switch to next player's turn
    turnSwitch(subUser, subGame)
    const text = 'Player ' + lastUser + ' has made their move! Player ' + subGame.user + ', now it\'s your turn!'
    console.log(text)
    // gameUI.movePlaySuccess(text)
  }
}

createMegaBoard()
megaMoveEntry(0, masterGame.subGames[0], 'x', 0)
console.log(masterGame)

module.exports = {
  masterGame,
  megaMoveEntry
}
