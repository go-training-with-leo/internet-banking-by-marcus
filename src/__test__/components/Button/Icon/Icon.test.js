/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import IconButton from 'components/Button/Icon';
import { PlusIcon } from 'assets/images';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('Test default props button', () => {
  const handleClick = jest.fn();

  const tree = render(
    <IconButton onClick={handleClick}>
      Label
      <PlusIcon />
    </IconButton>
  );

  const button = tree.getByRole('button');

  expect(button.className).toMatch('button');

  expect(button).toHaveTextContent('Label');

  expect(button.childElementCount).toEqual(1);

  expect(console.error).toBeCalledTimes(1);

  fireEvent.click(button);

  expect(tree).toMatchSnapshot();
});

test('Test classname on Button', () => {
  const tree = render(<IconButton className='testClass'>Label</IconButton>);
  const button = tree.getByRole('button');

  expect(button.className).not.toMatch('testClass');

  expect(button.className).toMatch('button');

  expect(tree).toMatchSnapshot();
});

test('Wrong Props & right props', () => {
  const tree = render(
    <IconButton className='ghost' danger disabled>
      Label
    </IconButton>
  );

  const button = tree.getByRole('button');

  expect(button).not.toHaveAttribute('disabled');
  expect(button).not.toHaveClass('ghost');

  expect(button).toHaveAttribute('type', 'button');

  expect(tree).toMatchSnapshot();
});

test('Loading in button', () => {
  const tree = render(<IconButton loading>Label</IconButton>);

  const button = tree.getByRole('button');

  expect(button).toHaveAttribute('disabled');
  expect(tree).toMatchSnapshot();
});

test('Test onClick on Button', () => {
  const handleClick = jest.fn();
  const tree = render(
    <IconButton onClick={handleClick}>Test onClick</IconButton>
  );

  const button = tree.getByRole('button');

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);

  expect(tree).toMatchSnapshot();
});
