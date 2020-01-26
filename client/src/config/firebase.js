import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBFA7VubkNoOn3S_hT-x5UzoMxmgA_H7gI',
  authDomain: 'portofolioproject.firebaseapp.com',
  databaseURL: 'https://portofolioproject.firebaseio.com',
  projectId: 'portofolioproject',
  storageBucket: 'portofolioproject.appspot.com',
  messagingSenderId: '389858522728',
  appId: '1:389858522728:web:2e5d807d6c591303fb2ddd',
  measurementId: 'G-5G5E6CF2C6',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
