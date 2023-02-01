import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchDebtHistory,
  fetchRecHistory,
  fetchTransfHistory,
} from './request';

const getRecHistories = createAsyncThunk(
  'history/getRecHistories',
  async (data) => {
    try {
      const { cardNumber } = data;
      const recHistories = await fetchRecHistory(cardNumber);
      return {
        status: true,
        recHistories,
      };
    } catch (error) {
      console.warn(error.message);
      return {
        status: false,
      };
    }
  }
);

const getTransfHistories = createAsyncThunk(
  'history/getTransfHistories',
  async (data) => {
    try {
      const { cardNumber } = data;
      const transfHistories = await fetchTransfHistory(cardNumber);
      return {
        status: true,
        transfHistories,
      };
    } catch (error) {
      console.warn(error.message);
      return {
        status: false,
      };
    }
  }
);

const getDebtHistories = createAsyncThunk(
  'history/getDebtHistories',
  async (data) => {
    try {
      const { cardNumber } = data;
      const debtHitories = await fetchDebtHistory(cardNumber);
      return {
        status: true,
        debtHitories,
      };
    } catch (error) {
      console.warn(error.message);
      return {
        status: false,
      };
    }
  }
);

export { getDebtHistories, getRecHistories, getTransfHistories };
