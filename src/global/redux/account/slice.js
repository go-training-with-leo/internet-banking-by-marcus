import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';
import {
  addNewCustomer,
  addNewEmployee,
  existEmail,
  getCustAccount,
  getCustomerAccounts,
  getEmplAccounts,
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
    isUpdateLoading: false,
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
      state.accounts = [...action.payload.customerAccounts];
      state.currentAccount = {
        ...state.accounts?.find((acc) => acc?.email === action.payload?.email),
      };
      state.isLoading = false;
      state.isFetched = true;
    },

    [rechargeMoney.pending]: (state) => {
      state.isLoading = true;
    },
    [rechargeMoney.rejected]: (state) => {
      state.isLoading = false;
    },
    [rechargeMoney.fulfilled]: (state, action) => {
      const indexAccount = state.accounts?.findIndex(
        (acc) => acc?.id === action.payload?.chargeInfo?.id
      );
      state.accounts[indexAccount] = {
        ...state.accounts[indexAccount],
        balance:
          state.accounts[indexAccount].balance +
          action.payload.chargeInfo.balance,
      };
      state.isLoading = false;
    },
    [getEmplAccounts.pending]: (state) => {
      state.isLoading = true;
    },
    [getEmplAccounts.rejected]: (state) => {
      state.isLoading = false;
    },
    [getEmplAccounts.fulfilled]: (state, action) => {
      state.accounts = [...action.payload.emplAccounts];
      state.isLoading = false;
      state.isFetched = true;
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
      state.isUpdateLoading = true;
    },
    [updatePassword.rejected]: (state) => {
      state.isUpdateLoading = false;
    },
    [updatePassword.fulfilled]: (state) => {
      state.isUpdateLoading = false;
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
