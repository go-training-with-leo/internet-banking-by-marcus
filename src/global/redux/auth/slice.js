import { createSlice } from '@reduxjs/toolkit';

import { sendCode, logIn, verifyCode, resetPasswordAccount } from './thunk';

const auth = createSlice({
  name: 'authentication',

  initialState: {
    currentUser: {},
    formData: { step: 1 },
    isLoading: false,
    isFetched: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetFormData: (state) => {
      state.formData = { step: 1 };
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
    [sendCode.fulfilled]: (state, action) => {
      const { email, message } = action.payload;
      state.isLoading = false;
      state.formData = {
        ...state.formData,
        email,
        step: message === 'Success' ? 2 : state.formData.step,
      };
    },
    [verifyCode.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyCode.rejected]: (state) => {
      state.isLoading = false;
    },
    [verifyCode.fulfilled]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.formData = {
        ...state.formData,
        step:
          message === 'You have been successfully registered'
            ? 3
            : state.formData.step,
      };
    },
    [resetPasswordAccount.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPasswordAccount.rejected]: (state) => {
      state.isLoading = false;
    },
    [resetPasswordAccount.fulfilled]: (state, action) => {
      const { status } = action.payload;
      state.isLoading = false;
      state.formData = {
        ...state.formData,
        step: status ? 4 : state.formData.step,
      };
    },
  },
});

export const { setUser, resetFormData } = auth.actions;

export default auth.reducer;
