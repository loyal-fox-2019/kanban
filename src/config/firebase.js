const firebase = require('firebase/app')
require('firebase/firestore')
// require('dotenv').config()

const firebaseConfig = {
    apiKey: "AIzaSyAqby0nuYy6n95nZYT1inJ4D3l6HduavPU",
    authDomain: "kanban-91c05.firebaseapp.com",
    projectId:"kanban-91c05"
    
}


firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
module.exports = db

