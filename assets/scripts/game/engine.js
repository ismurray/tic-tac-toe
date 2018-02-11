
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
    $(spotClass).text('[' + game.user + ']')
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
    gameUI.winMessage(user + ' wins! Winning positions are: ' + winLine)
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

// Takes all games data from api, determines whether active/ended, and
// whether win/loss/draw for each game. Prints stats to UI
const allGameStats = function (data) {
  allGames = data.games
  console.log('game data is: ', allGames)
  let won = 0
  let lost = 0
  let drew = 0
  let ended = 0
  let active = 0
  const total = allGames.length
  for (let i = 0; i < allGames.length; i++) {
    game.board = allGames[i].cells
    whoWon()
    if (allGames[i].over === false) {
      active++
    } else {
      ended++
      switch (game.winner) {
        case 'x':
          won++
          break
        case 'o':
          lost++
          break
        case 'draw':
          drew++
          break
      }
    }
  }
  let winRate = (won / ended) * 100
  if (won === 0) {
    winRate = 0
  }
  gameUI.textUpdateById('#total-games', total)
  gameUI.textUpdateById('#active-games', active)
  gameUI.textUpdateById('#ended-games', ended)
  gameUI.textUpdateById('#games-won', won)
  gameUI.textUpdateById('#games-lost', lost)
  gameUI.textUpdateById('#games-drawn', drew)
  gameUI.textUpdateById('#winrate', winRate)
}

module.exports = {
  moveEntry,
  game,
  createNewGame,
  loadApiGame,
  whoWon,
  allGameStats,
  drawCheck
}
