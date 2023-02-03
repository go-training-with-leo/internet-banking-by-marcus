import api from 'services/api';
import { queryDocs } from 'utils/helpers';

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

const addSavingCard = async ({ cardId, totalAmount, timeDeposit }) => {
  const {
    data: { savingCard },
  } = await api.post('/new-savingCard', {
    cardId,
    totalAmount,
    timeDeposit,
  });

  return savingCard;
};

export { addSavingCard, getCards };
