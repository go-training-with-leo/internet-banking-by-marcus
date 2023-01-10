import React from 'react';

import { PlusIcon } from 'assets/images';
import SideBarItem from '.';

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
