import React from 'react';

const Dashboard = React.lazy(() => import('views/Dashboard'));

const Login = React.lazy(() => import('views/pages/Login'));
const Forgot = React.lazy(() => import('views/pages/Forgot'));
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
    id: 'page-resetpass',
    path: '/account',
    component: Forgot,
  },
  {
    id: 'another-pages',
    path: '*',
    component: PageNotFound,
  },
];

export default routes;
