import api from 'services/api';
import { auth } from 'services/firebase';
import {
  signInWithEmailAndPassword,
  signOut as signOutUser,
} from 'firebase/auth';
import {
  modifyLocalStorage,
  queryDocs,
  removeLocalStorage,
} from 'utils/helpers';

const signIn = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const getRole = await queryDocs({
    path: 'accounts',
    field: 'email',
    value: email,
  });

  const { role } = getRole[0];
  modifyLocalStorage('role', role);
  const accountData = {
    user,
  };
  return accountData;
};

const signOut = () => {
  signOutUser(auth);
  removeLocalStorage('role');
};

const sendOTP = async (email) => {
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
  const res = await api.post('/reset-password', { email, password });
  return res;
};

export { resetPassword, sendOTP, signIn, signOut, verifyOtp };
