const firebase = require('firebase');
// Required for side-effects
require("firebase/firestore");
require("firebase/auth");

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIRESTORE,
  authDomain: `${process.env.VUE_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.VUE_APP_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket:  `${process.env.VUE_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: "596214031759",
  appId: process.env.VUE_APP_APPID
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

export default db