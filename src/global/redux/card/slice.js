import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';
import { addDebt } from '../debt/thunk';
import { transfer } from '../transfer/thunk';
import { getCards } from './thunk';

const card = createSlice({
  name: 'card',
  initialState: {
    payingCard: {},
    savingCards: [],
    isLoading: false,
    isFetched: false,
  },
  reducers: {
    resetCards: (state) => {
      state.payingCard = {};
      state.savingCards = [];
    },
  },
  extraReducers: {
    [getCards.pending]: (state) => {
      state.isLoading = true;
    },
    [getCards.rejected]: (state) => {
      state.isLoading = false;
      state.isFetched = false;
    },
    [getCards.fulfilled]: (state, action) => {
      if (action.payload.payingCard) {
        state.payingCard = { ...action.payload.payingCard[0] };
        state.savingCards = [...action.payload.savingCards];
        state.isFetched = true;
        state.isLoading = false;
      }
    },
    [logOut.fulfilled]: (state) => {
      state.isFetched = false;
    },
    [transfer.fulfilled]: (state, action) => {
      const {
        transferInfo: {
          paymentMethod,
          totalAmount,
          from: { cardNumber },
        },
      } = action.payload;

      if (paymentMethod === 'paymentCard') {
        state.payingCard = {
          ...state.payingCard,
          balance: state.payingCard.balance - totalAmount,
        };
      } else if (paymentMethod === 'savingCard') {
        const cloneSavingCards = [...state.savingCards];
        const indexSvCard = cloneSavingCards.findIndex(
          (savingCard) => savingCard.cardNumber === cardNumber
        );
        const savingCard = {
          ...cloneSavingCards[indexSvCard],
          balance: cloneSavingCards[indexSvCard].balance - totalAmount,
        };
        cloneSavingCards.splice(indexSvCard, 1, savingCard);
        state.savingCards = [...cloneSavingCards];
      }
    },
    [addDebt.fulfilled]: (state, action) => {
      state.payingCard = {
        ...state.payingCard,
        balance: state.payingCard.balance - action.payload.debt.totalAmount,
      };
    },
  },
});

export const { resetCards } = card.actions;
export default card.reducer;
