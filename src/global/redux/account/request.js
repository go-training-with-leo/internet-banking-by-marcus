import axios from 'axios';

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
    'http://localhost:3000/new-account',
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

export { addNewEmpl, checkEmailExist };
