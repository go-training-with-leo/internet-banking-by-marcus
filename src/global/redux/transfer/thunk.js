import { createAsyncThunk } from '@reduxjs/toolkit';

import { searchContact as searchContactReq } from './request';

const searchContact = createAsyncThunk(
  'contact/searchContact',
  async (data) => {
    try {
      const { cardNumber } = data;

      const contact = await searchContactReq(cardNumber);
      return {
        status: true,
        contact,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

export { searchContact };
