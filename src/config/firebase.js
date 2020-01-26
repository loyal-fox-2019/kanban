import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyALesM1oaNCbc6b3UrUE6m_LtxRn8Br_VY",
    authDomain: "kanban-54894.firebaseapp.com",
    databaseURL: "https://kanban-54894.firebaseio.com",
    projectId: "kanban-54894",
    storageBucket: "kanban-54894.appspot.com",
    messagingSenderId: "569359821851",
    appId: "1:569359821851:web:f626177829b587c3175cbe"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;