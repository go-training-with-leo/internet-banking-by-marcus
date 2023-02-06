import { v4 as uuidv4 } from 'uuid';
import { serverTimestamp } from 'firebase/firestore';

import api from 'services/api';
import {
  getDocFireStore,
  queryDocs,
  queryOrderDocs,
  setDocFirestore,
  updateDocFireStore,
} from 'utils/helpers';

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

const addDebt = async (debtInfo) => {
  const {
    data: { message, debt },
  } = await api.post('/add-debt', debtInfo);

  return { message, debt };
};

const getCreDebts = async (cardNumber) => {
  const creDebts = await queryOrderDocs({
    path: 'debts',
    field: 'from.cardNumber',
    value: cardNumber,
    orderField: 'createdAt',
  });

  return creDebts;
};

const getRecDebts = async (cardNumber) => {
  const recDebts = await queryOrderDocs({
    path: 'debts',
    field: 'dest.cardNumber',
    value: cardNumber,
    orderField: 'createdAt',
  });

  return recDebts;
};

const deleteDebt = async ({ id, reason }) => {
  await updateDocFireStore({
    collect: 'debts',
    id,
    value: { reason, status: 'pending' },
  });
  return {
    status: 'pending',
  };
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

const paymentDebt = async (debtInfo) => {
  const {
    data: { debt },
  } = await api.post('/payment-debt', { ...debtInfo });

  return debt;
};

const rejectDebt = async (id) => {
  await updateDocFireStore({
    collect: 'debts',
    id,
    value: { status: 'unpaid' },
  });
  return {
    status: 'unpaid',
  };
};

const approveDebt = async (detailData) => {
  await updateDocFireStore({
    collect: 'debts',
    id: detailData?.id,
    value: { status: 'success' },
  });
  await setDocFirestore({
    collect: 'histories',
    id: uuidv4(),
    data: {
      ...detailData,
      createdAt: serverTimestamp(),
      status: 'success',
      type: 'DEBT',
    },
  });
  return {
    status: 'success',
  };
};

export {
  addDebt,
  approveDebt,
  deleteDebt,
  getCreDebts,
  getRecDebts,
  paymentDebt,
  rejectDebt,
  searchContact,
  sendOTP,
  verifyOTP,
};
