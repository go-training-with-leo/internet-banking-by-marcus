import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { auth } from 'services/firebase';

const authentication = {
	signIn: (email, password) => {
		signInWithEmailAndPassword(auth, email, password);
	},

	forgotPassword: async (email) => {
		sendPasswordResetEmail(auth, email);
	},

	signOut: () => {
		signOut(auth);
	},
};

export default authentication;
