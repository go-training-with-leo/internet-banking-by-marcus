import api from 'services/api';
import { auth } from 'services/firebase';
import {
  signInWithEmailAndPassword,
  signOut as signOutUser,
} from 'firebase/auth';

const signIn = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

const signOut = () => {
  signOutUser(auth);
};

const sendOtp = async (email) => {
  const {
    data: { message },
  } = await api.post('/get', {
    email,
  });
  return message;
};

const verifyOtp = async (email, otp) => {
  const {
    data: { message },
  } = await api.post('/verify', { email, otp });
  return message;
};

const resetPassword = async (email, password) => {
  await api.post('/resetPassword', { email, password });
};

export { resetPassword, sendOtp, signIn, signOut, verifyOtp };
