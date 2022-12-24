import React from 'react';

import Sidebar from 'components/Sidebar';
import MenuItem from 'components/MenuItem';
import {
  CreditCard,
  Contact,
  Transfer,
  Debt,
  Clock,
  User,
} from 'assets/images';

export default {
  title: 'SideBar',
  component: Sidebar,
};

const Template = (args) => {
  return <Sidebar {...args} />;
};

const Default = Template.bind({});
const listItem = [
  {
    id: 1,
    label: 'Cards',
    icon: CreditCard,
    isActive: true,
  },
  {
    id: 2,
    label: 'Contacts',
    icon: Contact,
  },
  {
    id: 3,
    label: 'Transfer',
    icon: Transfer,
  },
  {
    id: 4,
    label: 'Debt',
    icon: Debt,
  },
  {
    id: 5,
    label: 'History',
    icon: Clock,
  },
];

Default.args = {
  children: listItem.map((item) => (
    <MenuItem
      key={item.id}
      isActive={item?.isActive}
      icon={<item.icon width={20} height={20} fill='gray' />}
    >
      {item.label}
    </MenuItem>
  )),
  bottomItem: <MenuItem icon={<User fill='gray' />}>Account</MenuItem>,
};

export { Default };
