import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Ghost from 'components/Button/Ghost';

test('Test props', () => {
  const handleClick = jest.fn();
  const tree = render(<Ghost onClick={handleClick}>Label</Ghost>);

  const button = tree.getByRole('button');

  fireEvent.click(button);
  expect(handleClick).toBeCalledTimes(1);
  expect(tree).toMatchSnapshot();
});

test('Test class Button ghost', () => {
  const tree = render(<Ghost>Label</Ghost>);

  const button = tree.queryByRole('button');

  expect(button.className).toMatch('button ghost');

  expect(tree).toMatchSnapshot();
});
