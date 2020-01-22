import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: "https://new-kanban-2f637.firebaseio.com",
  projectId: process.env.PROJECT_ID,
  storageBucket: "new-kanban-2f637.appspot.com",
  messagingSenderId: "258631663468",
  appId: "1:258631663468:web:396a00156c4b9dea14bd49"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db