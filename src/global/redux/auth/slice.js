import { createSlice } from '@reduxjs/toolkit';

import { sendCode, logIn, verifyCode, resetPasswordAccount } from './thunk';

const auth = createSlice({
  name: 'authentication',

  initialState: {
    currentUser: {},
    isLoading: false,
    isFetched: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },

  extraReducers: {
    [logIn.pending]: (state) => {
      state.isLoading = true;
    },
    [logIn.rejected]: (state) => {
      state.isLoading = false;
    },
    [logIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action?.payload?.data;
    },
    [sendCode.pending]: (state) => {
      state.isLoading = true;
    },
    [sendCode.rejected]: (state) => {
      state.isLoading = false;
    },
    [sendCode.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [verifyCode.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyCode.rejected]: (state) => {
      state.isLoading = false;
    },
    [verifyCode.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [resetPasswordAccount.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPasswordAccount.rejected]: (state) => {
      state.isLoading = false;
    },
    [resetPasswordAccount.fulfilled]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setUser } = auth.actions;

export default auth.reducer;
