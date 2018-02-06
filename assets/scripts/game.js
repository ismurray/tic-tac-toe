'use strict'

const brd = ['', '', '', '', '', '', '', '', '']

const play = function (brd, user, index) {
  brd[index] = user
  return brd
}

const drawCheck = function (brd) {
  let draw = true
  for (let i = 0; i < brd.length; i++) {
    if (brd[i] === '') {
      draw = false
    }
  }
  return draw
}

const allMatch = function (brd, winGroup, user) {
  let win = winGroup.every(index => brd[index] === user)
  return win
}

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
