import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Home, Login } from 'pages';
import PrivateRoute from 'core/PrivateRoute';
import store from 'core/store';
import { ToastContainer } from 'react-toastify';

function RoutesApp() {
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
