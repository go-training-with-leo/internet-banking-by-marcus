import React from 'react';
import { render } from '@testing-library/react';
import Stepper from 'components/Stepper';

describe('Test Stepper', () => {
  it('Test props', () => {
    const tree = render(
      <Stepper step={1} title='card'>
        Please pick a card to proceed this payment
      </Stepper>
    );

    const stepper = tree.container.querySelector('div.stepper');
    const title = tree.container.querySelector('span.title');

    expect(title).not.toHaveTextContent('card');
    expect(title).toHaveTextContent('Card');
    expect(stepper).toHaveTextContent(
      'Please pick a card to proceed this payment'
    );
    expect(stepper).toHaveTextContent(1);
    expect(tree).toMatchSnapshot();
  });
});
