import React from 'react';
import { render } from '@testing-library/react';

import { CreditCard } from 'assets/images';
import SideBar from 'components/SideBar';
import MenuItem from 'components/MenuItem';

test('Test children in SideBar', () => {
  const tree = render(
    <SideBar>
      <MenuItem icon={<CreditCard />}>Label 1</MenuItem>
    </SideBar>
  );

  const sideBar = tree.container.querySelector('div.side-bar');

  expect(sideBar.childNodes.length).toEqual(1);

  expect(tree).toMatchSnapshot();
});
