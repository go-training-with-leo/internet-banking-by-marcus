import React from 'react';

import SideBarItem from 'components/SideBar/Item';
import {
  CreditCard,
  Contact,
  Transfer,
  Cash,
  Clock,
  User,
} from 'assets/images';
import SideBar from '.';

export default {
  title: 'SideBar',
  component: SideBar,
};

const listItem = [
  {
    id: 'cards',
    label: 'Cards',
    icon: <CreditCard width={20} height={20} />,
    isActive: true,
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: <Contact width={20} height={20} />,
  },
  {
    id: 'transfer',
    label: 'Transfer',
    icon: <Transfer width={20} height={20} />,
  },
  {
    id: 'debt',
    label: 'Debt',
    icon: <Cash width={20} height={20} />,
  },
  {
    id: 'history',
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
