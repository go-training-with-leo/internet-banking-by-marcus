import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  addContact as addContactReq,
  getContacts as getContactsReq,
  deleteContact as deleteContactReq,
} from './request';

const addContact = createAsyncThunk('contact/addContact', async (data) => {
  try {
    const { email, cardNumber, contactName } = data;

    const { message, newContact } = await addContactReq({
      email,
      cardNumber,
      contactName,
    });
    return {
      status: true,
      message,
      newContact,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

const getContacts = createAsyncThunk(
  'contact/getListContacts',
  async (data) => {
    try {
      const { email } = data;

      const contactList = await getContactsReq(email);
      return {
        status: true,
        contactList,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (data) => {
    try {
      const { id } = data;

      await deleteContactReq(id);
      return {
        status: true,
        id,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

export { addContact, deleteContact, getContacts };
