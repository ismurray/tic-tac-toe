
'use strict'

const gameUI = require('./ui.js')
const gameAPI = require('./api.js')
const store = require('../store')
const numEngine = require('./numberEngine')

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

let allGames = {}

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
  // const winLine = findWin(game.board, game.winGroups, game.winner)
  // if (winLine !== undefined) {
  //   const winText = 'Game Loaded! Player ' + game.winner + ' won this game!'
  //   gameUI.winMessage(winText, winLine)
  //   debugger
  // }
  // set visual board to match API board
  gameUI.getAGameSuccess(game)
}

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
    gameUI.movePlayFailure('You can\'t keep playing after the game is over. Start a new game!')
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
    $(spotClass).text(game.user)
    // update API board
    gameAPI.updateBoard(index, game.user, false)
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
    gameAPI.updateBoard(index, game.user, true)
    gameUI.movePlaySuccess('')
    const winText = user + ' wins!'
    gameUI.winMessage(winText, winLine, '#mark')
  } else if (drawCheck(game.board)) {
    game.over = true
    // update API game to over
    gameAPI.updateBoard(index, game.user, true)
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

const isGameClassic = function (value, index, array) {
  const cells = value.cells
  if (cells.some(spot => spot === 'x') | cells.some(spot => spot === 'x')) {
    return true
  }
}

const isGameNumeric = function (value, index, array) {
  const cells = value.cells
  if (cells.some(spot => spot === '1') |
  cells.some(spot => spot === '2') |
  cells.some(spot => spot === '3') |
  cells.some(spot => spot === '4') |
  cells.some(spot => spot === '5') |
  cells.some(spot => spot === '6') |
  cells.some(spot => spot === '7') |
  cells.some(spot => spot === '8') |
  cells.some(spot => spot === '9') |
  cells.some(spot => spot === '10')) {
    return true
  }
}

// Takes all games data from api, determines whether active/ended, and
// whether win/loss/draw for each game. Prints stats to UI
const allGameStats = function (data) {
  allGames = data.games
  console.log('game data is: ', allGames)
  let wonClassic = 0
  let lostClassic = 0
  let drewClassic = 0
  let endedClassic = 0
  let activeClassic = 0
  let wonNumeric = 0
  let lostNumeric = 0
  let drewNumeric = 0
  let endedNumeric = 0
  let activeNumeric = 0
  const total = allGames.length
  // sort classic games vs numeric games
  const classicGames = allGames.filter(isGameClassic)
  console.log(classicGames)
  const numericGames = allGames.filter(isGameNumeric)
  console.log(numericGames)

  const totalClassic = classicGames.length
  const totalNumeric = numericGames.length
  const totalUnassigned = allGames.length - numericGames.length - classicGames.length

  // calculate classic stats
  for (let i = 0; i < classicGames.length; i++) {
    game.board = classicGames[i].cells
    whoWon()
    if (classicGames[i].over === false) {
      activeClassic++
    } else {
      endedClassic++
      switch (game.winner) {
        case 'x':
          wonClassic++
          break
        case 'o':
          lostClassic++
          break
        case 'draw':
          drewClassic++
          break
      }
    }
  }
  let winRateClassic = Math.round((wonClassic / endedClassic) * 100)
  if (wonClassic === 0) {
    winRateClassic = 0
  }
  // calculate numeric stats
  for (let i = 0; i < numericGames.length; i++) {
    game.board = numericGames[i].cells
    game.winner = numEngine.whoWonNum(game.board)
    if (numericGames[i].over === false) {
      activeNumeric++
    } else {
      endedNumeric++
      switch (game.winner) {
        case 'x':
          wonNumeric++
          break
        case 'o':
          lostNumeric++
          break
        case 'draw':
          drewNumeric++
          break
      }
    }
  }
  let winRateNumeric = Math.round((wonNumeric / endedNumeric) * 100)
  if (wonNumeric === 0) {
    winRateNumeric = 0
  }
  gameUI.textUpdateById('.total-games', total)
  gameUI.textUpdateById('.total-unassigned', totalUnassigned)
  gameUI.textUpdateById('#total-games-classic', totalClassic)
  gameUI.textUpdateById('#active-games-classic', activeClassic)
  gameUI.textUpdateById('#ended-games-classic', endedClassic)
  gameUI.textUpdateById('#games-won-classic', wonClassic)
  gameUI.textUpdateById('#games-lost-classic', lostClassic)
  gameUI.textUpdateById('#games-drawn-classic', drewClassic)
  gameUI.textUpdateById('#winrate-classic', winRateClassic)

  gameUI.textUpdateById('#total-games-numeric', totalNumeric)
  gameUI.textUpdateById('#active-games-numeric', activeNumeric)
  gameUI.textUpdateById('#ended-games-numeric', endedNumeric)
  gameUI.textUpdateById('#games-won-numeric', wonNumeric)
  gameUI.textUpdateById('#games-lost-numeric', lostNumeric)
  gameUI.textUpdateById('#games-drawn-numeric', drewNumeric)
  gameUI.textUpdateById('#winrate-numeric', winRateNumeric)

  console.log('#total-unassigned', totalUnassigned)

}

module.exports = {
  moveEntry,
  game,
  createNewGame,
  loadApiGame,
  whoWon,
  allGameStats,
  drawCheck,
  findWin
}
