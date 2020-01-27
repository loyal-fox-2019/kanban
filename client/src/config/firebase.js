// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey            : 'AIzaSyBH5ELOTXoqveG5husMZUwMfJCLHZ58QC8',
	authDomain        : 'kanban-3fe4b.firebaseapp.com',
	databaseURL       : 'https://kanban-3fe4b.firebaseio.com',
	projectId         : 'kanban-3fe4b',
	storageBucket     : 'kanban-3fe4b.appspot.com',
	messagingSenderId : '415595463210',
	appId             : '1:415595463210:web:981462e56f6dd614fb7953',
	measurementId     : 'G-NDNQ1G2MBV'
};

import firebase from 'firebase/app';
import 'firebase/firestore';

const data = firebase.initializeApp(firebaseConfig);

const db = data.firestore();

export default db;
