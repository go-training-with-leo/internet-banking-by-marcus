import axios from 'axios';
import { deleteDocFireStore, queryDocs } from 'utils/helpers';

const addContact = async ({ email, cardNumber, contactName }) => {
  const {
    data: { message, newContact },
  } = await axios.post('http://localhost:3000/new-contact', {
    email,
    cardNumber,
    contactName,
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

export { addContact, deleteContact, getContacts };
