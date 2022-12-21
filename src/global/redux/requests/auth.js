import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from 'services/firebase';

const authentication = {
	signIn: async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
};

export default authentication;
