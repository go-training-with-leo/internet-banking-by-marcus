import { createSlice } from '@reduxjs/toolkit';
import { addNewCustomer, addNewEmployee, existEmail } from './thunk';

const account = createSlice({
  name: 'account',
  initialState: {
    accounts: [],
    newAccount: {},
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
      state.isLoading = false;
    },
  },
});

export const { updateAccount, resetAccount } = account.actions;

export default account.reducer;
