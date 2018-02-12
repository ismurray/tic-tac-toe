'use strict'

const gameUI = require('./ui.js')
const gameAPI = require('./api.js')
const store = require('../store')

const game = {
  board: ['', '', '', '', '', '', '', '', ''],
  over: false,
  id: null,
  user: 'x',
  xMoves: ['1', '3', '5', '7', '9'],
  oMoves: ['2', '4', '6', '8', '10'],
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
  // gameUI.newGameReset()
  store.gameId = data.game.id
  // gameUI.startGameSuccess()
  console.log('store.gameId', store.gameId)
}

// // Takes requested game from API, and writes it to the internal
// // board, and to the visual board
// const loadApiGame = function (data) {
//   // set internal board to match api board
//   const createGame = data.game
//   console.log(data)
//   game.board = createGame.cells
//   game.id = createGame.id
//   game.over = createGame.over
//   store.gameId = data.game.id
//   // Determine whose turn it is
//   let crosses = 0
//   let aughts = 0
//   for (let i = 0; i < game.board.length; i++) {
//     if (game.board[i] === 'x') {
//       crosses++
//     } else if (game.board[i] === 'o') {
//       aughts++
//     }
//   }
//   // set current turn to correct user
//   crosses > aughts ? game.user = 'o' : game.user = 'x'
//   console.log(game.user)
//   whoWon()
//   // set visual board to match API board
//   gameUI.getAGameSuccess(game)
// }

// // Check finished game to determin who won, or if draw
// const whoWon = function () {
//   if (findWin(game.board, game.winGroups, 'x') !== undefined) {
//     game.winner = 'x'
//   } else if (findWin(game.board, game.winGroups, 'o') !== undefined) {
//     game.winner = 'o'
//   } else if (drawCheck(game.board)) {
//     game.winner = 'draw'
//   }
// }

// Checks whether player input is a valid move
const validMove = function (board, user, index, input) {
  const moves = user + 'Moves'
  if (game.over === true) {
    console.log('You can\'t keep playing after the game is over. Start a new game!')
    return false
  } else if (board[index] !== '') {
    console.log('You can only play in an empty space! Try a different spot.')
    return false
  } else if (game[moves].includes(input) === false) {
    console.log('You can only play one of these numbers: ' + game[moves])
  } else {
    return true
  }
}

// writes player input to board
const play = function (board, user, index, input) {
  if (game.over === false) {
    // remove input from list of remaining moves
    const moves = user + 'Moves'
    const usedIndex = game[moves].indexOf(input)
    if (usedIndex > -1) {
      game[moves].splice(usedIndex, 1)
    }
    // update internal board
    console.log('before input:')
    printBoard(board)
    board[index] = input
    console.log('after input:')
    printBoard(board)
    // // update visual board
    // const spotClass = '#mark' + index
    // $(spotClass).text(input)
    // // update API board
    // gameAPI.updateBoard(index, input, false)
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
const equalsFifteen = function (board, winGroup) {
  let sum = 0
  for (let i = 0; i < winGroup.length; i++) {
    sum += parseInt(board[winGroup[i]])
  }
  console.log('sum is ' + sum)
  if (sum === 15) {
    return true
  } else {
    return false
  }
}

// Checks if any win conditions have been met by a given user, returns the line
// of the first win found, returns undefined if no win conditions met
// TODO add ability to return multiple wins if the wining move is a combo
const findWin = function (board, winGroups) {
  for (let i = 0; i < winGroups.length; i++) {
    if (equalsFifteen(board, winGroups[i])) {
      return winGroups[i]
    }
  }
}

// toggles the current user from 'x' to 'o' and vice versa
const turnSwitch = function (user) {
  user === 'x' ? game.user = 'o' : game.user = 'x'
  return user
}

// Prints board to ascii board to console
const printBoard = function (brd) {
  console.log(brd[0] + '|' + brd[1] + '|' + brd[2])
  console.log('-----')
  console.log(brd[3] + '|' + brd[4] + '|' + brd[5])
  console.log('-----')
  console.log(brd[6] + '|' + brd[7] + '|' + brd[8])
}

const moveEntry = function (user, index, input) {
  // confirm move validity
  if (!validMove(game.board, user, index, input)) {
    return
  }
  // write move to game.board
  game.board = play(game.board, user, index, input)
  // check to see if move is a winning play
  const winLine = findWin(game.board, game.winGroups)
  // If game is won-> return winning line, if game is draw-> end, otherwise next user's turn
  if (winLine !== undefined) {
    game.over = true
    // // update API game to over
    // gameAPI.updateBoard(index, game.user, true)
    // gameUI.movePlaySuccess('')
    // gameUI.winMessage(user + ' wins! Winning positions are: ' + winLine)
    console.log(user + ' wins! Winning positions are: ' + winLine)
  } else if (drawCheck(game.board)) {
    game.over = true
    // update API game to over
    // gameAPI.updateBoard(index, game.user, true)
    // gameUI.movePlaySuccess('')
    // gameUI.drawMessage('Game is a Draw! Try a new game!')
    console.log('Game is a Draw! Try a new game!')
  } else {
    const lastUser = user
    // Game continues-> switch to next player's turn
    turnSwitch(user)
    const text = 'Player ' + lastUser + ' has made their move! Player ' + game.user + ', now it\'s your turn!'
    console.log(text)
  }
}

moveEntry(game.user, 0, '1')

module.exports = {
  moveEntry
}
