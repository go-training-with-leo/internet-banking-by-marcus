import api from 'services/api';
import { getDocFireStore, queryDocs, updateDocFireStore } from 'utils/helpers';

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
  } = await api.post('/add-debt', debtInfo);

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

const deleteDebt = async ({ id, reason }) => {
  await updateDocFireStore({
    collect: 'debts',
    id,
    value: { reason, status: 'success' },
  });
  return {
    status: 'success',
  };
};

export { addDebt, deleteDebt, getCreDebts, getRecDebts, searchContact };
