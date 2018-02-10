'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#account-message').text('Signed up successfully!')
  $('#account-message').css('background-color', 'green')
}

const signUpFailure = function (error) {
  $('#account-message').text('Error on signing up')
  $('#account-message').css('background-color', 'red')
  console.log(error)
}

const signInSuccess = function (data) {
  $('#account-message').text('Signed in successfully!')
  $('#account-message').css('background-color', 'green')
  store.user = data.user
  console.log(store.user)
  $('#auth-wrapper').hide('slow')
  $('#account-wrapper').show('slow')
}

const signInFailure = function (error) {
  $('#account-message').text('Error on signing in')
  $('#account-message').css('background-color', 'red')
  console.log(error)
}

const changePasswordSuccess = function () {
  $('#account-message').text('Password changed successfully!')
  $('#account-message').css('background-color', 'green')
}

const changePasswordFailure = function (error) {
  $('#account-message').text('Error on changing password')
  $('#account-message').css('background-color', 'red')
  console.log(error)
}

const signOutSuccess = function () {
  $('#account-message').text('Signed out successfully!')
  $('#account-message').css('background-color', 'green')
  $('#auth-wrapper').show('slow')
  $('#account-wrapper').hide('slow')
}

const signOutFailure = function (error) {
  $('#account-message').text('Error on Signing Out')
  $('#account-message').css('background-color', 'red')
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
