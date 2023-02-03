import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllHistories,
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
      return {
        status: false,
      };
    }
  }
);

const getAllHistories = createAsyncThunk(
  'history/getAllHistories',
  async () => {
    try {
      const allHistories = await fetchAllHistories();
      return {
        status: true,
        allHistories,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

export {
  getAllHistories,
  getDebtHistories,
  getRecHistories,
  getTransfHistories,
};
