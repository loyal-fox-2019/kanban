import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAAQjLBl8x3NmSqzQFVxWeM3JmbFZLDrI0',
  authDomain: 'kanban-fajri.firebaseapp.com',
  databaseURL: 'https://kanban-fajri.firebaseio.com',
  projectId: 'kanban-fajri',
  storageBucket: 'kanban-fajri.appspot.com',
  messagingSenderId: '632901644359',
  appId: '1:632901644359:web:2455c9af20100400584162'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db
