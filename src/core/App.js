import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Home, Login } from 'pages';
import PrivateRoute from './PrivateRoute';

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
	return <RoutesApp />;
}

export default App;
