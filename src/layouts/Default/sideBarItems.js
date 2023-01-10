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
      navigateTo: '/employees',
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: <Contact width={20} height={20} />,
      navigateTo: '/transactions',
    },
  ],
  EMPLOYEE: [
    {
      id: 'employeeAccounts',
      label: 'Accounts',
      icon: <CreditCard width={20} height={20} />,
      navigateTo: '/accounts',
    },
    {
      id: 'employeeHistory',
      label: 'History',
      icon: <Contact width={20} height={20} />,
      navigateTo: '/employee/history',
    },
  ],
  CUSTOMER: [
    {
      id: 'cards',
      label: 'Cards',
      icon: <CreditCard width={20} height={20} />,
      navigateTo: '/cards',
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: <Contact width={20} height={20} />,
      navigateTo: '/contacts',
    },
    {
      id: 'transfer',
      label: 'Transfer',
      icon: <Transfer width={20} height={20} />,
      navigateTo: '/transfer',
    },
    {
      id: 'debts',
      label: 'Debts',
      icon: <Cash width={20} height={20} />,
      navigateTo: '/debts',
    },
    {
      id: 'customerHistory',
      label: 'History',
      icon: <Clock width={20} height={20} />,
      navigateTo: '/customer/history',
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
    navigateTo: '/account',
  },
};

export { bottomSideBarItem, sideBarItems };
