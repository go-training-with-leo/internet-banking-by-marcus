import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';
import { transfer } from '../transfer/thunk';
import { getRecHistories, getTransfHistories } from './thunk';

const history = createSlice({
  name: 'history',
  initialState: {
    recvHistories: [],
    transferHistories: [],
    debtHistories: [],
    isRecHistoryLoading: false,
    isRecHistoryFetched: false,
    isTransferHistoryLoading: false,
    isTransferHistoryFetched: false,
    isDebtHistoryLoading: false,
    isDebtHistoryFetched: false,
  },
  extraReducers: {
    [getRecHistories.pending]: (state) => {
      state.isRecHistoryLoading = true;
    },
    [getRecHistories.rejected]: (state) => {
      state.isRecHistoryLoading = false;
    },
    [getRecHistories.fulfilled]: (state, action) => {
      state.recvHistories = [...action.payload.recHistories];
      state.isRecHistoryLoading = false;
      state.isRecHistoryFetched = true;
    },
    [getTransfHistories.pending]: (state) => {
      state.isTransferHistoryLoading = true;
    },
    [getTransfHistories.rejected]: (state) => {
      state.isTransferHistoryLoading = false;
    },
    [getTransfHistories.fulfilled]: (state, action) => {
      state.transferHistories = [...action.payload.transfHistories];
      state.isTransferHistoryLoading = false;
      state.isTransferHistoryFetched = true;
    },
    [transfer.fulfilled]: (state, action) => {
      state.transferHistories = [
        {
          ...action.payload.transferInfo,
          createdAt: action.payload.createdAt,
          status: 'success',
          type: 'TRANSFER',
        },
        ...state.transferHistories,
      ];
    },
    [logOut.fulfilled]: (state) => {
      state.recvHistories = [];
      state.transferHistories = [];
      state.debtHistories = [];
      state.isRecHistoryLoading = false;
      state.isRecHistoryFetched = false;
      state.isTransferHistoryLoading = false;
      state.isTransferHistoryFetched = false;
      state.isDebtHistoryLoading = false;
      state.isDebtHistoryFetched = false;
    },
  },
});

export default history.reducer;
