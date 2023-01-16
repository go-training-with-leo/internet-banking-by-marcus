import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNewEmpl, checkEmailExist } from './request';

const existEmail = createAsyncThunk('account/existEmail', async (data) => {
  try {
    const { email } = data;
    const message = await checkEmailExist(email);

    return {
      status: true,
      message,
      email,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
});

const addNewEmployee = createAsyncThunk('account/addNewEmpl', async (data) => {
  try {
    const { email, accountName, phoneNumber } = data;

    const accountInfo = await addNewEmpl({ email, accountName, phoneNumber });
    console.warn(accountInfo);
    return {
      status: true,
      ...accountInfo,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

export { addNewEmployee, existEmail };
