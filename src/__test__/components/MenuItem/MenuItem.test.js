import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import MenuItem from 'components/MenuItem';
import { PlusIcon } from 'assets/images';

test('Test default props menu item', () => {
  const tree = render(<MenuItem />);

  const menuItem = tree.getByRole('listitem');

  expect(menuItem.className).toMatch('menu-item');

  expect(menuItem.onclick).toEqual(null);

  expect(tree).toMatchSnapshot();
});

test('Test all props menu item', () => {
  const handleClick = jest.fn();

  const tree = render(
    <MenuItem icon={<PlusIcon />} onClick={handleClick}>
      Label
    </MenuItem>
  );

  const menuItem = tree.getByRole('listitem');
  const icon = menuItem.firstChild;
  fireEvent.click(menuItem);
  fireEvent.mouseMove(menuItem);
  expect(icon).toHaveAttribute('fill', '#FFF');
  fireEvent.mouseLeave(menuItem);

  expect(handleClick).toHaveBeenCalled();
  expect(menuItem.className).toMatch('menu-item');

  expect(tree).toMatchSnapshot();
});

test('Test all props menu item with ', () => {
  const handleClick = jest.fn();

  const tree = render(
    <MenuItem icon={<PlusIcon />} isActive onClick={handleClick}>
      Label
    </MenuItem>
  );

  const menuItem = tree.getByRole('listitem');
  const icon = menuItem.firstChild;
  fireEvent.click(menuItem);
  fireEvent.mouseMove(menuItem);
  expect(icon).toHaveAttribute('fill', '#EF230C');
  fireEvent.mouseLeave(menuItem);

  expect(handleClick).toHaveBeenCalled();
  expect(menuItem.className).toMatch('menu-item');

  expect(tree).toMatchSnapshot();
});
