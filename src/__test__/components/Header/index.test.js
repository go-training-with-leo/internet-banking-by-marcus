import React from 'react';
import { render } from '@testing-library/react';

import Header from 'navigators/Header';

test('Test props', () => {
  const tree = render(
    <Header title='Title' type='busy'>
      <button>Button</button>
    </Header>
  );

  const header = tree.container.querySelector('div.header');

  expect(header).toHaveTextContent('Button');
  expect(header).toHaveTextContent('Title');
  expect(header.childElementCount).toEqual(2);
  expect(tree).toMatchSnapshot();
});

test('Test notifyBusy props order', () => {
  const tree = render(
    <Header title='Title' type='busy'>
      <button>Button</button>
    </Header>
  );

  const header = tree.container.querySelector('div.header');

  expect(header.lastElementChild).toHaveClass('notif-busy');
  expect(header.childElementCount).toEqual(2);
  expect(tree).toMatchSnapshot();
});

test('Test notifyRemove props order', () => {
  const tree = render(
    <Header title='Title' type='remove'>
      <button>Button</button>
    </Header>
  );

  const header = tree.container.querySelector('div.header');

  expect(header.lastElementChild).toHaveClass('notif-remove');
  expect(header.childElementCount).toEqual(2);
  expect(tree).toMatchSnapshot();
});
test('Test notifyFree props order', () => {
  const tree = render(
    <Header title='Title' type='free'>
      <button>Button</button>
    </Header>
  );

  const header = tree.container.querySelector('div.header');

  expect(header.lastElementChild).toHaveClass('notif-free');
  expect(header.childElementCount).toEqual(2);
  expect(tree).toMatchSnapshot();
});
