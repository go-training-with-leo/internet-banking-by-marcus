import { queryDocs } from 'utils/helpers';

const getPayingCard = async (uid) => {
  const payingCardInfo = await queryDocs({
    path: 'payingCards',
    field: 'email',
    value: uid,
  });

  return payingCardInfo;
};

export { getPayingCard };
