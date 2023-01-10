import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import React, { Suspense, useEffect, lazy } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DefaultLayout from 'layouts/Default';
import { auth } from 'services/firebase';
import { store, persistor } from 'core/store';
import { setUser } from 'global/redux/auth/slice';

import 'global/libs';
import 'services/i18n';
import routes from 'navigators/routes';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';

const ForgotPassword = lazy(() => import('views/pages/ForgotPassword'));
const Login = lazy(() => import('views/pages/Login'));
const NotFound = lazy(() => import('views/pages/NotFound'));

function AppRoute() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => unsub();
  }, []);

  return (
    <Router>
      <Suspense fallback={<span>Loading...</span>}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<ForgotPassword />} />
          <Route
            element={
              <PrivateRoute>
                <DefaultLayout />
              </PrivateRoute>
            }
          >
            {routes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <RoleRoute roles={route.roles}>{route.element}</RoleRoute>
                }
              />
            ))}
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          autoClose={1000}
          closeButton
          position='top-right'
          theme='light'
          hideProgressBar
        />
        <AppRoute />
      </PersistGate>
    </Provider>
  );
}

export default App;
