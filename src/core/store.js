import { configureStore } from '@reduxjs/toolkit';

import auth from 'global/redux/reducers/auth';

const store = configureStore({
	reducer: {
		auth,
	},
});

export default store;
