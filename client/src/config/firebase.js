import * as firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyCN9Vo5gSPB2zzFBr4VX65vOZJWlo7EABs',
  authDomain: 'kanmarz.firebaseapp.com',
  databaseURL: 'https://kanmarz.firebaseio.com',
  projectId: 'kanmarz',
  storageBucket: 'kanmarz.appspot.com',
  messagingSenderId: '81155271797',
  appId: '1:81155271797:web:27ad9a80a4ab7b60ed5c3c'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
let db = firebase.firestore()

export default db
