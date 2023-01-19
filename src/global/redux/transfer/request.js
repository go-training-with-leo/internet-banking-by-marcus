import { queryDocs } from 'utils/helpers';

const searchContact = async (cardNumber) => {
  const searchedContact = await queryDocs({
    path: 'payingCards',
    field: 'cardNumber',
    value: cardNumber,
  });

  return searchedContact ? searchedContact[0] : null;
};

export { searchContact };
