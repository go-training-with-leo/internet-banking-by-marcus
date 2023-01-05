import { createAsyncThunk } from '@reduxjs/toolkit';

import { resetPassword, sendOtp, signIn, verifyOtp } from './request';

const logIn = createAsyncThunk('auth/signin', async (data) => {
  const { email, password } = data;
  try {
    const res = await signIn(email, password);
    return {
      status: true,
      data: res.data,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const sendCode = createAsyncThunk('auth/send-otp', async (data) => {
  try {
    const res = await sendOtp(data.email);
    if (res.data.message === 'Success') {
      data.setStep((prev) => prev + 1);
    } else {
      data.setError('email', {
        type: 'custom',
        message: 'Email not found',
      });
    }
    return {
      status: true,
      data: res.data,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const verifyCode = createAsyncThunk('auth/verify-otp', async (data) => {
  try {
    const { email, otp, setStep, setError } = data;

    const res = await verifyOtp(email, otp);
    if (res.data.message === 'You have been successfully registered') {
      setStep((prev) => prev + 1);
    } else {
      setError('otp', { type: 'custom', message: 'OTP Incorrect' });
    }
    return {
      status: true,
      data: res.data,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const resetPasswordAccount = createAsyncThunk(
  'auth/reset-password',
  async (data) => {
    try {
      const { email, new_password, setStep } = data;

      const res = await resetPassword(email, new_password);
      setStep((prev) => prev + 1);
      return {
        status: true,
        data: res.data,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

export { logIn, resetPasswordAccount, sendCode, verifyCode };
