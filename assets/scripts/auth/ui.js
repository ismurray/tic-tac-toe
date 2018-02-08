'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#account-message').text('Signed up successfully!')
  $('#account-message').css('background-color', 'green')
  console.log(data)
}

const signUpFailure = function (error) {
  $('#account-message').text('Error on signing up')
  $('#account-message').css('background-color', 'red')
  console.log(error)
}

const signInSuccess = function (data) {
  $('#account-message').text('Signed in successfully!')
  $('#account-message').css('background-color', 'green')
  console.log(data)
  store.user = data.user
  console.log(store.user)
}

const signInFailure = function (error) {
  $('#account-message').text('Error on signing in')
  $('#account-message').css('background-color', 'red')
  console.log(error)
}

const signOutSuccess = function () {
  $('#account-message').text('Signed out successfully!')
  $('#account-message').css('background-color', 'green')
  console.log('signout success')
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
  signOutFailure
}
