import firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDjU8ffKV72f2lMBiuLmolPWTAxyVPPyAM",
    authDomain: "kanban-on-fire.firebaseapp.com",
    databaseURL: "https://kanban-on-fire.firebaseio.com",
    projectId: "kanban-on-fire",
    storageBucket: "kanban-on-fire.appspot.com",
    messagingSenderId: "700513586872",
    appId: "1:700513586872:web:beedbbf09d3877782dee4d"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;