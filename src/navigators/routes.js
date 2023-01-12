import React, { lazy } from 'react';

const Cards = lazy(() => import('views/Cards'));
const Contacts = lazy(() => import('views/Contacts'));
const CustomerAccount = lazy(() => import('views/Account'));
const CustomerHistory = lazy(() => import('views/History/Customer'));
const Debts = lazy(() => import('views/Debts'));
const Employees = lazy(() => import('views/Employees'));
const EmployeeAccount = lazy(() => import('views/Accounts'));
const EmployeeHistory = lazy(() => import('views/History/Employee'));
const Transactions = lazy(() => import('views/Transactions'));
const Transfer = lazy(() => import('views/Transfer'));

const routes = [
  {
    id: 'historyCustomer',
    title: 'History',
    path: '/customer/history',
    element: <CustomerHistory />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'accountCustomer',
    title: 'Account',
    path: '/account',
    element: <CustomerAccount />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'cards',
    title: 'Cards',
    path: '/cards',
    element: <Cards />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'contacts',
    title: 'Contact',
    path: '/contacts',
    element: <Contacts />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'debts',
    title: 'Debts',
    path: '/debts',
    element: <Debts />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'transfer',
    title: 'Transfer',
    path: '/transfer',
    element: <Transfer />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'accountsEmployee',
    title: 'Accounts',
    path: '/accounts',
    element: <EmployeeAccount />,
    roles: ['EMPLOYEE'],
  },
  {
    id: 'historyEmployee',
    title: 'History',
    path: '/employee/history',
    element: <EmployeeHistory />,
    roles: ['EMPLOYEE'],
  },
  {
    id: 'employees',
    title: 'Employees',
    path: '/employees',
    element: <Employees />,
    roles: ['ADMIN'],
  },
  {
    id: 'transactions',
    title: 'Transactions',
    path: '/transactions',
    element: <Transactions />,
    roles: ['ADMIN'],
  },
];

export default routes;
