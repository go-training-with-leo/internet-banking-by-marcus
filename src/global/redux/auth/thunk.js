import { createAsyncThunk } from '@reduxjs/toolkit';

import { resetPassword, sendOtp, signIn, verifyOtp } from './request';

const logIn = createAsyncThunk('auth/signIn', async (data) => {
  try {
    const { email, password } = data;
    const userInfo = await signIn(email, password);
    return {
      status: true,
      data: userInfo,
    };
  } catch ({ message }) {
    console.warn(message);
    return {
      status: false,
      message,
    };
  }
});

const sendCode = createAsyncThunk('auth/sendOtp', async (data) => {
  try {
    const message = await sendOtp(data.email);
    return {
      status: true,
      message,
    };
  } catch ({ message }) {
    return {
      status: false,
      message,
    };
  }
});

const verifyCode = createAsyncThunk('auth/verifyOtp', async (data) => {
  try {
    const { email, otp } = data;

    const message = await verifyOtp(email, otp);
    return {
      status: true,
      message,
    };
  } catch ({ message }) {
    return {
      status: false,
      message,
    };
  }
});

const resetPasswordAccount = createAsyncThunk(
  'auth/resetPassword',
  async (data) => {
    try {
      const { email, newPassword } = data;

      const res = await resetPassword(email, newPassword);
      console.warn(res);
      return {
        status: true,
      };
    } catch (error) {
      console.warn(error);
      return {
        status: false,
      };
    }
  }
);

export { logIn, resetPasswordAccount, sendCode, verifyCode };
