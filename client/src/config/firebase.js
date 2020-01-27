import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBFA7VubkNoOn3S_hT-x5UzoMxmgA_H7gI',
  authDomain: 'portofolioproject.firebaseapp.com',
  databaseURL: 'https://portofolioproject.firebaseio.com',
  projectId: 'portofolioproject',
  storageBucket: 'portofolioproject.appspot.com',
  messagingSenderId: '389858522728',
  appId: '1:389858522728:web:d385b19063604aacfb2ddd',
  measurementId: 'G-606SNM9S7Q',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
