import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';
import {
  addDebt,
  approveDebt,
  deleteDebt,
  getCreDebts,
  getRecDebts,
  paymentDebt,
  rejectDebt,
  searchContact,
  sendCode,
  verifyCode,
} from './thunk';

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
    resetDebtInfo: (state) => {
      state.debtInfo = {};
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
      state.debtInfo = {};
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
    [deleteDebt.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteDebt.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteDebt.fulfilled]: (state, action) => {
      const { responseDebt } = action.payload;

      const indexInCreDebt = state.creDebts.findIndex((creDebt) => {
        return creDebt.id === responseDebt?.id;
      });
      const indexInRecDebt = state.recDebts.findIndex(
        (recDebt) => recDebt.id === responseDebt?.id
      );

      if (indexInCreDebt !== -1) {
        state.creDebts[indexInCreDebt] = {
          ...state.creDebts[indexInCreDebt],
          status: responseDebt?.status,
          reason: responseDebt?.reason,
        };
      } else if (indexInRecDebt !== -1) {
        state.recDebts[indexInRecDebt] = {
          ...state.recDebts[indexInRecDebt],
          status: responseDebt?.status,
          reason: responseDebt?.reason,
        };
      }
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
    [paymentDebt.pending]: (state) => {
      state.isLoading = true;
    },
    [paymentDebt.rejected]: (state) => {
      state.isLoading = false;
    },
    [paymentDebt.fulfilled]: (state, action) => {
      const { id } = action.payload.debt;
      const indexDebt = state.recDebts?.findIndex(
        (recDebt) => recDebt.id === id
      );
      state.recDebts[indexDebt] = {
        ...state.recDebts[indexDebt],
        ...action.payload.debt,
      };
      state.isLoading = false;
    },
    [rejectDebt.pending]: (state) => {
      state.isLoading = true;
    },
    [rejectDebt.rejected]: (state) => {
      state.isLoading = false;
    },
    [rejectDebt.fulfilled]: (state, action) => {
      const { debt: debtRejected } = action.payload;
      const indexOfDebt = state.creDebts?.findIndex(
        (creDebt) => creDebt?.id === debtRejected?.id
      );
      state.creDebts[indexOfDebt] = {
        ...state.creDebts[indexOfDebt],
        status: debtRejected?.status,
      };
      state.isLoading = false;
    },
    [approveDebt.pending]: (state) => {
      state.isLoading = true;
    },
    [approveDebt.rejected]: (state) => {
      state.isLoading = false;
    },
    [approveDebt.fulfilled]: (state, action) => {
      const { debt: debtApproved } = action.payload;
      const indexOfDebt = state.creDebts?.findIndex(
        (creDebt) => creDebt?.id === debtApproved?.id
      );
      state.creDebts[indexOfDebt] = {
        ...state.creDebts[indexOfDebt],
        status: debtApproved?.status,
      };
      state.isLoading = false;
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

export const { updateDebtInfo, resetDebtInfo } = debt.actions;
export default debt.reducer;
