import { createSlice } from '@reduxjs/toolkit';

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
    },
  },
});

export const { updateTransferInfo, resetTransferInfo } = transfer.actions;
export default transfer.reducer;
