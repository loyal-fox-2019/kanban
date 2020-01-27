var firebase = require('firebase/app')

require ('firebase/auth')
require ('firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAm1jV4prN344hf8ZEbqN3934qvKiLh0os",
    authDomain: "kanban-7d393.firebaseapp.com",
    databaseURL: "https://kanban-7d393.firebaseio.com",
    projectId: "kanban-7d393",
    storageBucket: "kanban-7d393.appspot.com",
    messagingSenderId: "508642156809",
    appId: "1:508642156809:web:a40c64d5211b3c7deb73d8",
    measurementId: "G-NWK5FCWMQ4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  module.exports = firebase