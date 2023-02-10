import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';
import { addDebt, paymentDebt } from '../debt/thunk';
import { transfer } from '../transfer/thunk';
import { addSavingCard, getCards, rechargeSavingMoney } from './thunk';

const card = createSlice({
  name: 'card',
  initialState: {
    payingCard: {},
    savingCards: [],
    newSavingCard: {},
    isLoading: false,
    isAddSavingCardLoading: false,
    isDeleteSavingCardLoading: false,
    isFetched: false,
  },
  reducers: {
    updatePayingCard: (state, action) => {
      state.payingCard = { ...action.payload };
    },
    updateSavingCard: (state, action) => {
      const indexOfSavingCard = state.savingCards.findIndex(
        (savingCard) => savingCard.id === action.payload.id
      );
      state.savingCards[indexOfSavingCard] = {
        ...state.savingCards[indexOfSavingCard],
        status: action.payload.status,
      };
    },
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
    [addSavingCard.pending]: (state) => {
      state.isAddSavingCardLoading = true;
    },
    [addSavingCard.rejected]: (state) => {
      state.isAddSavingCardLoading = false;
    },
    [addSavingCard.fulfilled]: (state, action) => {
      state.savingCards = [...state.savingCards, action.payload.savingCard];
      state.newSavingCard = { ...action.payload.savingCard };
      state.payingCard = {
        ...state.payingCard,
        balance: state.payingCard.balance - action.payload.savingCard.balance,
      };
      state.isAddSavingCardLoading = false;
    },
    [rechargeSavingMoney.pending]: (state) => {
      state.isDeleteSavingCardLoading = true;
    },
    [rechargeSavingMoney.rejected]: (state) => {
      state.isDeleteSavingCardLoading = false;
    },
    [rechargeSavingMoney.fulfilled]: (state, action) => {
      const { savingCard } = action.payload;
      state.payingCard = {
        ...state.payingCard,
        balance:
          savingCard.currentBalance +
          savingCard.interestMoney +
          savingCard.totalAmount,
      };
      const indexOfSavingCard = state.savingCards?.findIndex(
        (savCard) => savCard.id === savingCard.savingCardId
      );
      state.savingCards.splice(indexOfSavingCard, 1);
      state.isDeleteSavingCardLoading = false;
    },

    [logOut.fulfilled]: (state) => {
      state.payingCard = {};
      state.savingCards = [];
      state.isAddSavingCardLoading = false;
      state.isDeleteSavingCardLoading = false;
      state.isLoading = false;
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
    [paymentDebt.fulfilled]: (state, action) => {
      state.payingCard = {
        ...state.payingCard,
        balance: state.payingCard.balance - action.payload.debt.totalAmount,
      };
    },
  },
});

export const { resetCards, updateSavingCard, updatePayingCard } = card.actions;
export default card.reducer;
