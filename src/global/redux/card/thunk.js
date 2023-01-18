import { createAsyncThunk } from '@reduxjs/toolkit';

import { getPayingCard as getPayingCardReq } from './request';

const getPayingCard = createAsyncThunk('card/getPayingCard', async (data) => {
  try {
    const { email } = data;

    const payingCardInfo = await getPayingCardReq(email);
    return {
      status: true,
      payingCardInfo,
    };
  } catch (error) {
    return {
      status: false,
      error: error.message,
    };
  }
});

export { getPayingCard };
