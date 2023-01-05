import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import api from 'services/api';

import { auth } from 'services/firebase';

const signIn = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

const signOutUser = () => {
  signOut(auth);
};

const sendOtp = async (email) => {
  const res = await api.post('/get', {
    email,
  });

  return res;
};

const verifyOtp = async (email, otp) => {
  const res = await api.post('/verify', { email, otp });

  return res;
};

const resetPassword = async (email, password) => {
  const res = await api.post('/reset-password', { email, password });
  return res;
};

export { resetPassword, sendOtp, signIn, signOutUser, verifyOtp };
