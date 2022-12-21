import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Home, Login } from 'pages';
import PrivateRoute from 'core/PrivateRoute';
import { store, persistor } from 'core/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'services/firebase';
import { setUser } from 'global/redux/reducers/auth';
import { PersistGate } from 'redux-persist/integration/react';

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
			<Routes>
				<Route
					path='/'
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				/>

				<Route path='/login' element={<Login />} />

				<Route path='*' element={<h1>Page not found</h1>} />
			</Routes>
		</Router>
	);
}

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ToastContainer />
				<RoutesApp />
			</PersistGate>
		</Provider>
	);
}

export default App;
