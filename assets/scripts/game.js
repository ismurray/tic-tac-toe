'use strict'

const brd = ['', '', '', '', '', '', '', '', '']

const play = function (user, index) {
  brd[index] = user
  return brd
}

const drawCheck = function () {
  let draw = true
  for (let i = 0; i < brd.length; i++) {
    if (brd[i] === '') {
      draw = false
    }
  }
  return draw
}

// play('x', 0)
// play('x', 1)
// play('x', 2)
// play('x', 3)
// play('x', 4)
// play('x', 5)
// play('x', 6)
// play('x', 7)
// play('x', 8)
// drawCheck()
