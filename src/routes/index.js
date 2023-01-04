import React from 'react';

const Dashboard = React.lazy(() => import('views/Dashboard'));

const Login = React.lazy(() => import('views/pages/Login'));
const PageNotFound = React.lazy(() => import('views/pages/PageNotFound'));

const routes = [
  {
    id: 'page-dashboard',
    path: '/',
    component: Dashboard,
  },
  {
    id: 'page-login',
    path: '/login',
    component: Login,
  },
  {
    id: 'another-pages',
    path: '*',
    component: PageNotFound,
  },
];

export default routes;
