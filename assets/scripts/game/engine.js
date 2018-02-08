
'use strict'

const game = {
  board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  over: false,
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

// Checks whether player input is a valid move
const validMove = function (board, index) {
  if (board[index] === ' ') {
    return true
  } else {
    return false
  }
}

// writes player input to board
const play = function (board, user, index) {
  if (game.over === false) {
    board[index] = user
    return board
  } else {
    console.log('You cannot keep playing after the game is over!')
  }
}

// returns true if board is a draw
const drawCheck = function (board) {
  let draw = true
  for (let i = 0; i < board.length; i++) {
    if (board[i] === ' ') {
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
  console.log('user was ' + user)
  user === 'x' ? game.user = 'o' : game.user = 'x'
  return user
}

// Prints board to ascii board to console
const printBoard = function () {
  console.log(game.board[0] + '|' + game.board[1] + '|' + game.board[2])
  console.log('-----')
  console.log(game.board[3] + '|' + game.board[4] + '|' + game.board[5])
  console.log('-----')
  console.log(game.board[6] + '|' + game.board[7] + '|' + game.board[8])
}

const moveEntry = function (user, index) {
  // confirm move validity
  if (!validMove(game.board, index)) {
    return 'You can only play in an empty space! Try again.'
  }
  // write move to game.board
  game.board = play(game.board, user, index)
  // print game.board to console
  printBoard()
  // check to see if move is a winning play
  const winLine = findWin(game.board, game.winGroups, user)
  // If game is won-> return winning line, if game is draw-> end, otherwise next user's turn
  if (winLine !== undefined) {
    game.over = true
    return user + ' wins!' + 'Winning positions are: ' + winLine
  } else if (drawCheck(game.board)) {
    game.over = true
    return 'Game is a Draw!'
  } else {
    console.log(user + ' has played!')
    // Game continues-> switch to next player's turn
    game.user = turnSwitch(user)
    return game.user + ', now it\'s your turn!'
  }
}

// Commented out code below is for testing
// moveEntry(user, 4)

module.exports = {
  game,
  turnSwitch,
  moveEntry
}
