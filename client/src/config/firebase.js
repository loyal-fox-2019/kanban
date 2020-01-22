const firebase = require('firebase');
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAlMOaR9guk_vX2505tuM9DrJylS6FZqGw",
  authDomain: "kanban-7617d.firebaseapp.com",
  databaseURL: "https://kanban-7617d.firebaseio.com",
  projectId: "kanban-7617d",
  storageBucket: "kanban-7617d.appspot.com",
  messagingSenderId: "596214031759",
  appId: "1:596214031759:web:a753d9f41b7243c8eb97fa"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

export default db