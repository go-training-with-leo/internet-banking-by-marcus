import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';
import {
  searchContact,
  sendCode,
  transfer as transferThunk,
  verifyCode,
} from './thunk';

const transfer = createSlice({
  name: 'transfer',
  initialState: {
    transferInfo: {},
    isLoading: false,
    isFetched: false,
  },
  reducers: {
    updateTransferInfo: (state, action) => {
      state.transferInfo = { ...state.transferInfo, ...action.payload };
    },
    resetTransferInfo: (state) => {
      state.transferInfo = {};
      state.isLoading = false;
    },
  },
  extraReducers: {
    [searchContact.pending]: (state) => {
      state.isLoading = true;
    },
    [searchContact.rejected]: (state) => {
      state.isLoading = false;
    },
    [searchContact.fulfilled]: (state, action) => {
      state.transferInfo = {
        ...state.transferInfo,
        dest: {
          contactId: action.payload?.contact?.id,
          contactName: action.payload?.contact?.contactName,
          bank: 'EIGHT.Bank',
          cardNumber: action.payload?.contact?.cardNumber,
        },
      };
      state.isLoading = false;
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

    [transferThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [transferThunk.rejected]: (state) => {
      state.isLoading = false;
    },
    [transferThunk.fulfilled]: (state, action) => {
      state.transferInfo = {
        ...state.transferInfo,
        createdAt: action.payload?.createdAt,
      };

      state.isLoading = false;
    },
    [logOut.fulfilled]: (state) => {
      state.isFetched = false;
    },
  },
});

export const { updateTransferInfo, resetTransferInfo } = transfer.actions;
export default transfer.reducer;
