import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import DefaultInput from 'components/Input/Default';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

test('Test props invalid input', async () => {
  const registFunction = jest.fn();
  const tree = render(
    <DefaultInput
      name='numberInput'
      label='Number'
      type='number'
      placeholder='Type number'
      register={registFunction}
    />
  );

  const input = tree.getByPlaceholderText('Type number');

  await act(async () => {
    fireEvent.change(input, { target: { value: 'Give a test, not a number' } });
  });

  expect(Number.isNaN(input.value)).toEqual(false);

  expect(tree).toMatchSnapshot();
});

test('Test disabled input', async () => {
  const registFunction = jest.fn();
  const tree = render(
    <DefaultInput
      name='numberInput'
      label='Number'
      type='number'
      placeholder='Type'
      disabled
      register={registFunction}
    />
  );

  const input = tree.getByPlaceholderText('Type');

  await act(async () => {
    fireEvent.change(input, { target: { value: 'Give a test' } });
  });

  expect(input.value).toEqual('');

  expect(tree).toMatchSnapshot();
});

test('Test password toggle input', async () => {
  const registFunction = jest.fn();
  const tree = render(
    <DefaultInput
      name='passwordInput'
      label='Password'
      type='password'
      placeholder='Type password'
      register={registFunction}
    />
  );

  const input = tree.getByPlaceholderText('Type password');
  const toggleShow = tree.container.querySelector('img.hidePassword');

  await act(async () => {
    fireEvent.click(toggleShow);
  });
  expect(input).toHaveAttribute('type', 'text');

  const toggleHide = tree.container.querySelector('img.showPassword');
  await act(async () => {
    fireEvent.click(toggleHide);
  });

  expect(toggleHide).toBeInTheDocument();

  expect(input).toHaveAttribute('type', 'password');
  expect(tree).toMatchSnapshot();
});

test('Test error input', async () => {
  const registFunction = jest.fn();
  const tree = render(
    <DefaultInput
      name='errorInput'
      label='Error '
      type='text'
      placeholder='Type something'
      error
      register={registFunction}
    />
  );

  const input = tree.getByPlaceholderText('Type something');
  const toggleShow = tree.container.querySelector('img.hidePassword');
  const toggleHide = tree.container.querySelector('img.showPassword');

  await act(async () => {
    fireEvent.change(input, { target: { value: 'This is a string' } });
  });

  expect(input).toHaveAttribute('type', 'text');
  expect(input.value).toMatch('This is a string');

  expect(toggleHide).toBe(null);
  expect(toggleShow).toBe(null);

  expect(tree).toMatchSnapshot();
});

test('Test disabled input', async () => {
  const registFunction = jest.fn();
  const tree = render(
    <DefaultInput
      name='disabledInput'
      label='Disabled'
      type='text'
      placeholder='Type something'
      error
      disabled
      register={registFunction}
    />
  );

  const input = tree.getByPlaceholderText('Type something');
  const toggleShow = tree.container.querySelector('img.hidePassword');
  const toggleHide = tree.container.querySelector('img.showPassword');

  await act(async () => {
    userEvent.type(input, 'This is a string');
  });

  expect(input).toHaveAttribute('type', 'text');
  expect(input.value).not.toMatch('This is a string');
  expect(input).toBeDisabled();

  expect(toggleHide).toBe(null);
  expect(toggleShow).toBe(null);

  expect(tree).toMatchSnapshot();
});

test('Test icon input', async () => {
  const registFunction = jest.fn();
  const tree = render(
    <DefaultInput
      name='iconInput'
      label='Icon input '
      type='text'
      placeholder='Type something'
      withIcon
      register={registFunction}
    />
  );

  const iconElement = tree.container.querySelector('svg');

  expect(iconElement).toHaveAttribute('fill', 'red');

  expect(tree).toMatchSnapshot();
});
