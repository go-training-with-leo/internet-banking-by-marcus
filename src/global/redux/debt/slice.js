import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';
import { addDebt, getCreDebts, getRecDebts, searchContact } from './thunk';

const debt = createSlice({
  name: 'debt',
  initialState: {
    creDebts: [],
    recDebts: [],
    debtInfo: {},
    isLoading: false,
    isCreDebtsFetched: false,
    isRecDebtsFetched: false,
  },
  reducers: {
    updateDebtInfo: (state, action) => {
      state.debtInfo = { ...state.debtInfo, ...action.payload };
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
      state.debtInfo = {
        ...state.debtInfo,
        dest: {
          contactId: action.payload?.contact?.id,
          contactName: action.payload?.contact?.contactName,
          bank: 'EIGHT.Bank',
          cardNumber: action.payload?.contact?.cardNumber,
        },
      };
      state.isLoading = false;
    },
    [addDebt.pending]: (state) => {
      state.isLoading = true;
    },
    [addDebt.rejected]: (state) => {
      state.isLoading = false;
    },
    [addDebt.fulfilled]: (state, action) => {
      state.creDebts = [...state.creDebts, action.payload?.debt];
      state.isLoading = false;
    },
    [getCreDebts.pending]: (state) => {
      state.isLoading = true;
    },
    [getCreDebts.rejected]: (state) => {
      state.isLoading = false;
    },
    [getCreDebts.fulfilled]: (state, action) => {
      const creDebts = state.creDebts.concat(
        action.payload?.creDebts.filter((item) =>
          state.creDebts.every((creDebt) => creDebt.id !== item.id)
        )
      );
      state.creDebts = creDebts;
      state.isLoading = false;
      state.isCreDebtsFetched = true;
    },
    [getRecDebts.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecDebts.rejected]: (state) => {
      state.isLoading = false;
    },
    [getRecDebts.fulfilled]: (state, action) => {
      const recDebts = state.recDebts.concat(
        action.payload?.recDebts.filter((item) =>
          state.recDebts.every((recDebt) => recDebt.id !== item.id)
        )
      );
      state.recDebts = recDebts;
      state.isLoading = false;
      state.isRecDebtsFetched = true;
    },
    [logOut.fulfilled]: (state) => {
      state.creDebts = [];
      state.recDebts = [];
      state.debtInfo = {};
      state.isLoading = false;
      state.isCreDebtsFetched = false;
      state.isRecDebtsFetched = false;
    },
  },
});

export const { updateDebtInfo } = debt.actions;
export default debt.reducer;
