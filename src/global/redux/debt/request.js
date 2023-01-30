import axios from 'axios';
import { getDocFireStore, queryDocs } from 'utils/helpers';

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

  return searchedContact
    ? { ...searchedContact[0], contactName: accountName }
    : null;
};

const addDebt = async (debtInfo) => {
  const {
    data: { message, debt },
  } = await axios.post('http://localhost:3000/add-debt', debtInfo);

  return { message, debt };
};

const getCreDebts = async (cardNumber) => {
  const creDebts = await queryDocs({
    path: 'debts',
    field: 'from.cardNumber',
    value: cardNumber,
  });

  return creDebts;
};

const getRecDebts = async (cardNumber) => {
  const recDebts = await queryDocs({
    path: 'debts',
    field: 'dest.cardNumber',
    value: cardNumber,
  });

  return recDebts;
};

export { addDebt, getCreDebts, getRecDebts, searchContact };
