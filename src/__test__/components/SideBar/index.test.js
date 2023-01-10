import React from 'react';
import { render } from '@testing-library/react';
import SideBar from 'navigators/SideBar';
import SideBarItem from 'navigators/SideBar/Item';
import { PlusIcon } from 'assets/images';

test('Test props children', () => {
  const tree = render(
    <SideBar>
      <PlusIcon />
      <SideBarItem>Text</SideBarItem>
    </SideBar>
  );

  const items = tree.container.querySelector('div.list-item');
  expect(items.childElementCount).toEqual(2);
  expect(tree).toMatchSnapshot();
});

test('Test bottomItem props', () => {
  const tree = render(
    <SideBar bottomItem={<SideBarItem>Label</SideBarItem>}>
      <PlusIcon />
      <SideBarItem>Text</SideBarItem>
    </SideBar>
  );

  const sidebar = tree.container.querySelector('div.side-bar');

  expect(sidebar.lastChild).toHaveTextContent('Label');

  expect(tree).toMatchSnapshot();
});
