import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  addDebt as addDebtReq,
  deleteDebt as deleteDebtReq,
  getCreDebts as getCreDebtsReq,
  getRecDebts as getRecDebtsReq,
  paymentDebt as paymentDebtReq,
  searchContact as searchContactReq,
  sendOTP,
  verifyOTP,
} from './request';

const searchContact = createAsyncThunk('debt/searchContact', async (data) => {
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
});

const addDebt = createAsyncThunk('debt/addDebt', async (data) => {
  try {
    const { message, debt } = await addDebtReq(data);
    return {
      status: true,
      message,
      debt,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const getCreDebts = createAsyncThunk('debt/getCreDebts', async (data) => {
  try {
    const { cardNumber } = data;

    const creDebts = await getCreDebtsReq(cardNumber);
    return {
      status: true,
      creDebts,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const getRecDebts = createAsyncThunk('debt/getRecDebts', async (data) => {
  try {
    const { cardNumber } = data;

    const recDebts = await getRecDebtsReq(cardNumber);
    return {
      status: true,
      recDebts,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const deleteDebt = createAsyncThunk('debt/deleteDebt', async (data) => {
  try {
    const { id, reason } = data;
    const { status: statusDebt } = await deleteDebtReq({ id, reason });
    return {
      status: true,
      responseDebt: {
        id,
        status: statusDebt,
        reason,
      },
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const sendCode = createAsyncThunk('debt/sendOTP', async (data) => {
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

const verifyCode = createAsyncThunk('debt/verifyOtp', async (data) => {
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

const paymentDebt = createAsyncThunk('debt/paymentDebt', async (data) => {
  try {
    const { debtDetail } = data;
    const debt = await paymentDebtReq(debtDetail);
    return {
      status: true,
      debt,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

export {
  addDebt,
  deleteDebt,
  getCreDebts,
  getRecDebts,
  paymentDebt,
  searchContact,
  sendCode,
  verifyCode,
};
