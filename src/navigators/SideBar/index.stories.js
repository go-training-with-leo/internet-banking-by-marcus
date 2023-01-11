import React from 'react';

import {
  CreditCard,
  Contact,
  Transfer,
  Cash,
  Clock,
  User,
} from 'assets/images';
import SideBarItem from './Item';
import SideBar from '.';

export default {
  title: 'SideBar',
  component: SideBar,
};

const listItem = [
  {
    id: 'logo-1',
    label: 'Cards',
    icon: <CreditCard width={20} height={20} />,
    isActive: true,
  },
  {
    id: 'logo-2',
    label: 'Contacts',
    icon: <Contact width={20} height={20} />,
  },
  {
    id: 'logo-3',
    label: 'Transfer',
    icon: <Transfer width={20} height={20} />,
  },
  {
    id: 'logo-4',
    label: 'Debt',
    icon: <Cash width={20} height={20} />,
  },
  {
    id: 'logo-5',
    label: 'History',
    icon: <Clock width={20} height={20} />,
  },
];

const Default = () => (
  <SideBar
    bottomItem={
      <SideBarItem>
        <User width={20} height={20} />
        Account
      </SideBarItem>
    }
  >
    {listItem.map(({ id, isActive, label, icon }) => (
      <SideBarItem key={id} isActive={isActive}>
        {icon}
        {label}
      </SideBarItem>
    ))}
  </SideBar>
);

export { Default };
