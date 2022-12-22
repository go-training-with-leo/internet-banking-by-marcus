import React from 'react';

const Home = React.lazy(() => import('views/Home'));
const Login = React.lazy(() => import('views/Login'));
const PageNotFound = React.lazy(() => import('views/PageNotFound'));

const routes = [
  {
    id: 1,
    path: '/',
    component: Home,
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
