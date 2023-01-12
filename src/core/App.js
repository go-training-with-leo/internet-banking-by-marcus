import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import React, { Suspense, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DefaultLayout from 'layouts/Default';
import Loader from 'components/Loader';
import { auth } from 'services/firebase';
import { store, persistor } from 'core/store';
import { setUser } from 'global/redux/auth/slice';
import { ForgotPassword, Login, NotFound } from 'views';

import routes from 'navigators/routes';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';

import 'services/i18n';
import 'global/libs';

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
      <Routes>
        <Route path='/' element={<Login />} />
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
                <Suspense fallback={<Loader />}>
                  <RoleRoute roles={route.roles}>{route.element}</RoleRoute>
                </Suspense>
              }
            />
          ))}
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
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
