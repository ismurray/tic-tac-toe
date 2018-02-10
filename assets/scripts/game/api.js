'use strict'

const store = require('../store')
const config = require('../config.js')
// const engine = require('./engine.js')

const startGame = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getGames = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getAGame = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getEndedGames = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/games?over=true',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getActiveGames = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/games?over=false',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateBoard = function (index, user, over) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.gameId,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': index,
          'value': user
        },
        'over': over
      }
    }
  })
}

module.exports = {
  startGame,
  getGames,
  getAGame,
  getEndedGames,
  getActiveGames,
  updateBoard
}

// '{"game": {"cell": {"index": ' + index + ', "value": "' + user + '"}, "over": ' + over + '}'
