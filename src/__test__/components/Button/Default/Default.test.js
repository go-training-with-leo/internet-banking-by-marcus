/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Button from 'components/Button/Default';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('Test default props button', () => {
  const handleClick = jest.fn();

  const tree = render(<Button onClick={handleClick}>Text</Button>);

  const button = tree.getByRole('button');

  expect(button.className).toMatch('button normal bg-red color-white');
  expect(button).toHaveTextContent('Text');

  expect(button.childElementCount).toBe(0);
  fireEvent.click(button);
  expect(handleClick).toBeCalledTimes(1);

  expect(tree).toMatchSnapshot();
});

test('Test classname on Button', () => {
  const tree = render(
    <Button
      className='testClass'
      size='small'
      bgColor='bg-black'
      color='color-red'
    >
      Label
    </Button>
  );
  const button = tree.getByRole('button');

  expect(button.className).toMatch('button testClass small bg-black color-red');

  expect(tree).toMatchSnapshot();
});

test('Test onClick on Button', () => {
  const handleClick = jest.fn();
  const tree = render(<Button onClick={handleClick}>Test onClick</Button>);

  const button = tree.getByRole('button');

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalled();

  expect(tree).toMatchSnapshot();
});
