import axios from 'axios';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import api from 'services/api';
import { auth } from 'services/firebase';
import { convertTimestamp, getAllDocsInColl, queryDocs } from 'utils/helpers';

const checkEmailExist = async (email) => {
  const {
    data: { message },
  } = await api.post('/exist-email', { email });

  return message;
};

const addNewEmpl = async ({ email, accountName, phoneNumber }) => {
  const { data: response } = await axios.post(
    'http://localhost:3000/new-employee',
    {
      email,
      accountName,
      phoneNumber,
      role: 'EMPLOYEE',
    }
  );

  const accountInfo = {
    email: response.email,
    accountName: response.accountName,
    phoneNumber: response.phoneNumber,
    password: response.password,
  };

  return accountInfo;
};

const addNewCust = async ({ email, accountName, phoneNumber, balance }) => {
  const { data: response } = await axios.post(
    'http://localhost:3000/new-customer',
    {
      email,
      accountName,
      phoneNumber,
      balance,
      role: 'CUSTOMER',
    }
  );

  const accountInfo = {
    email: response.email,
    accountName: response.accountName,
    phoneNumber: response.phoneNumber,
    password: response.password,
    balance: response.balance,
    cardNumber: response.cardNumber,
    createdAt: convertTimestamp(response.createdAt),
  };

  return accountInfo;
};

const getCustAccounts = async () => {
  const custAccounts = await queryDocs({
    path: 'accounts',
    field: 'role',
    value: 'CUSTOMER',
  });
  const payingCards = await getAllDocsInColl('payingCards');
  const accountInfo = custAccounts.map((customer) => ({
    ...customer,
    ...payingCards.find((payingCard) => payingCard.id === customer.id),
  }));

  return accountInfo;
};

const getCustAccount = async (email) => {
  const custAccount = await queryDocs({
    path: 'accounts',
    field: 'email',
    value: email,
  });
  return custAccount.length > 0 ? custAccount[0] : null;
};

const rechargeMoney = async ({ id, balance }) => {
  const {
    data: { message },
  } = await api.post('/recharge-money', {
    id,
    balance,
  });

  return message;
};

const updatePwd = async ({ currentPassword, newPassword }) => {
  const user = auth.currentUser;

  const cred = EmailAuthProvider.credential(user?.email, currentPassword);
  await reauthenticateWithCredential(user, cred);
  await updatePassword(auth.currentUser, newPassword);
};

export {
  addNewCust,
  addNewEmpl,
  checkEmailExist,
  getCustAccount,
  getCustAccounts,
  rechargeMoney,
  updatePwd,
};
