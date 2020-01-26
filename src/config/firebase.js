import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyDw4MJ8ZUCd9JBsPCnxsqq00sdVH3LXi1U',
  authDomain: 'kanban-98c57.firebaseapp.com',
  databaseURL: 'https://kanban-98c57.firebaseio.com',
  projectId: 'kanban-98c57',
  storageBucket: 'kanban-98c57.appspot.com',
  messagingSenderId: '1075810174733',
  appId: '1:1075810174733:web:e61d5e1cf995f6690f1244'
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default db
