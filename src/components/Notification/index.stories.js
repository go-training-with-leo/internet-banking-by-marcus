import React from 'react';

import NotificationComponent from '.';

export default {
  title: 'Notification',
  component: NotificationComponent,
};

const messages = [
  {
    id: 'MSG1',
    account: {
      type: 'lender',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'removed',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG2',
    account: {
      type: 'debtor',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'repaid',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG3',
    account: {
      type: 'lender',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'removed',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG4',
    account: {
      type: 'lender',
      name: 'Jusin Doe',
      last4Digit: '4968',
    },
    type: 'removed',
    time: '09:51:36 23/05/2020',
  },
];

const Notification = () => <NotificationComponent messages={messages} />;

export { Notification };
