import React, { lazy } from 'react';

const CustomerAccount = lazy(() => import('views/Accounts/Customer'));
const EmployeeAccount = lazy(() => import('views/Accounts/Employee'));
const Cards = lazy(() => import('views/Cards'));
const Contacts = lazy(() => import('views/Contacts'));
const Debts = lazy(() => import('views/Debts'));
const Employees = lazy(() => import('views/Employees'));
const CustomerHistory = lazy(() => import('views/History/Customer'));
const EmployeeHistory = lazy(() => import('views/History/Employee'));
const Transactions = lazy(() => import('views/Transactions'));
const Transfer = lazy(() => import('views/Transfer'));

const routes = [
  {
    id: 'history-customer',
    path: '/customer-history',
    element: <CustomerHistory />,
    roles: ['CUSTOMER'],
  },
  {
    id: 'account-customer',
    path: '/customer-account',
    element: <CustomerAccount />,
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
    id: 'account-employee',
    path: '/employee-account',
    element: <EmployeeAccount />,
    roles: ['EMPLOYEE'],
  },
  {
    id: 'history-employee',
    path: '/employee-history',
    element: <EmployeeHistory />,
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
    path: '/transaction',
    element: <Transactions />,
    roles: ['ADMIN'],
  },
];

export default routes;
