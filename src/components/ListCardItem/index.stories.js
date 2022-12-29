import React from 'react';

import CardItem from '.';

export default {
  title: 'List Card Item',
  component: CardItem,
};

const ListCardItem = () => (
  <CardItem isActive label='MasterCard' value={150000} cardId='4059' />
);

export { ListCardItem };
