/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import DefaultButton from 'components/Button/Default';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('Test default props button', () => {
  const handleClick = jest.fn();

  const tree = render(
    <DefaultButton onClick={handleClick}>Text</DefaultButton>
  );

  const button = tree.getByRole('button');

  expect(button.className).toMatch('button');

  expect(button).toHaveTextContent('Text');

  fireEvent.click(button);
  expect(handleClick).toBeCalledTimes(1);

  expect(tree).toMatchSnapshot();
});

test('Test classname on Button', () => {
  const tree = render(
    <DefaultButton className='testClass'>Label</DefaultButton>
  );
  const button = tree.getByRole('button');

  expect(button.className).not.toMatch('testClass');

  expect(button.className).toMatch('button');

  expect(tree).toMatchSnapshot();
});

test('Wrong Props & right props', () => {
  const tree = render(
    <DefaultButton className='ghost' disabled>
      Label
    </DefaultButton>
  );

  const button = tree.getByRole('button');

  expect(button).not.toHaveClass('ghost');

  expect(button).toHaveAttribute('type', 'button');

  expect(tree).toMatchSnapshot();
});

test('Loading in button', () => {
  const tree = render(<DefaultButton loading>Label</DefaultButton>);

  const button = tree.getByRole('button');

  expect(button).toHaveAttribute('disabled');
  expect(tree).toMatchSnapshot();
});

test('Test onClick on Button', () => {
  const handleClick = jest.fn();
  const tree = render(
    <DefaultButton onClick={handleClick}>Test onClick</DefaultButton>
  );

  const button = tree.getByRole('button');

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);

  expect(tree).toMatchSnapshot();
});
