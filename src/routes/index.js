import { lazy } from 'react';

const Dashboard = lazy(() => import('views/Dashboard'));
const Login = lazy(() => import('views/pages/Login'));
const ForgotPassword = lazy(() => import('views/pages/ForgotPassword'));
const NotFound = lazy(() => import('views/pages/NotFound'));

const routes = [
  {
    id: 'dashboard',
    path: '/',
    component: Dashboard,
  },
  {
    id: 'login',
    path: '/login',
    component: Login,
  },
  {
    id: 'resetPassword',
    path: '/accounts/password/new',
    component: ForgotPassword,
  },
  {
    id: 'another',
    path: '*',
    component: NotFound,
  },
];

export default routes;
