import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  addDebt as addDebtReq,
  getCreDebts as getCreDebtsReq,
  getRecDebts as getRecDebtsReq,
  searchContact as searchContactReq,
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

export { addDebt, getCreDebts, getRecDebts, searchContact };
