import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  addContact as addContactReq,
  deleteContact as deleteContactReq,
  editContact as editContactReq,
  getContacts as getContactsReq,
  searchContact as searchContactReq,
} from './request';

const searchContact = createAsyncThunk(
  'contact/searchContact',
  async (data) => {
    try {
      const { cardNumber } = data;
      const accountName = await searchContactReq(cardNumber);
      return {
        status: true,
        accountName,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

const addContact = createAsyncThunk('contact/addContact', async (data) => {
  try {
    const { email, cardNumber, contactName, bank } = data;

    const { message, newContact } = await addContactReq({
      email,
      cardNumber,
      contactName,
      bank,
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

const editContact = createAsyncThunk('contact/editContact', async (data) => {
  try {
    const { id, contactName, bank } = data;

    await editContactReq({ id, value: { contactName, bank } });
    return {
      status: true,
      contactUpdated: data,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});

export { addContact, deleteContact, editContact, getContacts, searchContact };
