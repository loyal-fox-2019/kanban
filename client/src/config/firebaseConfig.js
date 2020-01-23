const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCLYfHIlsKhRiIgNcfrskPxWcO_ZG8uebQ',
  authDomain: 'kanban-432dd.firebaseapp.com',
  databaseURL: 'https://kanban-432dd.firebaseio.com',
  projectId: 'kanban-432dd',
  storageBucket: 'kanban-432dd.appspot.com',
  messagingSenderId: '131140423477',
  appId: '1:131140423477:web:4693ba64d9d46fc2b8867c',
  measurementId: 'G-ELB7DM1Q67',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

module.exports = db;
