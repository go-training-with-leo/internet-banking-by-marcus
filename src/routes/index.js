import React from 'react';

const TestDashboard = React.lazy(() => import('views/TestDashboard'));
const Login = React.lazy(() => import('views/pages/TestLogin'));
const PageNotFound = React.lazy(() => import('views/pages/PageNotFound'));

const routes = [
  {
    id: 1,
    path: '/',
    component: TestDashboard,
  },
  {
    id: 2,
    path: '/login',
    component: Login,
  },
  {
    id: 3,
    path: '*',
    component: PageNotFound,
  },
];

export default routes;
