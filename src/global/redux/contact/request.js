import axios from 'axios';
import {
  deleteDocFireStore,
  getDocFireStore,
  queryDocs,
  updateDocFireStore,
} from 'utils/helpers';

const searchContact = async (cardNumber) => {
  const searchedContact = await queryDocs({
    path: 'payingCards',
    field: 'cardNumber',
    value: cardNumber,
  });
  const { id: uid } = searchedContact[0] || null;

  const { accountName } = await getDocFireStore({
    path: 'accounts',
    id: uid,
  });

  return searchedContact ? accountName : null;
};

const addContact = async ({ email, cardNumber, contactName, bank }) => {
  const {
    data: { message, newContact },
  } = await axios.post('http://localhost:3000/new-contact', {
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

export { addContact, deleteContact, editContact, getContacts, searchContact };
