import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addNewEmpl,
  addNewCust,
  checkEmailExist,
  getCustAccounts,
  rechargeMoney as rechargeMoneyReq,
} from './request';

const existEmail = createAsyncThunk('account/existEmail', async (data) => {
  try {
    const { email } = data;
    const message = await checkEmailExist(email);

    return {
      status: true,
      message,
      email,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
});

const addNewEmployee = createAsyncThunk(
  'account/addNewEmployee',
  async (data) => {
    try {
      const { email, accountName, phoneNumber } = data;

      const accountInfo = await addNewEmpl({
        email,
        accountName,
        phoneNumber,
      });

      return {
        status: true,
        ...accountInfo,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

const addNewCustomer = createAsyncThunk(
  'account/addNewCustomer',
  async (data) => {
    try {
      const { email, accountName, phoneNumber, balance } = data;

      const accountInfo = await addNewCust({
        email,
        accountName,
        phoneNumber,
        balance,
      });

      return {
        status: true,
        ...accountInfo,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

const getCustomerAccounts = createAsyncThunk(
  'account/getCustomers',
  async () => {
    try {
      const customerAccounts = await getCustAccounts();

      return {
        status: true,
        customerAccounts,
      };
    } catch (error) {
      console.warn(error.message);
      return {
        status: false,
      };
    }
  }
);

const rechargeMoney = createAsyncThunk(
  'account/rechargeMoney',
  async (data) => {
    try {
      const { id, balance } = data;

      const message = await rechargeMoneyReq({ id, balance });

      return {
        status: true,
        message,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

export {
  addNewCustomer,
  addNewEmployee,
  existEmail,
  getCustomerAccounts,
  rechargeMoney,
};
