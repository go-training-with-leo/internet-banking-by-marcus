import { createSlice } from '@reduxjs/toolkit';

import { addContact } from './thunk';

const contact = createSlice({
  name: 'contact',
  initialState: { contacts: [], isLoading: false, isFetched: false },
  reducers: {
    resetContact: (state) => {
      state.contacts = [];
    },
  },
  extraReducers: {
    [addContact.pending]: (state) => {
      state.isLoading = true;
    },
    [addContact.rejected]: (state) => {
      state.isLoading = false;
    },
    [addContact.fulfilled]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { resetContact } = contact.actions;
export default contact.reducer;
