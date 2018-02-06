'use strict'

const brd = ['', '', '', '', '', '', '', '', '']

// writes player input to board
const play = function (brd, user, index) {
  brd[index] = user
  return brd
}

// returns true if board is a draw
const drawCheck = function (brd) {
  let draw = true
  for (let i = 0; i < brd.length; i++) {
    if (brd[i] === '') {
      draw = false
    }
  }
  return draw
}

// Checks if a single win condition has been met by a given user
const allMatch = function (brd, winGroup, user) {
  const win = winGroup.every(index => brd[index] === user)
  return win
}

// Checks if any win conditions have been met by a given user, returns the line
// of the first win found, returns undefined if no win conditions met
// TODO add ability to return multiple wins if the wining move is a combo
const findWin = function (brd, winGroups, user) {
  for (let i = 0; i < winGroups.length; i++) {
    if (allMatch(brd, winGroups[i], user)) {
      return winGroups[i]
    }
  }
}

// const winGroups = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6]
// ]
//
// play(brd, 'x', 0)
// play(brd, 'x', 1)
// play(brd, 'x', 2)
// findWin(brd, winGroups, 'x')

// const winCheck = function (brd, user) {
//   let win = false
  // const winGroups = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6]
  // ]
//   for (let i = 0; i < winGroups.length; i++) {
//     for (let n = 0; n < winGroups[i].length; n++) {
//       if (winGroups[i][n] !== )
//     }
//   }
// }

// play(brd, 'x', 0)
// play(brd, 'x', 0)
// play(brd, 'o', 1)
// play(brd, 'x', 2)
// play('x', 1)
// play('x', 2)
// play('x', 3)
// play('x', 4)
// play('x', 5)
// play('x', 6)
// play('x', 7)
// play('x', 8)
// drawCheck()
