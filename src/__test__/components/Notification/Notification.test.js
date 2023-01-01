import React from 'react';
import { render } from '@testing-library/react';
import Notification from 'components/Notification';

describe('Test notification', () => {
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
  it('Test default props', () => {
    const tree = render(<Notification messages={messages} />);

    const notificationBox = tree.container.querySelector('div.notification');

    expect(notificationBox.childElementCount).toEqual(4);

    expect(tree).toMatchSnapshot();
  });
});
