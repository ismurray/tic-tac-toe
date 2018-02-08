'use strict'

// const events = require('./events.js')
const config = require('../config.js')

const signUp = function (data) {
  console.log('inside signUp is ', data)
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

const signIn = function (data) {
  console.log('inside signIn is ', data)
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

module.exports = {
  signUp,
  signIn
}
