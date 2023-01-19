import { createAsyncThunk } from '@reduxjs/toolkit';

import { getCards as getCardsReq } from './request';

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

export { getCards };
