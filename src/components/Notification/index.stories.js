import React from 'react';

import NotificationComponent from '.';

export default {
  title: 'Notification',
  component: NotificationComponent,
};

const messages = [
  {
    id: 'MSG1',
    type: 'removed',
    content:
      'Your lender (Justin Doe/ 4089) has removed a debt reminder of you',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG2',
    type: 'repaid',
    content:
      'Your lender (Justin Doe/ 4089) has removed a debt reminder of you',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG3',
    type: 'removed',
    content:
      'Your lender (Justin Doe/ 4089) has removed a debt reminder of you',
    time: '09:51:36 23/05/2020',
  },
  {
    id: 'MSG4',
    type: 'removed',
    content:
      'Your lender (Justin Doe/ 4089) has removed a debt reminder of you',
    time: '09:51:36 23/05/2020',
  },
];

const Notification = () => <NotificationComponent messages={messages} />;

export { Notification };
