const firebase = require('firebase');
const firebaseui = require('firebaseui');

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default {ui, firebase}