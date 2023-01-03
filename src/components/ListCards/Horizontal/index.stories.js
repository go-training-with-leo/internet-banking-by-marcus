import React from 'react';

import ListCardsHorizontal from '.';

export default {
  title: 'List',
  component: ListCardsHorizontal,
};

const listItem = [
  { id: 'IT1', value: 212903, label: 'Visa' },
  { id: 'IT2', value: 2100003, label: 'MasterCard' },
  { id: 'IT3', value: 299903, label: 'Napas' },
  { id: 'IT4', value: 299903, label: 'Napas' },
  { id: 'IT5', value: 299903, label: 'Napas' },
];

const Horizontal = () => <ListCardsHorizontal listItem={listItem} />;

export { Horizontal };
