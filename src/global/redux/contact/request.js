import api from 'services/api';
import {
  deleteDocFireStore,
  queryDocs,
  updateDocFireStore,
} from 'utils/helpers';

const addContact = async ({ email, cardNumber, contactName, bank }) => {
  const {
    data: { message, newContact },
  } = await api.post('/new-contact', {
    email,
    cardNumber,
    contactName,
    bank,
  });

  return { message, newContact };
};

const getContacts = async (email) => {
  const contactList = await queryDocs({
    path: 'contacts',
    field: 'email',
    value: email,
  });

  return contactList;
};

const deleteContact = async (id) => {
  await deleteDocFireStore({ collect: 'contacts', id });
};

const editContact = async ({ id, value }) => {
  await updateDocFireStore({ collect: 'contacts', id, value });
};

export { addContact, deleteContact, editContact, getContacts };
