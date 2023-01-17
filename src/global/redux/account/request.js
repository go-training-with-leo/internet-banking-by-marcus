import api from 'services/api';
import { convertTimestamp } from 'utils/helpers';

const checkEmailExist = async (email) => {
  const {
    data: { message },
  } = await api.post('/exist-email', { email });

  return message;
};

const addNewEmpl = async ({ email, accountName, phoneNumber }) => {
  const { data: response } = await api.post('/new-employee', {
    email,
    accountName,
    phoneNumber,
    role: 'EMPLOYEE',
  });

  const accountInfo = {
    email: response.email,
    accountName: response.accountName,
    phoneNumber: response.phoneNumber,
    password: response.password,
  };

  return accountInfo;
};

const addNewCust = async ({ email, accountName, phoneNumber, balance }) => {
  const { data: response } = await api.post('/new-customer', {
    email,
    accountName,
    phoneNumber,
    balance,
    role: 'CUSTOMER',
  });

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

export { addNewCust, addNewEmpl, checkEmailExist };
