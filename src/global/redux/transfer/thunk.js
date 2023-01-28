import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  searchContact as searchContactReq,
  sendOTP,
  verifyOTP,
  transfer as transferReq,
} from './request';

const searchContact = createAsyncThunk(
  'contact/searchContact',
  async (data) => {
    try {
      const { cardNumber } = data;

      const contact = await searchContactReq(cardNumber);
      return {
        status: true,
        contact,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

const sendCode = createAsyncThunk('transfer/sendOTP', async (data) => {
  try {
    const { email } = data;

    const message = await sendOTP(email);
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

const verifyCode = createAsyncThunk('transfer/verifyOtp', async (data) => {
  try {
    const { email, otp } = data;

    const message = await verifyOTP({ email, otp });
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

const transfer = createAsyncThunk('transfer/chargedMoney', async (data) => {
  try {
    const { transferInfo } = data;
    const { message, createdAt } = await transferReq(transferInfo);

    return {
      status: true,
      message,
      transferInfo,
      createdAt,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

export { searchContact, sendCode, transfer, verifyCode };
