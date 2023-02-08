import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SmallCard from 'components/Card/Small';

describe('Small Card', () => {
  it('Props in small card', () => {
    const handleClick = jest.fn();
    const tree = render(
      <SmallCard isActive label='Visa' onClick={handleClick}>
        42848
      </SmallCard>
    );

    const card = tree.container.querySelector('div.small-card');
    fireEvent.click(card);
    expect(handleClick).toBeCalledTimes(1);
    expect(card).toHaveClass('active');
    expect(card).toHaveTextContent('42848');
    expect(card).toHaveTextContent('Visa');

    expect(tree).toMatchSnapshot();
  });

  test('Wrong value & capitalize a first letter', () => {
    const handleClick = jest.fn();
    const tree = render(
      <SmallCard isActive label='VISA' onClick={handleClick}>
        String
      </SmallCard>
    );

    const card = tree.container.querySelector('div.small-card');
    fireEvent.click(card);
    expect(handleClick).toBeCalledTimes(1);
    expect(card).toHaveTextContent('Invalid type');
    expect(card).toHaveTextContent('Visa');

    expect(tree).toMatchSnapshot();
  });

  test('Children is Element & capitalize a first letter for label', () => {
    const handleClick = jest.fn();
    const tree = render(
      <SmallCard isActive label='visa' onClick={handleClick}>
        Element
      </SmallCard>
    );

    const card = tree.container.querySelector('div.small-card');
    fireEvent.click(card);
    expect(handleClick).toBeCalledTimes(1);
    expect(card).toHaveTextContent('Invalid type');
    expect(card).toHaveTextContent('Visa');

    expect(tree).toMatchSnapshot();
  });
});
