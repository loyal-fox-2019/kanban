const firebase = require('firebase/app');

require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDZJtWWvaeB04jRnhQzOhw9fdVyeZn8yfo',
  authDomain: 'kanban-4340f.firebaseapp.com',
  databaseURL: 'https://kanban-4340f.firebaseio.com',
  projectId: 'kanban-4340f',
  storageBucket: 'kanban-4340f.appspot.com',
  messagingSenderId: '357627671355',
  appId: '1:357627671355:web:fe3b733746c287068f3d1e',
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
