import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';

import {
  addContact,
  deleteContact,
  editContact,
  getContacts,
  searchContact,
} from './thunk';

const contact = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    isLoading: false,
    isSearchAccount: false,
    isFetched: false,
  },
  reducers: {
    resetContact: (state) => {
      state.contacts = [];
      state.isLoading = false;
    },
  },
  extraReducers: {
    [searchContact.pending]: (state) => {
      state.isSearchAccount = true;
    },
    [searchContact.rejected]: (state) => {
      state.isSearchAccount = false;
    },
    [searchContact.fulfilled]: (state) => {
      state.isSearchAccount = false;
    },
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
      if (action.payload.contactList) {
        state.contacts = [...action.payload.contactList];
      }
      state.isLoading = false;
      state.isFetched = true;
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

    [editContact.pending]: (state) => {
      state.isLoading = true;
    },
    [editContact.rejected]: (state) => {
      state.isLoading = false;
    },
    [editContact.fulfilled]: (state, action) => {
      const contactIndex = state.contacts.findIndex(
        (contactItem) => contactItem.id === action.payload.contactUpdated.id
      );
      state.contacts.splice(contactIndex, 1, action.payload.contactUpdated);
      state.isLoading = false;
    },
    [logOut.fulfilled]: (state) => {
      state.isFetched = false;
      state.contacts = [];
    },
  },
});

export const { resetContact } = contact.actions;
export default contact.reducer;
