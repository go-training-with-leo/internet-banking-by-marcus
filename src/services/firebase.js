import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCO_v5gJVp-tu2WGg7zK7pPMW-so0Kecfk',
	authDomain: 'assignment-one-fad14.firebaseapp.com',
	projectId: 'assignment-one-fad14',
	storageBucket: 'assignment-one-fad14.appspot.com',
	messagingSenderId: '96611995053',
	appId: '1:96611995053:web:f5bbe78af9d221c25ea524',
	measurementId: 'G-94VRNEXMMK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
