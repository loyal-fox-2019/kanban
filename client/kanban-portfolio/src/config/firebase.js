// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'
// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBG3cCR82NE3_q-BhcfuKhqU1x04jkYXRg',
  authDomain: 'kamban-riko.firebaseapp.com',
  databaseURL: 'https://kamban-riko.firebaseio.com',
  projectId: 'kamban-riko',
  storageBucket: 'kamban-riko.appspot.com',
  messagingSenderId: '919784215955',
  appId: '1:919784215955:web:9f9dd8f7ae1e52c6664466'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db
