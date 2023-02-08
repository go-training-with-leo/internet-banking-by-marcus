import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getCards as getCardsReq,
  addSavingCard as addSavingCardReq,
  rechargeSavingMoney as rechargeSavingMoneyReq,
} from './request';

const getCards = createAsyncThunk('card/getCard', async (data) => {
  try {
    const { email } = data;

    const { payingCard, savingCards } = await getCardsReq(email);
    return {
      status: true,
      payingCard,
      savingCards,
    };
  } catch (error) {
    return {
      status: false,
      error: error.message,
    };
  }
});

const addSavingCard = createAsyncThunk('card/addSavingCard', async (data) => {
  try {
    const { cardId, totalAmount, timeDeposit, interest } = data;

    const savingCard = await addSavingCardReq({
      cardId,
      totalAmount,
      timeDeposit,
      interest,
    });
    return {
      status: true,
      savingCard,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const rechargeSavingMoney = createAsyncThunk(
  'card/rechargeSavingMoney',
  async (data) => {
    try {
      const {
        fromPayingCardId,
        savingCardId,
        currentBalance,
        interestMoney,
        totalAmount,
      } = data;
      await rechargeSavingMoneyReq({
        fromPayingCardId,
        savingCardId,
        currentBalance,
        interestMoney,
        totalAmount,
      });
      return {
        status: true,
        savingCard: {
          fromPayingCardId,
          savingCardId,
          currentBalance,
          interestMoney,
          totalAmount,
        },
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

export { addSavingCard, getCards, rechargeSavingMoney };
