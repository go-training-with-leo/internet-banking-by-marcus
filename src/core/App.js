import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import React, { Suspense, useEffect, lazy } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import routes from 'routes';
import AuthLayout from 'layouts/Auth';
import Default from 'layouts/Default';
import { auth } from 'services/firebase';
import { store, persistor } from 'core/store';
import { setUser } from 'global/redux/auth/slice';

import PrivateRoute from './PrivateRoute';

import 'global/libs';
import 'services/i18n';

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
          <Route element={<AuthLayout />}>
            <Route
              path='/login'
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path='/forgot'
              element={
                <PrivateRoute>
                  <ForgotPassword />
                </PrivateRoute>
              }
            />
          </Route>
          <Route element={<Default />}>
            {routes.map((route) => (
              <Route
                key={route?.id}
                path={route?.path}
                element={<PrivateRoute>{route?.element}</PrivateRoute>}
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
