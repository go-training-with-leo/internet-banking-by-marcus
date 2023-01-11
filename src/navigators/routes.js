import React, { lazy } from 'react';

const Account = lazy(() => import('views/Account'));
const Accounts = lazy(() => import('views/Accounts'));
const Cards = lazy(() => import('views/Cards'));
const Contacts = lazy(() => import('views/Contacts'));
const Debts = lazy(() => import('views/Debts'));
const Employees = lazy(() => import('views/Employees'));
const CustomerHistory = lazy(() => import('views/History/Customer'));
const EmployeeHistory = lazy(() => import('views/History/Employee'));
const HistoryInfo = lazy(() => import('views/History/Employee/HistoryInfo'));
const Transactions = lazy(() => import('views/Transactions'));
const Transfer = lazy(() => import('views/Transfer'));

const routes = [
  {
    id: 'historyCustomer',
    path: '/customer/history',
    element: <CustomerHistory />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'accountsCustomer',
    path: '/account',
    element: <Account />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'cards',
    path: '/cards',
    element: <Cards />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'contacts',
    path: '/contacts',
    element: <Contacts />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'debts',
    path: '/debts',
    element: <Debts />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'transfer',
    path: '/transfer',
    element: <Transfer />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'accountsEmployee',
    path: '/accounts',
    element: <Accounts />,
    roles: ['EMPLOYEE'],
  },
  {
    id: 'historyEmployee',
    path: '/employee/history',
    element: <EmployeeHistory />,
    roles: ['EMPLOYEE'],
  },
  {
    id: 'historyEmployee',
    path: '/employee/history/:id',
    element: <HistoryInfo />,
    roles: ['EMPLOYEE'],
  },
  {
    id: 'employees',
    path: '/employees',
    element: <Employees />,
    roles: ['ADMIN'],
  },
  {
    id: 'transactions',
    path: '/transactions',
    element: <Transactions />,
    roles: ['ADMIN'],
  },
];

export default routes;
