import React from 'react';
import {
  Clock,
  Cash,
  Transfer,
  Contact,
  CreditCard,
  Exit,
  User,
} from 'assets/images';
import { signOut } from 'global/redux/auth/request';

const handleLogOut = () => {
  signOut();
};

const sideBarItems = {
  ADMIN: [
    {
      id: 'employees',
      label: 'Employees',
      icon: <CreditCard width={20} height={20} />,
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: <Contact width={20} height={20} />,
    },
  ],
  EMPLOYEE: [
    {
      id: 'employeeAccounts',
      label: 'Accounts',
      icon: <CreditCard width={20} height={20} />,
    },
    {
      id: 'employeeHistory',
      label: 'History',
      icon: <Contact width={20} height={20} />,
    },
  ],
  CUSTOMER: [
    {
      id: 'cards',
      label: 'Cards',
      icon: <CreditCard width={20} height={20} />,
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
      id: 'customerHistory',
      label: 'History',
      icon: <Clock width={20} height={20} />,
    },
  ],
};

const bottomSideBarItem = {
  ADMIN: {
    id: 'logOut',
    label: 'Log Out',
    icon: <Exit />,
    onClick: handleLogOut,
  },
  EMPLOYEE: {
    id: 'logOut',
    label: 'Log Out',
    icon: <Exit />,
    onClick: handleLogOut,
  },
  CUSTOMER: {
    id: 'account',
    label: 'Account',
    icon: <User />,
  },
};

export { bottomSideBarItem, sideBarItems };
