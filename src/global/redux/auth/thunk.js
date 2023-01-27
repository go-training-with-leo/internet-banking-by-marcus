import { createAsyncThunk } from '@reduxjs/toolkit';

import { resetPassword, sendOTP, signIn, signOut, verifyOtp } from './request';

const logIn = createAsyncThunk('auth/signIn', async (data) => {
  try {
    const { email, password } = data;
    const { user, role } = await signIn(email, password);
    return {
      status: true,
      data: user,
      role,
    };
  } catch ({ message }) {
    return {
      status: false,
      message,
    };
  }
});

const logOut = createAsyncThunk('auth/signOut', async () => {
  try {
    await signOut();
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const sendCode = createAsyncThunk('auth/sendOTP', async (data) => {
  try {
    const { email } = data;

    const message = await sendOTP(email);
    return {
      status: true,
      message,
      email,
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

export { logIn, logOut, resetPasswordAccount, sendCode, verifyCode };
