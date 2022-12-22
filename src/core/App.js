import React, { Suspense, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import { store, persistor } from 'core/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'services/firebase';
import Layout from 'layouts/Default';
import routes from 'routes';
import { setUser } from 'global/redux/auth/slice';
import PrivateRoute from './PrivateRoute';

import 'react-toastify/dist/ReactToastify.css';

function RoutesApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => unsub();
  }, []);

  return (
    <Router>
      <Suspense
        fallback={<span style={{ backgroundColor: 'red' }}>Loading...</span>}
      >
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
          <RoutesApp />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default App;
