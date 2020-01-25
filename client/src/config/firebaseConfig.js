import firebase from 'firebase/app';
import 'firebase/firestore';

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

const db = firebase.firestore();

export default db;
