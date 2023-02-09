import React from 'react';
import { render } from '@testing-library/react';

import CheckOnline from 'components/CheckOnline';

test('Test props', () => {
  const tree = render(<CheckOnline>CheckOnline</CheckOnline>);

  const checkOnline = tree.container.querySelector('div.header');
  console.warn(checkOnline);

  expect(tree).toMatchSnapshot();
});
