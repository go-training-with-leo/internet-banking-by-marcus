import { createSlice } from '@reduxjs/toolkit';
import { searchContact } from './thunk';

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
        contactId: action.payload?.contact?.id,
      };
      state.isLoading = false;
    },
  },
});

export const { updateTransferInfo, resetTransferInfo } = transfer.actions;
export default transfer.reducer;
