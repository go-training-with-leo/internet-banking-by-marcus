import React from 'react';
import {
  Cash,
  Transfer,
  Contact,
  CreditCard,
  Exit,
  User,
  Time,
} from 'assets/images';

const sideBarItems = {
  ADMIN: [
    {
      id: 'employees',
      label: 'Employees',
      icon: <CreditCard width={20} height={20} />,
      navigateTo: '/employees',
    },
    {
      id: 'adminHistory',
      label: 'History',
      icon: <Contact width={20} height={20} />,
      navigateTo: 'admin/history',
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
      isStatic: true,
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
      icon: <Time width={20} height={20} />,
      navigateTo: '/customer/history',
    },
  ],
};

const bottomSideBarItem = {
  ADMIN: {
    id: 'logOut',
    label: 'Log Out',
    icon: <Exit />,
  },
  EMPLOYEE: {
    id: 'logOut',
    label: 'Log Out',
    icon: <Exit />,
  },
  CUSTOMER: {
    id: 'account',
    label: 'Account',
    icon: <User />,
    navigateTo: '/account',
  },
};

export { bottomSideBarItem, sideBarItems };
