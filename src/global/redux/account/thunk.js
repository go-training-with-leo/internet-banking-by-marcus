import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkEmailExist } from './request';

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

export { existEmail };
