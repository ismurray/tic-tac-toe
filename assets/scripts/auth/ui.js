'use strict'

const store = require('../store')
const gameUI = require('../game/ui')

const signUpSuccess = function (data) {
  $('#account-message').show()
  $('#account-message').text('Signed up successfully!')
  $('#account-message').css('background-color', '#5cb85c')
  $('#sign-up-button').click()
  $('#sign-up').find('input:text').val('')
  $('#sign-up').find('input:password').val('')
}

const signUpFailure = function (error) {
  $('#account-message').show()
  $('#account-message').text('Error on signing up')
  $('#account-message').css('background-color', '#d9534f')
  $('#sign-up-button').click()
  $('#sign-up').find('input:text').val('')
  $('#sign-up').find('input:password').val('')
  console.log(error)
}

const signInSuccess = function (data) {
  $('#account-message').show()
  $('#account-message').text('Signed in successfully!')
  $('#account-message').css('background-color', '#5cb85c')
  store.user = data.user
  console.log(store.user)
  $('#auth-wrapper').hide('slow')
  $('#account-wrapper').show('slow')
  $('#account-navbar').show('slow')
  $('#sign-in-button').click()
  $('#sign-in').find('input:text').val('')
  $('#sign-in').find('input:password').val('')
}

const signInFailure = function (error) {
  $('#account-message').show()
  $('#account-message').text('Error on signing in')
  $('#account-message').css('background-color', '#d9534f')
  $('#sign-in-button').click()
  $('#sign-in').find('input:text').val('')
  $('#sign-in').find('input:password').val('')
  console.log(error)
}

const changePasswordSuccess = function () {
  $('#account-page-message').show()
  $('#account-page-message').text('Password changed successfully!')
  $('#account-page-message').css('background-color', '#5cb85c')
  $('#change-password').find('input:text').val('')
  $('#change-password').find('input:password').val('')
}

const changePasswordFailure = function (error) {
  $('#account-page-message').show()
  $('#account-page-message').text('Error on changing password')
  $('#account-page-message').css('background-color', '#d9534f')
  $('#change-password').find('input:text').val('')
  $('#change-password').find('input:password').val('')
  console.log(error)
}

const signOutSuccess = function () {
  $('#account-message').show()
  $('#account-message').text('Signed out successfully!')
  $('#account-message').css('background-color', '#5cb85c')
  $('#auth-wrapper').show('slow')
  $('#account-wrapper').hide('slow')
  $('#game-wrapper').hide('slow')
  $('#account-navbar').hide('slow')

  // reset game stats
  gameUI.resetGameStats()
}

const signOutFailure = function (error) {
  $('#account-page-message').show()
  $('#account-page-message').text('Error on Signing Out')
  $('#account-page-message').css('background-color', '#d9534f')
  console.log(error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
