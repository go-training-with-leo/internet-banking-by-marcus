import { getAllDocsInColl } from 'utils/helpers';

const getAllNotifs = async () => {
  const debts = await getAllDocsInColl('debts');

  return debts;
};

export { getAllNotifs };
