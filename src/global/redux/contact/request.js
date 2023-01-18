import axios from 'axios';

const addContact = async ({ email, cardNumber, contactName }) => {
  const { data: message } = await axios.post(
    'http://localhost:3000/add-contact',
    {
      email,
      cardNumber,
      contactName,
    }
  );

  return message;
};

export { addContact };
