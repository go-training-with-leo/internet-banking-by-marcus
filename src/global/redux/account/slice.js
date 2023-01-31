import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';
import {
  addNewCustomer,
  addNewEmployee,
  existEmail,
  getCustAccount,
  getCustomerAccounts,
  rechargeMoney,
  updatePassword,
} from './thunk';

const account = createSlice({
  name: 'account',
  initialState: {
    accounts: [],
    newAccount: {},
    currentAccount: {},
    isLoading: false,
    isFetched: false,
  },
  reducers: {
    updateAccount: (state, action) => {
      state.newAccount = { ...state.newAccount, ...action.payload };
    },
    resetAccount: (state) => {
      state.newAccount = {};
    },
  },
  extraReducers: {
    [existEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [existEmail.rejected]: (state) => {
      state.isLoading = false;
    },
    [existEmail.fulfilled]: (state, action) => {
      state.newAccount = { ...state.newAccount, email: action.payload?.email };
      state.isLoading = false;
    },
    [addNewEmployee.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewEmployee.rejected]: (state) => {
      state.isLoading = false;
    },
    [addNewEmployee.fulfilled]: (state, action) => {
      state.newAccount = { ...state.newAccount, ...action.payload };
      state.isLoading = false;
    },
    [addNewCustomer.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewCustomer.rejected]: (state) => {
      state.isLoading = false;
    },
    [addNewCustomer.fulfilled]: (state, action) => {
      state.newAccount = { ...state.newAccount, ...action.payload };
      state.accounts = [...state.accounts, state.newAccount];
      state.isLoading = false;
    },
    [getCustomerAccounts.pending]: (state) => {
      state.isLoading = true;
    },
    [getCustomerAccounts.rejected]: (state) => {
      state.isLoading = false;
    },
    [getCustomerAccounts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.accounts = [...action.payload.customerAccounts];
    },

    [rechargeMoney.pending]: (state) => {
      state.isLoading = true;
    },
    [rechargeMoney.rejected]: (state) => {
      state.isLoading = false;
    },
    [rechargeMoney.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [getCustAccount.pending]: (state) => {
      state.isLoading = true;
    },
    [getCustAccount.rejected]: (state) => {
      state.isLoading = false;
    },
    [getCustAccount.fulfilled]: (state, action) => {
      state.currentAccount = { ...action.payload.account };
      state.isLoading = false;
      state.isFetched = true;
    },
    [updatePassword.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePassword.rejected]: (state) => {
      state.isLoading = false;
    },
    [updatePassword.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [logOut.fulfilled]: (state) => {
      state.accounts = [];
      state.currentAccount = {};
      state.isLoading = false;
      state.isFetched = false;
    },
  },
});

export const { updateAccount, resetAccount } = account.actions;

export default account.reducer;
