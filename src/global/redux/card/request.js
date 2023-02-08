import api from 'services/api';

import {
  deleteDocFireStore,
  queryDocs,
  updateDocFireStore,
} from 'utils/helpers';

const getCards = async (uid) => {
  const payingCardInfo = queryDocs({
    path: 'payingCards',
    field: 'email',
    value: uid,
  });
  const savingCardsInfo = queryDocs({
    path: 'savingCards',
    field: 'email',
    value: uid,
  });

  const fetchCards = await Promise.all([payingCardInfo, savingCardsInfo]);

  return { payingCard: fetchCards[0], savingCards: fetchCards[1] };
};

const addSavingCard = async ({
  cardId,
  totalAmount,
  timeDeposit,
  interest,
}) => {
  const {
    data: { savingCard },
  } = await api.post('/new-savingCard', {
    cardId,
    totalAmount,
    timeDeposit,
    interest,
  });

  return savingCard;
};

const rechargeSavingMoney = async ({
  fromPayingCardId,
  savingCardId,
  currentBalance,
  interestMoney,
  totalAmount,
}) => {
  await updateDocFireStore({
    collect: 'payingCards',
    id: fromPayingCardId,
    value: { balance: currentBalance + interestMoney + totalAmount },
  });
  await deleteDocFireStore({ collect: 'savingCards', id: savingCardId });
};

export { addSavingCard, getCards, rechargeSavingMoney };
