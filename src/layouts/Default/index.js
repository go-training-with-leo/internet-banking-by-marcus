import React, { memo } from 'react';

import Header from 'components/Header';
import SideBar from 'components/SideBar';
import MenuItem from 'components/MenuItem';

import 'layouts/Default/style.scss';
import {
  Clock,
  Contact,
  CreditCard,
  Debt,
  Transfer,
  User,
} from 'assets/images';

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
const Default = ({ children }) => {
  return (
    <div className='page-layout'>
      <SideBar
        bottomItem={
          <MenuItem icon={<User width={20} height={20} />}>Account</MenuItem>
        }
      >
        {listItem.map((item) => (
          <MenuItem
            key={item.id}
            icon={<item.icon width={20} height={20} fill='gray' />}
          >
            {item.label}
          </MenuItem>
        ))}
      </SideBar>
      <div className='page-layout__right'>
        <Header />
        {children}
      </div>
    </div>
  );
};

Default.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'Menu',
};

export default memo(Default);
