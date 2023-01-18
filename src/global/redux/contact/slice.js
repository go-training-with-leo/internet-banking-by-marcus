import { createSlice } from '@reduxjs/toolkit';

import { addContact, deleteContact, getContacts } from './thunk';

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

    [deleteContact.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteContact.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteContact.fulfilled]: (state, action) => {
      const contactIndex = state.contacts.findIndex(
        (contactItem) => contactItem.id === action.payload.id
      );
      const newContacts = [...state.contacts];
      newContacts.splice(contactIndex, 1);

      state.contacts = [...newContacts];
      state.isLoading = false;
    },
  },
});

export const { resetContact } = contact.actions;
export default contact.reducer;
