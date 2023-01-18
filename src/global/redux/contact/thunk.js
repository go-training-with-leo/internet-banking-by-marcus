import { createAsyncThunk } from '@reduxjs/toolkit';

import { addContact as addContactReq } from './request';

const addContact = createAsyncThunk('contact/addContact', async (data) => {
  try {
    const { email, cardNumber, contactName } = data;

    const message = await addContactReq({ email, cardNumber, contactName });
    return {
      status: true,
      message,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

export { addContact };
