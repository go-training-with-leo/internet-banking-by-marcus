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
  } catch (error) {
    return {
      status: false,
    };
  }
});

const sendCode = createAsyncThunk('auth/sendOtp', async (data) => {
  try {
    const message = await sendOtp(data.email);
    if (message === 'Success') {
      return {
        status: true,
      };
    }
    return {
      status: false,
      message: 'Email not found',
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
    if (message === 'You have been successfully registered') {
      return {
        status: true,
      };
    }
    // setError('otp', { type: 'custom', message: 'OTP Incorrect' });
    return {
      status: false,
      message: 'OTP Incorrect',
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

      await resetPassword(email, newPassword);
      return {
        status: true,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

export { logIn, resetPasswordAccount, sendCode, verifyCode };
