
'use strict'

const gameUI = require('./ui.js')
const gameAPI = require('./api.js')
const store = require('../store')

const game = {
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
  ]
}

// sets internal game object to match newly created game from API
const createNewGame = function (data) {
  const createGame = data.game
  console.log(data)
  game.board = createGame.cells
  game.id = createGame.id
  game.over = createGame.over
  game.user = 'x'
  gameUI.newGameReset()
  store.gameId = data.game.id
  gameUI.startGameSuccess()
  console.log('store.gameId', store.gameId)
}

// Takes requested game from API, and writes it to the internal
// board, and to the visual board
const loadApiGame = function (data) {
  // set internal board to match api board
  const createGame = data.game
  console.log(data)
  game.board = createGame.cells
  game.id = createGame.id
  game.over = createGame.over
  store.gameId = data.game.id
  // Determine whose turn it is
  let crosses = 0
  let aughts = 0
  for (let i = 0; i < game.board.length; i++) {
    if (game.board[i] === 'x') {
      crosses++
    } else if (game.board[i] === 'o') {
      aughts++
    }
  }
  // set current turn to correct user
  crosses > aughts ? game.user = 'o' : game.user = 'x'
  console.log(game.user)
  whoWon()
  // set visual board to match API board
  gameUI.getAGameSuccess(game)
}

// const whoWon = function () {
//   // only run this function if the game.over is true
//   if (!game.over) {
//     return
//   }
//   // initialize move lists and open spot counter
//   let crosses = []
//   let aughts = []
//   let openSpots = 0
//   // write index of all x and o moves to respective arrays and count empty spots
//   for (let i = 0; i < game.board.length; i++) {
//     if (game.board[i] === 'x') {
//       crosses.push(i)
//     } else if (game.board[i] === 'o') {
//       aughts.push(i)
//     } else if (game.board[i] === '') {
//       openSpots++
//     }
//   }
//   for (let i = 0; i < game.winGroups.length; i++) {
//
//   }
// }

// Check finished game to determin who won, or if draw
const whoWon = function () {
  if (findWin(game.board, game.winGroups, 'x') !== undefined) {
    game.winner = 'x'
  } else if (findWin(game.board, game.winGroups, 'o') !== undefined) {
    game.winner = 'o'
  } else if (drawCheck(game.board)) {
    game.winner = 'draw'
  }
}

// Checks whether player input is a valid move
const validMove = function (board, index) {
  if (game.over === true) {
    gameUI.movePlayFailure('You cannot keep playing after the game is over! Start a new game!')
    return false
  } else if (board[index] === '') {
    return true
  } else {
    gameUI.movePlayFailure('You can only play in an empty space! Try a different spot.')
    return false
  }
}

// writes player input to board
const play = function (board, user, index) {
  if (game.over === false) {
    // update internal board
    board[index] = user
    // update visual board
    const spotClass = '#mark' + index
    $(spotClass).text('[' + game.user + ']')
    // update API board
    console.log(index, game.user, false)
    console.log(gameAPI.updateBoard(index, game.user, false))
    return board
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

// Checks if a single win condition has been met by a given user
const allMatch = function (board, winGroup, user) {
  const win = winGroup.every(index => board[index] === user)
  return win
}

// Checks if any win conditions have been met by a given user, returns the line
// of the first win found, returns undefined if no win conditions met
// TODO add ability to return multiple wins if the wining move is a combo
const findWin = function (board, winGroups, user) {
  for (let i = 0; i < winGroups.length; i++) {
    if (allMatch(board, winGroups[i], user)) {
      return winGroups[i]
    }
  }
}

// toggles the current user from 'x' to 'o' and vice versa
const turnSwitch = function (user) {
  user === 'x' ? game.user = 'o' : game.user = 'x'
  return user
}

const moveEntry = function (user, index) {
  // confirm move validity
  if (!validMove(game.board, index)) {
    return
  }
  // write move to game.board
  game.board = play(game.board, user, index)
  // check to see if move is a winning play
  const winLine = findWin(game.board, game.winGroups, user)
  // If game is won-> return winning line, if game is draw-> end, otherwise next user's turn
  if (winLine !== undefined) {
    game.over = true
    // update API game to over
    console.log(gameAPI.updateBoard(index, game.user, true))
    gameUI.movePlaySuccess('')
    gameUI.winMessage(user + ' wins! Winning positions are: ' + winLine)
  } else if (drawCheck(game.board)) {
    game.over = true
    // update API game to over
    console.log(gameAPI.updateBoard(index, game.user, true))
    gameUI.movePlaySuccess('')
    gameUI.drawMessage('Game is a Draw! Try a new game!')
  } else {
    const lastUser = user
    // Game continues-> switch to next player's turn
    turnSwitch(user)
    const text = 'Player ' + lastUser + ' has made their move! Player ' + game.user + ', now it\'s your turn!'
    gameUI.movePlaySuccess(text)
  }
}

// Resets the internal board and variables to initial values, and calls
// gameUI function that resets the visual board
// TODO See if this func is unnecessary now. createNewGame probably does the job better
const newGame = function () {
  game.board = ['', '', '', '', '', '', '', '', '']
  game.user = 'x'
  game.over = false
  gameUI.newGameReset()
}

module.exports = {
  moveEntry,
  game,
  newGame,
  createNewGame,
  loadApiGame,
  whoWon
}
