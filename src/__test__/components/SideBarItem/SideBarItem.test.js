import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SideBarItem from 'components/SideBarItem';

test('Test default props', () => {
  const tree = render(<SideBarItem>Text</SideBarItem>);

  const sidebarItem = tree.container.querySelector('div.sidebar-item');

  expect(sidebarItem).toHaveTextContent('Text');

  expect(tree).toMatchSnapshot();
});

test('Test event & props', () => {
  const handleClick = jest.fn();

  const tree = render(
    <SideBarItem isActive onClick={handleClick}>
      Text
    </SideBarItem>
  );

  const sidebarItem = tree.container.querySelector('div.sidebar-item');

  fireEvent.click(sidebarItem);
  expect(sidebarItem).toHaveClass('active');
  expect(handleClick).toHaveBeenCalledTimes(1);

  expect(tree).toMatchSnapshot();
});
