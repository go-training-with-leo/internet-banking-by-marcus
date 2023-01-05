import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from 'services/firebase';

const authentication = {
  signIn: async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  },
  signOut: () => {
    signOut(auth);
  },
};

export default authentication;
