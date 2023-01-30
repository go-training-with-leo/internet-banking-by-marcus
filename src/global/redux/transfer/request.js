import axios from 'axios';
import api from 'services/api';
import { getDocFireStore, queryDocs } from 'utils/helpers';

const searchContact = async (cardNumber) => {
  const searchedContact = await queryDocs({
    path: 'payingCards',
    field: 'cardNumber',
    value: cardNumber,
  });
  const { id: uid } = searchedContact[0] || null;

  const { accountName } = await getDocFireStore({
    path: 'accounts',
    id: uid,
  });

  return searchedContact
    ? { ...searchedContact[0], contactName: accountName }
    : null;
};

const sendOTP = async (email) => {
  const {
    data: { message },
  } = await api.post('/get', {
    email,
  });
  return message;
};

const verifyOTP = async ({ email, otp }) => {
  const {
    data: { message },
  } = await api.post('/verify', { email, otp });
  return message;
};

const transfer = async (transferInfo) => {
  const {
    data: { message, createdAt },
  } = await axios.post('http://localhost:3000/transfer', transferInfo);

  return { message, createdAt };
};

export { searchContact, sendOTP, transfer, verifyOTP };
