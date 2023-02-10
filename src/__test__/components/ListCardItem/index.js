import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import ListCardItem from 'components/ListCardItem';

test('Test props', () => {
  const tree = render(
    <ListCardItem isCompleted label='MasterCard' value={150000} cardId='4059' />
  );

  const listCardItem = tree.container.querySelector('div.list-card-item');
  const cardActive = tree.container.querySelector('svg');
  const smallCard = tree.container.querySelector('div.small-card');

  expect(smallCard).toHaveClass('active');
  expect(cardActive).toHaveClass('hide');
  expect(listCardItem).toHaveTextContent('4059');
  expect(listCardItem).toHaveTextContent('150 000 VND');
  expect(listCardItem).toHaveTextContent('MasterCard');
  expect(tree).toMatchSnapshot();
});

test('Test onClick', async () => {
  const handleClick = jest.fn();
  const tree = render(<ListCardItem onClick={handleClick} />);

  const listCardItem = tree.container.querySelector('div.list-card-item');

  await act(async () => {
    fireEvent.click(listCardItem);
  });
  expect(handleClick).toBeCalled();
  expect(tree).toMatchSnapshot();
});
