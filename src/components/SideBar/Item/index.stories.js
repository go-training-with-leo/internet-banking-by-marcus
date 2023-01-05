import React from 'react';

import SideBarItem from 'components/SideBar/Item';

import { PlusIcon } from 'assets/images';

export default {
  title: 'Menu Item',
  component: SideBarItem,
};

const Default = () => (
  <SideBarItem>
    <PlusIcon /> Label
  </SideBarItem>
);

export { Default };
