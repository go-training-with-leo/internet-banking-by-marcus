import { lazy } from 'react';

const Dashboard = lazy(() => import('views/Dashboard'));
const NotFound = lazy(() => import('views/pages/NotFound'));
const Login = lazy(() => import('views/pages/Login'));

const routes = [
  {
    id: 1,
    path: '/',
    component: Dashboard,
  },
  {
    id: 2,
    path: '/login',
    component: Login,
  },
  {
    id: 3,
    path: '*',
    component: NotFound,
  },
];

export default routes;
