import { createSlice } from '@reduxjs/toolkit';

import { addContact, getContacts } from './thunk';

const contact = createSlice({
  name: 'contact',
  initialState: { contacts: [], isLoading: false, isFetched: false },
  reducers: {
    resetContact: (state) => {
      state.contacts = [];
      state.isLoading = false;
    },
  },
  extraReducers: {
    [addContact.pending]: (state) => {
      state.isLoading = true;
    },
    [addContact.rejected]: (state) => {
      state.isLoading = false;
    },
    [addContact.fulfilled]: (state, action) => {
      if (action.payload.newContact) {
        state.contacts = [...state.contacts, action.payload.newContact];
      }
      state.isLoading = false;
    },

    [getContacts.pending]: (state) => {
      state.isLoading = true;
    },
    [getContacts.rejected]: (state) => {
      state.isLoading = false;
    },
    [getContacts.fulfilled]: (state, action) => {
      state.contacts = [...action.payload.contactList];
      state.isLoading = false;
    },
  },
});

export const { resetContact } = contact.actions;
export default contact.reducer;
