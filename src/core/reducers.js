import { combineReducers } from '@reduxjs/toolkit';

import auth from 'global/redux/auth/slice';

const reducers = combineReducers({
  auth,
});

export default reducers;
