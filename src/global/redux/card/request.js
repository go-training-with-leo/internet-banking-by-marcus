import { queryDocs } from 'utils/helpers';

const getCards = async (uid) => {
  const payingCardInfo = await queryDocs({
    path: 'payingCards',
    field: 'email',
    value: uid,
  });
  const savingCardsInfo = await queryDocs({
    path: 'savingCards',
    field: 'email',
    value: uid,
  });

  return { payingCard: payingCardInfo, savingCards: savingCardsInfo };
};

export { getCards };
