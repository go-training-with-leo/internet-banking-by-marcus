import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getCards as getCardsReq,
  addSavingCard as addSavingCardReq,
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
    const { cardId, totalAmount, timeDeposit } = data;

    const savingCard = await addSavingCardReq({
      cardId,
      totalAmount,
      timeDeposit,
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

export { addSavingCard, getCards };
