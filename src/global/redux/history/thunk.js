import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecHistory, fetchTransfHistory } from './request';

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
      return {
        status: false,
      };
    }
  }
);

export { getRecHistories, getTransfHistories };
