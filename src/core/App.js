import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import React, { Suspense, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import routes from 'routes';
import Layout from 'layouts/Default';
import { auth } from 'services/firebase';
import { store, persistor } from 'core/store';
import { setUser } from 'global/redux/auth/slice';

import PrivateRoute from './PrivateRoute';

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
      <Suspense fallback={<span>Loading...</span>}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route?.id}
              path={route?.path}
              element={
                <PrivateRoute>
                  <route.component />
                </PrivateRoute>
              }
            />
          ))}
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
        <Layout>
          <AppRoute />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default App;
