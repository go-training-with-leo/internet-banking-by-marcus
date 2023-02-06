import React from 'react';

import IconButton from 'components/Button/Icon';
import { PlusIcon } from 'assets/images';

const headerItems = {
  ADMIN: [
    {
      id: 'employees',
      titleHeader: 'Employees',
      path: '/employees',
      button: (
        <IconButton>
          New Account <PlusIcon fill='red' />
        </IconButton>
      ),
    },
    {
      id: 'adminHistory',
      titleHeader: 'History',
      path: '/admin/history',
    },
  ],
  EMPLOYEE: [
    {
      id: 'employeeAccounts',
      titleHeader: 'Accounts',
      path: '/accounts',
      button: (
        <IconButton>
          New Account <PlusIcon fill='red' />
        </IconButton>
      ),
    },
    {
      id: 'employeeHistory',
      titleHeader: 'History',
      path: '/employee/history',
    },
  ],
  CUSTOMER: [
    {
      id: 'cards',
      titleHeader: 'Cards',
      path: '/cards',
      button: (
        <IconButton>
          New Saving Card <PlusIcon fill='red' />
        </IconButton>
      ),
    },
    {
      id: 'contacts',
      titleHeader: 'Contacts',
      path: '/contacts',
      button: (
        <IconButton>
          New Contact <PlusIcon fill='red' />
        </IconButton>
      ),
    },
    {
      id: 'transfer',
      titleHeader: 'Money transfer',
      path: '/transfer',
    },
    {
      id: 'debts',
      titleHeader: 'Debts',
      path: '/debts',
      button: (
        <IconButton>
          New Debt <PlusIcon fill='red' />
        </IconButton>
      ),
    },
    {
      id: 'employeeHistory',
      titleHeader: 'History',
      path: '/customer/history',
    },
    {
      id: 'account',
      titleHeader: 'Account',
      path: '/account',
    },
  ],
  NO_ROLE: [],
};

export default headerItems;
