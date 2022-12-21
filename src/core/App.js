import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Home, Login } from 'pages';
import PrivateRoute from 'core/PrivateRoute';
import store from 'core/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'services/firebase';

function RoutesApp() {
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			console.warn(user);
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
			<ToastContainer />
			<RoutesApp />
		</Provider>
	);
}

export default App;
