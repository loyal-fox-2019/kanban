import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyB2YzUU14kD0pbsQGIWyf0mmvUmPDtlxr8',
  authDomain: 'kanban-bdf75.firebaseapp.com',
  databaseURL: 'https://kanban-bdf75.firebaseio.com',
  projectId: 'kanban-bdf75',
  storageBucket: 'kanban-bdf75.appspot.com',
  messagingSenderId: '238944592738',
  appId: '1:238944592738:web:9109cdb09e78f72a8b023b'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
