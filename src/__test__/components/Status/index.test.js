import React from 'react';
import { render } from '@testing-library/react';
import Status from 'components/Status';

test('Test props children', () => {
  const tree = render(<Status failed />);

  const status = tree.container.querySelector('div.status');
  expect(status).toHaveClass('failed');
  expect(tree).toMatchSnapshot();
});

test('Test pending status', () => {
  const tree = render(<Status refund />);

  const status = tree.container.querySelector('div.status');
  expect(status).toHaveClass('refund');
  expect(tree).toMatchSnapshot();
});

test('Test pending status', () => {
  const tree = render(<Status pending />);

  const status = tree.container.querySelector('div.status');
  expect(status).toHaveClass('pending');
  expect(tree).toMatchSnapshot();
});
