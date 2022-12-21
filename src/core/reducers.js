import { combineReducers } from '@reduxjs/toolkit';

import auth from 'global/redux/reducers/auth';

const reducers = combineReducers({
	auth,
});

export default reducers;
