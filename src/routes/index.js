import { lazy } from 'react';

const Dashboard = lazy(() => import('views/Dashboard'));
const Login = lazy(() => import('views/pages/Login'));
const Forgot = lazy(() => import('views/pages/ForgotPassword'));
const NotFound = lazy(() => import('views/pages/NotFound'));

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
    path: '/accounts/password/new',
    component: Forgot,
  },
  {
    id: 'another-pages',
    path: '*',
    component: NotFound,
  },
];

export default routes;
