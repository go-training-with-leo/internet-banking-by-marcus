import React, { lazy } from 'react';

const Dashboard = lazy(() => import('views/Dashboard'));

const routes = [
  {
    id: 'dashboard',
    path: '/',
    element: <Dashboard />,
  },
];

export default routes;
