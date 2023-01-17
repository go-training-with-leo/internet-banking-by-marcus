import axios from 'axios';
import { convertTimestamp } from 'utils/helpers';

const checkEmailExist = async (email) => {
  const {
    data: { message },
  } = await axios.post('http://localhost:3000/exist-email', {
    email,
  });

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

export { addNewCust, addNewEmpl, checkEmailExist };
