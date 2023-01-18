import api from 'services/api';

const addContact = async ({ email, cardNumber, contactName }) => {
  const {
    data: { message },
  } = await api.post('/new-contact', {
    email,
    cardNumber,
    contactName,
  });

  return message;
};

export { addContact };
